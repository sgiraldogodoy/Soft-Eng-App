import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input.tsx";
import { trpc } from "@/utils/trpc";
import { Route, useLocation } from "wouter";
import { Suspense, useReducer, useState } from "react";
import {
  ZCreateBaseUserSchema,
  ZCreatePatientSchema,
  ZCreateStaffSchema,
} from "common";
import { LoadingSpinner } from "@/components/ui/loader.tsx";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { nestSchema } from "common/src/zod-utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreateUserDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ZPassword = z
  .string()
  .regex(/(.*[A-Z].*)/, {
    message: "Password must contain an uppercase letter.",
  })
  .regex(/(.*[a-z].*)/, {
    message: "Password must contain a lowercase letter.",
  })
  .regex(/(.*[0-9].*)/, {
    message: "Password must contain a number.",
  })
  .min(8, {
    message: "Password must be at least 8 characters.",
  });

const ZAuth0FormSchema = z
  .object({
    password: ZPassword,
    confirmPassword: ZPassword,
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Passwords do not match.",
      });
    }
  });

const ZCreateBaseUserSchemaWithoutSub = ZCreateBaseUserSchema.extend({
  sub: z.undefined(),
  staff: nestSchema(ZCreateStaffSchema).optional(),
  patient: nestSchema(ZCreatePatientSchema).optional(),
}).superRefine((values, ctx) => {
  // doing this the lazy way.
  //
  console.log(values);

  if (
    (values.role === "staff" || values.role === "admin") &&
    (!values.staff ||
      (!("connect" in values.staff) && !("create" in values.staff)))
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Staff is not connected.",
      path: ["role"],
    });
  }
});
const ZCreateStaffSchemaWithoutUserOrName = ZCreateStaffSchema.omit({
  user: true,
  name: true,
});
type TCreateStaffSchema = z.infer<typeof ZCreateStaffSchemaWithoutUserOrName>;

type BaseUser = z.infer<typeof ZCreateBaseUserSchemaWithoutSub>;
type Auth0UserSchema = z.infer<typeof ZAuth0FormSchema>;
type CreateUserState = {
  base: BaseUser;
  auth0: Auth0UserSchema;
  staff?: TCreateStaffSchema;
};

type DialogAction =
  | {
      type: "pushBase";
      base: BaseUser;
    }
  | {
      type: "pushAuth0";
      auth0: Auth0UserSchema;
    }
  | {
      type: "pushStaff";
      staff: TCreateStaffSchema;
    };

interface CreateStaffProps {
  onSubmit: (data: TCreateStaffSchema) => void;
}

