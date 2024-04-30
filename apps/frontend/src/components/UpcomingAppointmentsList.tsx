import { Card, CardContent } from "@/components/ui/card.tsx";
import { trpc } from "@/utils/trpc.ts";
import { X } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog.tsx";
import { toast } from "sonner";
import { Route, useLocation } from "wouter";
import { Button } from "@/components/ui/button.tsx";
// import {toast} from "sonner";

export default function UpcomingAppointmentsList() {
  const me = trpc.user.me.useQuery();
  const [, setLocation] = useLocation();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const upcomingAppointments = me?.data?.patient?.appointments;
  const deleteMutation = trpc.appointment.deleteOne.useMutation();
  const utils = trpc.useUtils();

  if (upcomingAppointments?.length === 0) {
    return (
      <div className="flex flex-1 flex-col h-full gap-3">
        <p className="text-xl">Upcoming Appointments</p>
        <Card className="h-full flex-1">
          <CardContent className="pt-6 h-full flex-1">
            <div className="text-lg font-semibold">
              You have no upcoming appointments
            </div>
            <div className="text-gray-600l">
              If you would like to schedule an appointment, contact your care
              team.
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="min-w-[66vw] overflow-auto flex flex-col gap-3 h-full">
        <p className="text-xl">Upcoming Appointments</p>
        <Card className="gap-2 flex-1 h-full  overflow-auto ">
          <CardContent className="overflow-auto space-y-2 pt-6">
            {upcomingAppointments?.map((appointment) => {
              return (
                <Card key={appointment.id} className="w-full">
                  <CardContent className="flex flex-col gap-4 w-full pt-6">
                    <div className="flex justify-between items-start w-full">
                      <div className="flex justify-center items-center gap-6 w-full">
                        <div className="space-y-0.5 w-full">
                          <div className="flex gap-6 justify-between">
                            <div className="space-y-0.5">
                              <div className="text-lg font-bold">
                                Dr. {appointment.staff?.name}
                              </div>
                              <div>{appointment.staff?.jobTitle}</div>
                            </div>
                            <Button
                              variant="ghost"
                              className="h-8 w-8 p-0"
                              onClick={() => {
                                setLocation("/cancel");
                                setDeletingId(appointment.id);
                                console.log(deletingId);
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="text-gray-600">
                            Location:{" "}
                            {appointment.location?.shortName ?? "Not assigned"}
                          </div>
                          <div className="flex justify-between text-gray-600 w-full">
                            <div>
                              {appointment.appointmentTime.toLocaleTimeString(
                                [],
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )}
                            </div>
                            <div>
                              {appointment.appointmentTime.toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </CardContent>
        </Card>
      </div>
      <Route path="/cancel">
        <AlertDialog
          open={!!deletingId}
          onOpenChange={(v) => {
            if (!v) setDeletingId(null);
          }}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                user and remove the data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setLocation(`~/portal`)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  if (!deletingId) return;

                  const deletion = deleteMutation.mutateAsync(
                    {
                      id: deletingId,
                    },
                    {
                      onSuccess: () => {
                        utils.user.me.invalidate();
                      },
                    },
                  );

                  toast.promise(deletion, {
                    success: "Appointment successfully canceled",
                    loading: "Attempting to cancel appointment",
                    error: "Failed to cancel appointment",
                  });
                  await deletion;
                  setDeletingId(null);
                  setLocation(`~/portal`);
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Route>
    </>
  );
}
