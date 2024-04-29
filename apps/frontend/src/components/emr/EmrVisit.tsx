import { trpc } from "@/utils/trpc";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { DateTime } from "luxon";
import { RecordTable } from "./RecordsTable";
import { Suspense, createContext, useContext } from "react";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import BackgroundWave from "../BackgroundWave";
import { Route, Switch } from "wouter";
import { toast } from "sonner";
import { RecordEdit } from "./RecordEdit";
import { EmrBreadcrumbs } from "./EmrBreadcrumbs";
import type { Patient, Visit } from "database";

const VisitContext = createContext<(Visit & { patient: Patient }) | null>(null);
export const useMaybeVisit = () => useContext(VisitContext);

export function EmrVisit({ visitId }: { visitId: string }) {
  const [visit] = trpc.visit.getOne.useSuspenseQuery({
    id: visitId,
  });

  const [me] = trpc.user.me.useSuspenseQuery();

  const utils = trpc.useUtils();
  const createRecord = trpc.record.createOne.useMutation({
    onSuccess: () => {
      utils.record.getAll.invalidate();
      utils.record.getOne.invalidate();
    },
  });

  if (!visit) {
    return <div>Visit does not exist!</div>;
  }

  if (!me || !me.staff) {
    return <div>You must have a staff connected to use this page.</div>;
  }

  return (
    <>
      <BackgroundWave />
      <div className="w-full h-full flex flex-col gap-2 p-4">
        <Card className="animate-in fade-in zoom-in-105 duration-500">
          <CardHeader>
            <CardTitle>
              {visit.patient.firstName} {visit.patient.lastName}
            </CardTitle>
            <CardDescription className="flex flex-row justify-between items-center">
              <span>
                {DateTime.fromJSDate(visit.patient.dateOfBirth).toLocaleString(
                  DateTime.DATE_SHORT,
                )}
              </span>
              <span>
                Joined{" "}
                {DateTime.fromJSDate(visit.patient.entryDate).toLocaleString(
                  DateTime.DATETIME_MED,
                )}
              </span>
            </CardDescription>
          </CardHeader>
        </Card>
        <VisitContext.Provider value={visit}>
          <Switch>
            <Route path="/record/:id" nest>
              {({ id }) => <RecordEdit recordId={id} />}
            </Route>
            <Route path="/">
              <Card className="flex-1 overflow-auto animate-in fade-in zoom-in-105 duration-500 delay-200 fill-mode-both flex flex-col">
                <CardHeader>
                  <EmrBreadcrumbs />
                  <CardTitle>Records</CardTitle>
                  <CardDescription>
                    View and create records for this visit.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2 overflow-auto">
                  <Button
                    onClick={async () => {
                      const creation = createRecord.mutateAsync({
                        visit: {
                          connect: {
                            id: visit.id,
                          },
                        },
                        type: "None",
                        author: {
                          connect: {
                            id: me.staff!.id,
                          },
                        },
                      });

                      toast.promise(creation, {
                        success: "Succesfully created record.",
                        loading: "Creating record...",
                        error: "Error creating record.",
                      });
                    }}
                    className="ml-auto shrink-0"
                    size="sm"
                  >
                    <PlusIcon className="w-4 h-4" />
                    Create Record
                  </Button>
                  <Suspense>
                    <RecordTable />
                  </Suspense>
                </CardContent>
              </Card>
            </Route>
          </Switch>
        </VisitContext.Provider>
      </div>
    </>
  );
}
