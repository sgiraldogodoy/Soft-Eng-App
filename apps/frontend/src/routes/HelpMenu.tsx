import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import HelpCommand from "@/components/HelpCommandDialog.tsx";

export default function HelpMenu() {
  return (
    <>
      <Card className="bg-white/70 w-auto h-[95%] m-2 rounded-lg shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl flex justify-center">
            User Manual
          </CardTitle>
          <div className="flex justify-center">
            <HelpCommand />
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="flex w-full grid grid-cols-3 gap-4">
            <Accordion
              type="single"
              collapsible
              className="w-auto col-span-3 mx-10"
            >
              <AccordionItem value="Intro">
                <AccordionTrigger>Introduction: The Basics</AccordionTrigger>
                <AccordionContent>*Put Intro Here*</AccordionContent>
              </AccordionItem>
            </Accordion>
            <Card className="w-full h-fit p-2 m-2 shadow-md">
              <CardHeader>
                <CardTitle>Patient</CardTitle>
              </CardHeader>
              <CardContent>
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
            <Card className="w-full h-fit p-2 m-2 shadow-md">
              <CardHeader>
                <CardTitle>Staff</CardTitle>
              </CardHeader>
              <CardContent>
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
            <Card className="w-full h-fit p-2 m-2 shadow-md">
              <CardHeader>
                <CardTitle>Admin</CardTitle>
              </CardHeader>
              <CardContent>
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
          </CardDescription>
        </CardContent>
      </Card>
    </>
  );
}