export function CreateStaff({ onSubmit }: CreateStaffProps) {
  const form = useForm<TCreateStaffSchema>({
    resolver: zodResolver(ZCreateStaffSchemaWithoutUserOrName),
  });

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col justify-between items-stretch gap-4"
        >
          <div className="flex flex-col gap-2 items-stretch">
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem className="flex flex-col h-full justify-between flex-1">
                  <FormLabel>Job Title</FormLabel>
                  <Input type="text" {...field} />
                  <FormDescription>
                    This is the user&apos;s job title.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-2">
            <Button
              className="flex-1"
              variant="outline"
              onClick={() => {
                form.reset();
              }}
            >
              Reset
            </Button>
            <Button className="flex-1 " type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

interface CreateAuth0AccountProps {
  onSubmit: (data: Auth0UserSchema | string) => void;
  defaultValues: Auth0UserSchema;
  email: string;
}

export function CreateAuth0Account({
  onSubmit,
  defaultValues,
  email,
}: CreateAuth0AccountProps) {
  const form = useForm<Auth0UserSchema>({
    resolver: zodResolver(ZAuth0FormSchema),
    defaultValues,
  });

  const [auth0Account] = trpc.user.findAuth0ByEmail.useSuspenseQuery({
    email: email,
  });

  if (auth0Account) {
    return (
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3 p-8 text-slate-700">
          <p className="text-sm text-nowrap">
            This user will be connected to the following Auth0 account
          </p>
          <Card className="flex items-center h-full w-full">
            <CardContent className="flex h-full w-full gap-4 items-center pt-6">
              <img
                className="rounded-full w-8 h-8"
                src={auth0Account.picture}
              />
              <div>
                <p>{auth0Account.email}</p>
                <p className="text-xs text-slate-700">{auth0Account.user_id}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <Button onClick={() => onSubmit(auth0Account.user_id)}>
          Create User
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col justify-between items-stretch gap-4"
      >
        <div className="flex flex-col gap-2 items-stretch">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex flex-col h-full justify-between flex-1">
                <FormLabel>Password</FormLabel>
                <Input type="password" {...field} />
                <FormDescription>
                  This is the user&apos;s Auth0 password.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="flex flex-col h-full justify-between flex-1">
                <FormLabel>Confirm Password</FormLabel>
                <Input type="password" {...field} />
                <FormDescription>
                  Type your password one more time.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-2">
          <Button
            className="flex-1"
            variant="outline"
            onClick={() => {
              form.reset();
            }}
          >
            Reset
          </Button>
          <Button className="flex-1 " type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}

const CreateBaseUser = ({
  onSubmit,
  defaultValues,
}: {
  onSubmit: (data: BaseUser) => void;
  defaultValues: BaseUser;
}) => {
  const form = useForm<BaseUser>({
    resolver: zodResolver(ZCreateBaseUserSchemaWithoutSub),
    defaultValues,
  });

  const watchName = form.watch("name");
  const watchRole = form.watch("role");

  const [staffCreateMode, setStaffCreateMode] = useState("create");
  const [staffId, setStaffId] = useState<string | null>(null);

  if (staffCreateMode === "create")
    form.setValue("staff.create.name", watchName);

  if (staffId && staffCreateMode === "search")
    form.setValue("staff.connect.id", staffId);

  const staffQuery = trpc.staff.getAll.useQuery();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col justify-between items-stretch gap-3"
      >
        <div className="flex flex-row gap-2 items-stretch">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col h-full justify-between flex-1">
                <FormLabel>Email</FormLabel>
                <Input type="text" {...field} />
                <FormDescription>
                  This is the user&apos;s email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="flex flex-col flex-1">
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value ?? ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="patient">Patient</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>This is the role of the user.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormDescription>Name of the user.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {(watchRole === "staff" || watchRole === "admin") && (
          <Tabs value={staffCreateMode} onValueChange={setStaffCreateMode}>
            <fieldset className="border p-4 rounded">
              <legend className="text-sm text-slate-600">
                Attach a staff member.
              </legend>
              <TabsList className="w-full">
                <TabsTrigger value="create" className="flex-1">
                  Create
                </TabsTrigger>
                <TabsTrigger value="search" className="flex-1">
                  Search
                </TabsTrigger>
              </TabsList>
              <TabsContent value="create">
                {staffCreateMode === "create" && (
                  <>
                    <input
                      type="hidden"
                      {...form.register("staff.create.name", {
                        shouldUnregister: true,
                      })}
                    />
                    <FormField
                      control={form.control}
                      name="staff.create.jobTitle"
                      shouldUnregister
                      render={({ field }) => (
                        <FormItem className="animate-in duration-300 slide-in-from-bottom-4 ease-out fade-in delay-100 fill-mode-both">
                          <FormLabel>Job Title</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                          <FormDescription>
                            Job title of the user.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </TabsContent>
              <TabsContent className="space-y-2" value="search">
                {staffQuery.data?.map((s) => (
                  <button
                    className={cn(
                      s.id === staffId && "border-green-500 bg-muted",
                      "w-full p-2 border rounded group flex items-center justify-between transition-colors hover:border-green-500",
                    )}
                    type="button"
                    onClick={() => {
                      setStaffId(s.id === staffId ? null : s.id);
                    }}
                  >
                    {s.name}
                    <LinkIcon
                      className={cn(
                        s.id === staffId &&
                          "group-hover:stroke-red-400 stroke-green-500",
                        s.id !== staffId && "group-hover:stroke-green-500",
                        "h-4 w-4 transition-colors",
                      )}
                    />
                  </button>
                ))}
                <input
                  type="hidden"
                  {...form.register("staff.connect.id", {
                    shouldUnregister: true,
                  })}
                />
              </TabsContent>
            </fieldset>
          </Tabs>
        )}
        {watchRole === "patient" && <></>}
        <div className="flex gap-2">
          <Button
            className="flex-1"
            variant="outline"
            type="button"
            onClick={() => {
              form.reset();
            }}
          >
            Reset
          </Button>
          <Button className="flex-1 " type="submit">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
};

export function CreateUserDialog({ open, setOpen }: CreateUserDialogProps) {
  const utils = trpc.useUtils();
  const createUserMutation = trpc.user.createOne.useMutation();
  const [, setLocation] = useLocation();

  const [state, dispatch] = useReducer(
    (prevState: CreateUserState, action: DialogAction) => {
      switch (action.type) {
        case "pushBase":
          return {
            ...prevState,
            base: action.base,
          };
        case "pushAuth0":
          return {
            ...prevState,
            auth0: action.auth0,
          };
        case "pushStaff":
          return {
            ...prevState,
            staff: action.staff,
          };
        default:
          return prevState;
      }
    },
    {
      base: {
        email: "",
        name: "",
        role: undefined,
      },
      auth0: {
        password: "",
        confirmPassword: "",
      },
    },
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a User</DialogTitle>
        </DialogHeader>
        <Route path="/">
          <CreateBaseUser
            onSubmit={(data) => {
              console.log("test");
              dispatch({ type: "pushBase", base: data });
              setLocation("/auth0");
            }}
            defaultValues={state.base}
          />
        </Route>
        <Route path="/auth0">
          <Suspense fallback={<LoadingSpinner />}>
            <CreateAuth0Account
              onSubmit={async (data) => {
                if (typeof data !== "string") {
                  dispatch({ type: "pushAuth0", auth0: data });
                }

                const user = createUserMutation.mutateAsync(
                  {
                    ...state.base,
                    auth: data,
                  },
                  {
                    onSuccess: () => {
                      utils.user.getAll.invalidate();
                      utils.user.getOne.invalidate();
                    },
                  },
                );

                toast.promise(user, {
                  success: "Successfully added a new user!",
                  loading: "Adding a new user...",
                  error: "Error adding a new user.",
                });

                await user;

                setLocation("~/settings");
              }}
              defaultValues={state.auth0}
              email={state.base.email}
            />
          </Suspense>
        </Route>
      </DialogContent>
    </Dialog>
  );
}
