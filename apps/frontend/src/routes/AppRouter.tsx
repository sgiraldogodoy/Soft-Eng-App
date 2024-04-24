import { Redirect, Route, Switch } from "wouter";
import HomePage from "@/routes/HomePage.tsx";
import PathFind from "@/routes/PathFind.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import { InspectDatabase } from "@/routes/InspectDatabase.tsx";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import MapEdit from "./MapEdit";
import ServiceRequestPage from "./ServiceRequestPage";
import AboutPage from "./AboutPage";
import PatientIntegration from "./PatientIntegration";
import { Settings } from "@/routes/Settings.tsx";
import CreditPage from "@/routes/CreditPage.tsx";

export function AppRouter() {
  const { isAuthenticated, isLoading } = useAuth0();
  const isDefinitelyNotAuthed = !isAuthenticated && !isLoading;

  return (
    <Route>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/credit" component={CreditPage} />
        <DashboardLayout>
          <Route path="/pathfind">
            <PathFind />
          </Route>
          <Route path="/database">
            <InspectDatabase />
            {isDefinitelyNotAuthed && <Redirect to="/" />}
          </Route>
          <Route path="/services">
            {isDefinitelyNotAuthed && <Redirect to="/" />}
            <div className="w-full h-full flex items-center justify-center">
              <ServiceRequestPage />
            </div>
          </Route>
          <Route path="/mapediting">
            {isDefinitelyNotAuthed && <Redirect to="/" />}
            <MapEdit />
          </Route>
          <Route path="/settings" nest>
            <Settings />
            {isDefinitelyNotAuthed && <Redirect to="/" />}
          </Route>
          <Route path="/patients">
            <PatientIntegration />
            {!isAuthenticated && <Redirect to="/" />}
          </Route>
        </DashboardLayout>
      </Switch>
    </Route>
  );
}
