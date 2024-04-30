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
          <AccordionContent>
            <p>
              &emsp;&emsp;Contained within this user manual is the description
              of every feature, where they lie within the website itself, how to
              access them, and their practical applications for patients, staff,
              and administration members. Captures of each step on the website
              are displayed as well to help clarify each step to navigating and
              operating features. The Features across the website require
              different degrees of access, with the most basic form of access
              being patient. The middle ground would be staff level access and
              then the highest being Admin, being able to use all features
              contained within the website. This also means that the higher
              levels of access inherit all of the actions that the level of
              access that previous level has.
            </p>
            <br />
            <p>
              &emsp;&emsp;With our current structure to security on our website,
              we have some basic features that are constant across the different
              levels of access that are described below.
            </p>
            <Accordion type="single" collapsible className="w-auto mx-10">
              <AccordionItem value="Pathfinding">
                <AccordionTrigger className="text-black">
                  Pathfinding
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    &emsp;&emsp;Pathfinding can be accessed by pressing the Get
                    Directions button on the left on the Home Screen. Here they
                    can see the map of the entire hospital.
                  </p>
                  <div className="w-full flex justify-center">
                    <img
                      src="./helpmenucaptures/Pathfind0.PNG"
                      alt="homescreen"
                      className="object-scale-down w-[50%] h-auto rounded-md m-2"
                    />
                  </div>
                  <br />
                  <p>
                    &emsp;&emsp;Users can drag around the screen to pan the map,
                    or scroll their mouse to zoom in or out. If users want to
                    return to the Home Page, they can press the arrow on the top
                    right corner of the screen.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
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
