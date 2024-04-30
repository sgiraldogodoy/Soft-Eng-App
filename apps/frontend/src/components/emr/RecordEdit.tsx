import { trpc } from "@/utils/trpc";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { DateTime } from "luxon";
import { RecordVitals } from "./RecordVitals";
import { RecordNotes } from "./RecordNotes";
import { RecordDiagnoses } from "./RecordDiagnoses";
import { EmrBreadcrumbs } from "./EmrBreadcrumbs";
import { Route, Switch } from "wouter";
import { createContext, useContext } from "react";
import { RouterRecord } from "./record-type";
import { RecordDiagnosis } from "./RecordDiagnosis";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";

const formSchema = z.object({
  type: z.string(),
});

const RecordContext = createContext<RouterRecord | null>(null);

export const useMaybeRecord = () => useContext(RecordContext);
export const useRecord = () => {
  const record = useContext(RecordContext);
  if (!record) {
    throw new Error("Record not found!");
  }

  return record;
};

export function RecordEdit({ recordId }: { recordId: string }) {
  const [record] = trpc.record.getOne.useSuspenseQuery({
    id: recordId,
  });
  const updateRecord = trpc.record.updateOne.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: record!.type,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const updateType = updateRecord.mutateAsync({
      id: record!.id,
      data: {
        type: data.type,
      },
    });

    toast.promise(updateType, {
      success: "Updated record type.",
      loading: "Updating record type...",
      error: "Failed to update record type.",
    });
  };

  if (!record) {
    return <div>Record not found.</div>;
  }

  return (
    <>
      <RecordContext.Provider value={record}>
        <Switch>
          <Route path="/diagnosis/:id">
            {({ id }) => <RecordDiagnosis diagnosisId={id} />}
          </Route>
          <Route path="/">
            <Card className="flex-1 flex flex-col overflow-auto border-pink-300">
              <CardHeader>
                <EmrBreadcrumbs />
                <CardTitle className="flex items-center gap-2">
                  <span>
                    <div className="w-4 h-4 rounded-full bg-pink-500" />
                  </span>
                  Record
                </CardTitle>
                <CardDescription>
                  Authored by {record.author.name} on{" "}
                  {DateTime.fromJSDate(record.creationTime).toLocaleString(
                    DateTime.DATETIME_SHORT,
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 overflow-auto">
                <div className="w-full flex gap-2">
                  <div className="flex flex-col flex-1 gap-2">
                    <fieldset className="border rounded p-4">
                      <legend className="px-2 text-sm font-bold">Type</legend>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                          <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                              <FormItem>
                                <div className="flex gap-2">
                                  <FormControl>
                                    <Input
                                      type="text"
                                      {...field}
                                      onBlur={form.handleSubmit(onSubmit)}
                                    />
                                  </FormControl>
                                  <Button
                                    disabled={updateRecord.isPending}
                                    type="submit"
                                  >
                                    Save
                                  </Button>
                                </div>
                              </FormItem>
                            )}
                          />
                        </form>
                      </Form>
                    </fieldset>
                    <RecordVitals />
                  </div>
                  <RecordNotes />
                </div>
                <RecordDiagnoses />
              </CardContent>
            </Card>
          </Route>
        </Switch>
      </RecordContext.Provider>
    </>
  );
}
