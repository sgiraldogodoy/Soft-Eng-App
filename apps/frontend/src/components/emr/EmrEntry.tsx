import { trpc } from "@/utils/trpc";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Suspense, useMemo } from "react";
import { DateTime } from "luxon";
import { Button } from "../ui/button";
import { Route, Switch, useLocation } from "wouter";
import { EmrVisit } from "./EmrVisit";
import { AppointmentsTable } from "./AppointmentsTable";

const AppointmentCard = ({ appointmentId }: { appointmentId: string }) => {
  const [appointment] = trpc.appointment.getOne.useSuspenseQuery({
    id: appointmentId,
  });

  const [me] = trpc.user.me.useSuspenseQuery();

  const createVisit = trpc.visit.createOne.useMutation();

  const [, setLocation] = useLocation();

  if (!appointment) {
    return <div>Error! Appointment not found.</div>;
  }

  if (!me || !me.staff) {
    return <div>You must be logged in</div>;
  }

  return (
    <Card className="flex-1 space-y-4">
      <CardContent className="pt-6 space-y-2">
        <CardTitle>
          {appointment.patient.firstName} {appointment.patient.lastName}
        </CardTitle>
        <div className="flex flex-row justify-between items-center">
          <span>
            {DateTime.fromJSDate(appointment.appointmentTime).toLocaleString(
              DateTime.DATETIME_MED,
            )}
          </span>
          <span className="opacity-50">{appointment.location?.longName}</span>
        </div>
        <Button
          onClick={async () => {
            const visit =
              appointment.visit?.id ??
              (
                await createVisit.mutateAsync({
                  appointment: {
                    connect: {
                      id: appointment.id,
                    },
                  },
                  patient: {
                    connect: {
                      id: appointment.patient.id,
                    },
                  },
                  visitTime: new Date().toISOString(),
                  staff: {
                    connect: {
                      id: me.staff!.id,
                    },
                  },
                })
              ).id;

            setLocation("/visit/" + visit);
          }}
          className="w-full"
        >
          {appointment.visit?.id ? "Resume Visit" : "Begin Visit"}
        </Button>
      </CardContent>
    </Card>
  );
};

export function EmrEntry() {
  const appointmentsQuery = trpc.appointment.getAll.useQuery({
    onlyUpcoming: false,
  });

  const upcoming = useMemo(() => {
    return appointmentsQuery.data
      ?.sort(
        (a, b) => a.appointmentTime.getTime() - b.appointmentTime.getTime(),
      )
      .slice(0, 3);
  }, [appointmentsQuery]);

  return (
    <Switch>
      <Route path="/visit/:id" nest>
        {({ id }) => (
          <Suspense>
            <EmrVisit visitId={id} />
          </Suspense>
        )}
      </Route>
      <Route path="/">
        <div className="flex flex-col gap-4 w-full h-full p-4">
          <div className="flex flex-row items-center gap-2">
            {upcoming?.map((a) => (
              <Suspense key={a.id}>
                <AppointmentCard appointmentId={a.id} />
              </Suspense>
            ))}
          </div>
          <Suspense>
            <AppointmentsTable />
          </Suspense>
        </div>
      </Route>
    </Switch>
  );
}
