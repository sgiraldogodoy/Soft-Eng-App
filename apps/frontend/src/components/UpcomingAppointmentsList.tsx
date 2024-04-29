import { Card, CardContent } from "@/components/ui/card.tsx";
import { trpc } from "@/utils/trpc.ts";
// import {Button} from "@/components/ui/button.tsx";

export default function UpcomingAppointmentsList() {
  const me = trpc.user.me.useQuery();
  const upcomingAppointments = me?.data?.patient?.appointments;

  return (
    <div className="flex-1 overflow-auto flex flex-col gap-3 col-span-2">
      <p className="text-xl">Upcoming Appointments</p>
      <Card className="gap-2 flex-1 overflow-auto ">
        <CardContent className="overflow-auto space-y-2 pt-6">
          {upcomingAppointments?.map((appointment) => {
            return (
              <Card className="w-full">
                <CardContent className="flex flex-col gap-4 w-full pt-6">
                  <div className="flex justify-between items-start w-full">
                    <div className="flex justify-center items-center gap-6 w-full">
                      <div className="space-y-0.5 w-full">
                        <div className="flex gap-6">
                          <div className="space-y-0.5">
                            <div className="text-lg font-bold">
                              Dr. {appointment.staff?.name}
                              {/*<Button className="">...</Button>*/}
                            </div>
                            <div>{appointment.staff?.jobTitle}</div>
                          </div>
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
  );
}
