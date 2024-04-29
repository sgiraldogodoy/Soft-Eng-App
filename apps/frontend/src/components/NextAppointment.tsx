import { trpc } from "@/utils/trpc.ts";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { useAuth0 } from "@auth0/auth0-react";

export function NextAppointment() {
  const [me] = trpc.user.me.useSuspenseQuery();
  // const sendEmail = trpc.appointment.sendReminder.useMutation();
  const appointments = me?.patient?.appointments;
  const session = useAuth0();

  console.log(me?.patient?.appointments);

  if (appointments?.length === 0) {
    return (
      <div className="flex flex-col gap-3">
        <p className="text-xl">Upcoming appointments</p>
        <Card className="w-1/3">
          <CardContent className="pt-6">
            <div className="text-lg font-semibold">
              You have no upcoming appointments
            </div>
            <div className="text-gray-600">
              If you would like to schedule an appointment, you can click the
              button above.
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  let nextAppointment;
  if (appointments) {
    nextAppointment = appointments[0];
  }
  return (
    <div className="flex-1 flex flex-col gap-3">
      <p className="text-xl">Next Appointment</p>
      <Card className="">
        <CardContent className="flex flex-col gap-4 w-full pt-6">
          <div className="flex justify-between items-start w-full">
            <div className="flex justify-center items-center gap-6 w-full">
              <div className="space-y-0.5 w-full">
                <div className="flex gap-6">
                  <img // Change for pcp's Auth0 profile picture
                    className="h-14 rounded-full object-contain hover:border border-slate-500 cursor-pointer"
                    src={session.user?.picture}
                  />
                  <div className="space-y-0.5">
                    <div className="text-lg font-bold">
                      Dr. {nextAppointment?.staff?.name}
                    </div>
                    <div>{nextAppointment?.staff?.jobTitle}</div>
                  </div>
                </div>
                <div className="text-gray-600">
                  Location:{" "}
                  {nextAppointment?.location?.shortName ?? "No room assigned"}
                </div>
                <div className="flex justify-between text-gray-600 w-full">
                  <div>
                    {nextAppointment?.appointmentTime.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <div>
                    {nextAppointment?.appointmentTime.toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Button
            className="flex gap-2 w-full justify-center items-center bg-blue-600"
            // onClick={() => sendEmail.mutate({email: me?.email})}
          >
            <Bell />
            Set a reminder
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
