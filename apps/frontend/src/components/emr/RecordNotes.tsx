import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { trpc } from "@/utils/trpc";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";
import { useRecord } from "./RecordEdit";

const formSchema = z.object({
  notes: z.string(),
});

export function RecordNotes() {
  const record = useRecord();

  const updateRecord = trpc.record.updateOne.useMutation();

  const form = useForm<
    z.input<typeof formSchema>,
    object,
    z.output<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: record!.notes,
    },
  });

  const onSubmit = (data: z.output<typeof formSchema>) => {
    const update = updateRecord.mutateAsync({
      id: record.id,
      data: {
        notes: data.notes,
      },
    });

    toast.promise(update, {
      success: "Successfully updated notes.",
      loading: "Saving notes...",
      error: "Error saving notes!",
    });
  };

  if (!record) {
    return <div>Record does not exist.</div>;
  }

  return (
    <fieldset className="p-4 rounded border flex-1">
      <legend className="text-sm px-2 font-bold">Notes</legend>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-full flex flex-col gap-2"
        >
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem className="flex flex-col flex-1">
                <FormControl>
                  <Textarea
                    {...field}
                    className="flex-1"
                    placeholder="Type notes here..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={updateRecord.isPending}
            type="submit"
            className="w-full"
          >
            {updateRecord.isPending && (
              <LoaderCircle className="animate-spin mr-2" />
            )}
            Save
          </Button>
        </form>
      </Form>
    </fieldset>
  );
}
