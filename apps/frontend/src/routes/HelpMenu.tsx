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
import React from "react";
import { Route, Redirect, useLocation } from "wouter";
import { Button } from "@/components/ui/button.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import PatientGuidePage from "@/routes/PatientGuidePage.tsx";
import StaffGuidePage from "@/routes/StaffGuidePage.tsx";
import AdminGuidePage from "@/routes/AdminGuidePage.tsx";

export default function HelpMenu() {
  const { isAuthenticated, isLoading } = useAuth0();
  const isDefinitelyNotAuthed = !isAuthenticated && !isLoading;
  const [, setLocation] = useLocation();

  const goback = () => {
    setLocation("/pathfind");
  };

  const goPatient = () => {
    setLocation("/patientguide");
  };

  const goStaff = () => {
    setLocation("/staffguide");
  };

  const goAdmin = () => {
    setLocation("/adminguide");
  };

  return (
    <>
      <Card className="bg-white/60 w-auto h-[95%] m-2 rounded-lg shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl flex justify-center">
            User Manual
          </CardTitle>
          <Button variant="secondary" onClick={goback}>
            Back
          </Button>
          <div className="flex justify-center">
            <HelpCommand />
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="flex w-full grid grid-cols-3 gap-y-4">
            <Accordion
              type="single"
              collapsible
              className="w-auto col-span-3 mx-10"
            >
              <AccordionItem value="Intro">
                <AccordionTrigger className="text-black">
                  Introduction: The Basics
                </AccordionTrigger>
                <AccordionContent>*Put Intro Here*</AccordionContent>
              </AccordionItem>
            </Accordion>

            <Button
              variant="ghost"
              onClick={goPatient}
              className="h-auto w-full"
            >
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
          </CardDescription>
        </CardContent>
      </Card>
      <Route path="/patientguide" nest>
        <PatientGuidePage />
        {isDefinitelyNotAuthed && <Redirect to="/" />}
      </Route>
      <Route path="/staffguide" nest>
        <StaffGuidePage />
        {isDefinitelyNotAuthed && <Redirect to="/" />}
      </Route>
      <Route path="/adminguide" nest>
        <AdminGuidePage />
        {isDefinitelyNotAuthed && <Redirect to="/" />}
      </Route>
    </>
  );
}
