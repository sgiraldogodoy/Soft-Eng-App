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
            <Card className="flex-1 flex flex-col">
              <CardHeader>
                <EmrBreadcrumbs />
                <CardTitle>Record</CardTitle>
                <CardDescription>
                  Authored by {record.author.name} on{" "}
                  {DateTime.fromJSDate(record.creationTime).toLocaleString(
                    DateTime.DATETIME_SHORT,
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 h-full">
                <div className="w-full max-h-full overflow-auto flex gap-2">
                  <RecordVitals />
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
