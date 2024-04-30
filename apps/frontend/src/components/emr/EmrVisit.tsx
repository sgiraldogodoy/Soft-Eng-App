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
import { CircleAlert, FolderX, PlusIcon } from "lucide-react";
import BackgroundWave from "../BackgroundWave";
import { Route, Switch, useLocation } from "wouter";
import { toast } from "sonner";
import { RecordEdit } from "./RecordEdit";
import { EmrBreadcrumbs } from "./EmrBreadcrumbs";
import type { Patient, Visit } from "database";
import { PatientPrescriptionTable } from "./PatientPrescriptionsTable";
import { PatientDiagnosesTable } from "./PatientDiagnosesTable";
import { Label } from "../ui/label";

const VisitContext = createContext<(Visit & { patient: Patient }) | null>(null);
export const useMaybeVisit = () => useContext(VisitContext);
export const useVisit = () => {
  const visit = useContext(VisitContext);
  if (!visit) {
    throw new Error("Expected visit to be defined.");
  }
  return visit;
};

export function EmrVisit({ visitId }: { visitId: string }) {
  const utils = trpc.useUtils();
  const [visit] = trpc.visit.getOne.useSuspenseQuery({
    id: visitId,
  });

  const [, setLocation] = useLocation();

  const closeVisit = trpc.visit.close.useMutation({
    onSuccess: () => {
      utils.visit.getOne.invalidate();
    },
  });

  const [me] = trpc.user.me.useSuspenseQuery();

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
          {visit.closed && (
            <div className="animate-in zoom-in-105 fade-in duration-500 p-4 rounded-xl shadow-md border border-red-300 bg-red-200 flex gap-2">
              <CircleAlert />
              You are viewing a visit that has ended.
            </div>
          )}
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
                    View and create records for {visit.patient.firstName}{" "}
                    {visit.patient.lastName}.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-2 overflow-auto">
                  <div className="flex ml-auto shrink-0 gap-2">
                    {!visit.closed && (
                      <Button
                        onClick={async () => {
                          const visitClose = closeVisit.mutateAsync({
                            id: visit.id,
                          });

                          toast.promise(visitClose, {
                            success: "Succesfully closed visit.",
                            loading: "Closing visit...",
                            error: "Error closing visit.",
                          });
                        }}
                        className="ml-auto shrink-0 gap-2"
                        size="sm"
                        variant="secondary"
                      >
                        <FolderX className="w-4 h-4" />
                        End Visit
                      </Button>
                    )}
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

                        const newRecord = await creation;

                        setLocation(`/record/${newRecord?.id}`);
                      }}
                      className="ml-auto shrink-0 gap-2"
                      size="sm"
                    >
                      <PlusIcon className="w-4 h-4" />
                      Create Record
                    </Button>
                  </div>
                  <div className="flex flex-col gap-4 flex-1">
                    <Suspense>
                      <RecordTable thisVisit />
                      <hr className="w-full border-slate-200" />
                      <div className="flex-1 flex gap-2 items-stretch">
                        <div className="flex-1 flex flex-col gap-2">
                          <Label>Other Records</Label>
                          <RecordTable className="flex-1 border-green-600" />
                        </div>
                        <div className="flex-1 flex flex-col gap-2">
                          <Label>Prescriptions</Label>
                          <PatientPrescriptionTable />
                        </div>
                        <div className="flex-1 flex flex-col gap-2">
                          <Label>Diagnoses</Label>
                          <PatientDiagnosesTable />
                        </div>
                      </div>
                    </Suspense>
                  </div>
                </CardContent>
              </Card>
            </Route>
          </Switch>
        </VisitContext.Provider>
      </div>
    </>
  );
}
