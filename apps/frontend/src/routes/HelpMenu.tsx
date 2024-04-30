import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import HelpCommand from "@/components/HelpCommandDialog.tsx";
import React from "react";
import { Route, Redirect } from "wouter";
import { navigate } from "wouter/use-browser-location";
import { Button } from "@/components/ui/button.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import PatientGuidePage from "@/routes/PatientGuidePage.tsx";
import StaffGuidePage from "@/routes/StaffGuidePage.tsx";
import AdminGuidePage from "@/routes/AdminGuidePage.tsx";
import HomeGuidePage from "@/routes/HomeGuidePage.tsx";

export default function HelpMenu() {
  const { isAuthenticated, isLoading } = useAuth0();
  const isDefinitelyNotAuthed = !isAuthenticated && !isLoading;

  const goback = () => {
    navigate("/pathfind", { replace: true });
  };

  const gohome = () => {
    navigate("/help/home", { replace: true });
  };

  return (
    <>
      <Card className="bg-white/60 w-auto h-auto m-2 rounded-lg shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl flex justify-center">
            User Manual
            <Button onClick={goback} className="absolute right-5 top-5">
              Back to Map
            </Button>
          </CardTitle>
          <div className="flex justify-center">
            <HelpCommand />
            <Button
              onClick={gohome}
              variant="secondary"
              className="bg-white border-2 mx-2"
            >
              Help Home
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="flex w-full grid grid-cols-3 gap-y-4">
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
            <Route path="/home" nest>
              <HomeGuidePage />
              {isDefinitelyNotAuthed && <Redirect to="/" />}
            </Route>
          </CardDescription>
        </CardContent>
      </Card>
    </>
  );
}
