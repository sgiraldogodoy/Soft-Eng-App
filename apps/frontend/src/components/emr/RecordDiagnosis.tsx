import { trpc } from "@/utils/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { EmrBreadcrumbs } from "./EmrBreadcrumbs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { createContext, useContext } from "react";
import { Diagnosis, Pharmacy, Prescription } from "database";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { PrescriptionViewer } from "./PrescriptionViewer";

const DiagnosisContext = createContext<
  | (Diagnosis & { prescriptions: (Prescription & { pharmacy: Pharmacy })[] })
  | null
>(null);
export const useMaybeDiagnosis = () => useContext(DiagnosisContext);
export const useDiagnosis = () => {
  const diagnosis = useContext(DiagnosisContext);
  if (!diagnosis) {
    throw new Error("Record not found!");
  }

  return diagnosis;
};

interface RecordDiagnosisProps {
  diagnosisId: string;
}

const formSchema = z.object({
  illness: z.string(),
  advice: z.string(),
  notes: z.string(),
});

export function RecordDiagnosis({ diagnosisId }: RecordDiagnosisProps) {
  const [diagnosis] = trpc.diagnosis.getOne.useSuspenseQuery({
    id: diagnosisId,
  });

  const utils = trpc.useUtils();
  const updateDiagnosis = trpc.diagnosis.update.useMutation({
    onSuccess: () => {
      utils.record.getAll.invalidate();
      utils.record.getOne.invalidate();
      utils.diagnosis.getOne.invalidate();
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      illness: diagnosis?.illness ?? "",
      advice: diagnosis?.advice ?? "",
      notes: diagnosis?.notes ?? "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const update = updateDiagnosis.mutateAsync({
      id: diagnosis!.id,
      data,
    });

    toast.promise(update, {
      success: "Successfully updated diagnosis.",
      loading: "Updating diagnosis...",
      error: "Failed to update diagnosis!",
    });
  };

  if (!diagnosis) {
    return <div>Diagnosis not found.</div>;
  }

  return (
    <DiagnosisContext.Provider value={diagnosis}>
      <Card className="flex-1 overflow-auto flex flex-col border-orange-300">
        <CardHeader>
          <EmrBreadcrumbs />
          <CardTitle className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-400 rounded-full" />
            Diagnosis
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col overflow-auto gap-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex-0 space-y-2"
            >
              <div className="w-full flex flex-col gap-2">
                <div className="w-full flex-1 flex gap-4">
                  <FormField
                    control={form.control}
                    name="illness"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Illness</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="advice"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Advice</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem className="flex-1 flex flex-col">
                      <FormLabel>Notes</FormLabel>
                      <FormControl className="flex-1">
                        <Textarea
                          placeholder="Type notes here..."
                          className="h-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button className="w-full">Save</Button>
            </form>
          </Form>
          <PrescriptionViewer />
        </CardContent>
      </Card>
    </DiagnosisContext.Provider>
  );
}
