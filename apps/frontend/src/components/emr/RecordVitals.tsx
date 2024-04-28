import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { TCreateVitalsSchema, ZUpdateVitalsSchema } from "common";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { trpc } from "@/utils/trpc";
import {
  GaugeIcon,
  HeartPulseIcon,
  PlusIcon,
  ThermometerIcon,
  WindIcon,
} from "lucide-react";
import { z } from "zod";
import { Button } from "../ui/button";
import { toast } from "sonner";

export function RecordVitals({ recordId }: { recordId: string }) {
  const utils = trpc.useUtils();
  const [record] = trpc.record.getOne.useSuspenseQuery({
    id: recordId,
  });
  const createVitals = trpc.vitals.create.useMutation();
  const updateVitals = trpc.vitals.update.useMutation();

  const form = useForm<
    z.input<typeof ZUpdateVitalsSchema>,
    object,
    z.output<typeof ZUpdateVitalsSchema>
  >({
    resolver: zodResolver(ZUpdateVitalsSchema),
    defaultValues: {
      heartRate: record?.vitals?.heartRate?.toString() ?? "",
      respRate: record?.vitals?.respRate?.toString() ?? "",
      bodyTemp: record?.vitals?.bodyTemp?.toString() ?? "",
      bloodPressure: record?.vitals?.bloodPressure?.toString() ?? "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: TCreateVitalsSchema) => {
    if (!record || !record.vitals) return;
    console.log(data);
    const update = updateVitals.mutateAsync(
      { id: record.vitals.id, data },
      {
        onSuccess: () => {
          utils.record.getOne.invalidate();
          utils.record.getAll.invalidate();
        },
      },
    );

    toast.promise(update, {
      success: "Updated vitals",
      loading: "Updating vitals...",
      error: "Failed to update.",
    });
  };

  if (!record) {
    return <div>Record not found.</div>;
  }

  return (
    <>
      {record.vitals && (
        <fieldset className="p-4 border rounded">
          <legend className="px-2 text-sm">Vitals</legend>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex gap-2 items-start">
                <FormField
                  control={form.control}
                  name="heartRate"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Heart Rate</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <HeartPulseIcon className="w-6 h-6 absolute left-1.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-red-500" />
                          <Input className="pl-8" type="text" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bodyTemp"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Body Temperature</FormLabel>
                      <div className="relative">
                        <ThermometerIcon className="w-6 h-6 absolute left-1.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-orange-500" />
                        <Input className="pl-8" type="text" {...field} />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-2 items-start">
                <FormField
                  control={form.control}
                  name="respRate"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Respiration Rate</FormLabel>
                      <div className="relative">
                        <WindIcon className="w-6 h-6 absolute left-1.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-blue-500" />
                        <Input className="pl-8" type="text" {...field} />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bloodPressure"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Blood Pressure</FormLabel>
                      <div className="relative">
                        <GaugeIcon className="w-6 h-6 absolute left-1.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-purple-500" />
                        <Input className="pl-8" type="text" {...field} />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" variant="secondary" className="w-full">
                Update
              </Button>
            </form>
          </Form>
        </fieldset>
      )}
      {!record.vitals && (
        <button
          className="w-full p-4 border bg-muted flex gap-2 items-center justify-center rounded"
          aria-label="create vitals"
          onClick={() => {
            console.log("hello");
            createVitals.mutate(
              {
                record: {
                  connect: {
                    id: record.id,
                  },
                },
              },
              {
                onSuccess: () => {
                  utils.record.getOne.invalidate();
                  utils.record.getAll.invalidate();
                },
              },
            );
          }}
        >
          <div>This record does not have vitals attached. Create them?</div>
          <PlusIcon className="w-4 h-4" />
        </button>
      )}
    </>
  );
}
