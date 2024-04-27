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
import { Suspense } from "react";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import BackgroundWave from "../BackgroundWave";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Link, Route, Switch, useLocation, useParams } from "wouter";
import { toast } from "sonner";
import { RecordEdit } from "./RecordEdit";

export function EmrVisit({ visitId }: { visitId: string }) {
  const [visit] = trpc.visit.getOne.useSuspenseQuery({
    id: visitId,
  });

  const [location] = useLocation();
  const params = useParams();

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
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbLink asChild>
              <Link to="~/emr">Visits</Link>
            </BreadcrumbLink>
            <BreadcrumbSeparator />
            <BreadcrumbItem>{visit.id}</BreadcrumbItem>
            {location.includes("record") && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbLink asChild>
                  <Link to="/">Records</Link>
                </BreadcrumbLink>
                <BreadcrumbSeparator />
                <BreadcrumbItem>{params.id}</BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
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
        <Switch>
          <Route path="/record/:id">
            {({ id }) => <RecordEdit recordId={id} />}
          </Route>
          <Route path="/">
            <Card className="flex-1 overflow-auto animate-in fade-in zoom-in-105 duration-500 delay-200 fill-mode-both">
              <CardHeader>
                <CardTitle>Records</CardTitle>
                <CardDescription>
                  View and create records for this visit.
                </CardDescription>
                <CardContent className="flex flex-col gap-2">
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
                    className="ml-auto"
                    size="sm"
                  >
                    <PlusIcon className="w-4 h-4" />
                    Create Record
                  </Button>
                  <Suspense>
                    <RecordTable />
                  </Suspense>
                </CardContent>
              </CardHeader>
            </Card>
          </Route>
        </Switch>
      </div>
    </>
  );
}
