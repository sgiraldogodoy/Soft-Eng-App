import { ZCreatePrescriptionSchema } from "common";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { trpc } from "@/utils/trpc";
import { toast } from "sonner";
import { useDiagnosis } from "./RecordDiagnosis";

const formSchema = ZCreatePrescriptionSchema.extend({
  diagnosisId: z.undefined(),
});

export function PrescriptionForm() {
  const diagnosis = useDiagnosis();

  const utils = trpc.useUtils();
  const newPrescription = trpc.diagnosis.attachPrescription.useMutation({
    onSuccess: () => {
      utils.record.getAll.invalidate();
      utils.record.getOne.invalidate();
      utils.diagnosis.getOne.invalidate();
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const prescription = newPrescription.mutateAsync({
      ...data,
      diagnosisId: diagnosis.id,
    });

    toast.promise(prescription, {
      success: "Created a new subscription",
      loading: "Creating a new subscription...",
      error: "Error creating subscription",
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 flex-1 overflow-auto border rounded shadow-lg p-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="drug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Drug</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dosage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dosage</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="frequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Frequency</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="refillAllowed"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Refill Allowed</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="pharmacy.email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Pharmacy Email</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pharmacy.name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Pharmacy Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button>Save</Button>
      </form>
    </Form>
  );
}
