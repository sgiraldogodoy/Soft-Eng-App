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
import { Suspense } from "react";

const formSchema = z.object({
  email: z.string().optional(),
  role: z.enum(["staff", "patient", "admin"]).optional(),
  name: z.string(),
});

interface UserEditDialogProps {
  editingId: string;
  setEditingId: (id: string | null) => void;
}

export default function UserEditDialog({
  editingId,
  setEditingId,
}: UserEditDialogProps) {
  const updateUserMutation = trpc.user.updateOne.useMutation();
  const [user] = trpc.user.getOne.useSuspenseQuery({ id: editingId });
  const utils = trpc.useUtils();

  const form = useForm<z.input<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: user ? formSchema.parse(user) : undefined,
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!editingId) return toast.error("An error occured.");
    const user = data.email
      ? await utils.user.findAuth0ByEmail.fetch({ email: data.email })
      : null;

    if (user) {
      form.clearErrors();

      const update = updateUserMutation.mutateAsync(
        {
          data: {
            ...data,
            sub: user.user_id,
          },
          id: editingId,
        },
        {
          onSuccess: () => {
            utils.user.getAll.invalidate();
            utils.user.getOne.invalidate();
          },
        },
      );

      toast.promise(update, {
        success: "Edited user!",
        loading: "Edited user...",
        error: "Error adding user.",
      });

      await update;

      setEditingId(null);
    } else {
      form.setError("email", {
        type: "custom",
        message: "This email is not associated with an auth0 account.",
      });
    }
  };

  return (
    <Suspense>
      <Dialog
        open={!!editingId}
        onOpenChange={() => {
          setEditingId(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {user?.name}</DialogTitle>
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
                  Save changes
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </Suspense>
  );
}
