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
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email(),
  role: z.enum(["staff", "patient", "admin"]).optional(),
  name: z.string(),
});

interface CreateUserDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function CreateUserDialog({ open, setOpen }: CreateUserDialogProps) {
  const createUserMutation = trpc.user.createOne.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const utils = trpc.useUtils();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const user = await utils.user.findAuth0ByEmail.fetch({ email: data.email });

    if (user) {
      form.clearErrors();

      const creation = createUserMutation.mutateAsync(
        {
          data: {
            ...data,
            sub: user,
          },
        },
        {
          onSuccess: () => {
            utils.user.getAll.invalidate();
            utils.user.getOne.invalidate();
          },
        },
      );

      toast.promise(creation, {
        success: "Added user!",
        loading: "Adding user...",
        error: "Error adding user.",
      });

      await creation;
      setOpen(false);
    } else {
      form.setError("email", {
        type: "custom",
        message: "This email is not associated with an auth0 account.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a User</DialogTitle>
        </DialogHeader>
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
                    <FormDescription>
                      This is the role of the user.
                    </FormDescription>
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
      </DialogContent>
    </Dialog>
  );
}
