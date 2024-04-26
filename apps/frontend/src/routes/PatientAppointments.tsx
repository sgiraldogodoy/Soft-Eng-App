import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function PatientAppointments() {
  return (
    <>
      <div className="absolute bottom-0 left-0 w-full h-full bg-sky-100">
        <div className="flex contents-inline">
          <h1 className="grid-cols-1 font-medium text-3xl text-nowrap p-10">
            Patient Portal
          </h1>
          <Button className="my-10">Schedule Appointment</Button>
        </div>
        <Card className="mx-10 w-auto h-auto">
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>
              View and manage your upcoming appointments
            </CardDescription>
          </CardHeader>
          <CardContent>I need serious help</CardContent>
          <CardFooter>Upcoming Appointments</CardFooter>
        </Card>
      </div>
    </>
  );
}
