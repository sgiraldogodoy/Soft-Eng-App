import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { navigate } from "wouter/use-browser-location";
import { Button } from "@/components/ui/button.tsx";

export default function HomeGuidePage() {
  const goPatient = () => {
    navigate("/help/patientguide", { replace: true });
  };

  const goStaff = () => {
    navigate("/help/staffguide", { replace: true });
  };

  const goAdmin = () => {
    navigate("/help/adminguide", { replace: true });
  };

  return (
    <>
      <Accordion type="single" collapsible className="w-auto col-span-3 mx-10">
        <AccordionItem value="Intro">
          <AccordionTrigger className="text-black">
            Introduction: The Basics
          </AccordionTrigger>
          <AccordionContent>*Put Intro Here*</AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button variant="ghost" onClick={goPatient} className="h-auto w-full">
        <Card className="w-full h-fit shadow-md">
          <CardHeader>
            <CardTitle>Patient</CardTitle>
          </CardHeader>
          <CardContent className="text-left">
            <CardDescription>
              Patients Features:
              <ul className="ps-5 list-disc">
                <li>Appointment Check in</li>
                <li>Appointment Management</li>
                <li>Appointment Scheduling</li>
              </ul>
            </CardDescription>
          </CardContent>
        </Card>
      </Button>

      <Button variant="ghost" onClick={goStaff} className="h-auto w-full">
        <Card className="w-full h-fit shadow-md">
          <CardHeader>
            <CardTitle>Staff</CardTitle>
          </CardHeader>
          <CardContent className="text-left">
            <CardDescription>
              Staff Features:
              <ul className="ps-5 list-disc">
                <li>Create Service Requests</li>
                <li>Patient Management</li>
                <li>Create Patients and Staff</li>
              </ul>
            </CardDescription>
          </CardContent>
        </Card>
      </Button>

      <Button variant="ghost" onClick={goAdmin} className="h-auto w-full">
        <Card className="w-full h-fit shadow-md">
          <CardHeader>
            <CardTitle>Admin</CardTitle>
          </CardHeader>
          <CardContent className="text-left">
            <CardDescription>
              Admin Features:
              <ul className="ps-5 list-disc">
                <li>Map Editing</li>
                <li>Database Management</li>
                <li>Create Users</li>
              </ul>
            </CardDescription>
          </CardContent>
        </Card>
      </Button>
    </>
  );
}
