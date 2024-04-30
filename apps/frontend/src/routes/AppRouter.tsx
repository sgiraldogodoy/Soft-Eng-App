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
import Music from "@/routes/MusicPlayerEasterEgg.tsx";
import { PatientPortal } from "@/routes/PatientPortal.tsx";
import PhoneTextToNav from "@/routes/PhoneTextToNav.tsx";
import HelpMenu from "@/routes/HelpMenu.tsx";
import { EmrEntry } from "@/components/emr/EmrEntry";
import Analytics from "@/routes/Analytics.tsx";

export function AppRouter() {
  const { isAuthenticated, isLoading } = useAuth0();
  const isDefinitelyNotAuthed = !isAuthenticated && !isLoading;

  return (
    <Route>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/credit" component={CreditPage} />
        <Route path="/portal" component={PatientPortal} nest />
        <Route
          path="/phonenav/:startNodeId/:endNodeId/:algorithm/:wheelchair"
          component={PhoneTextToNav}
        />
        <DashboardLayout>
          <Route path="/pathfind">
            <PathFind />
          </Route>
          <Route path="/database" nest>
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
          <Route path="/analytics">
            {isDefinitelyNotAuthed && <Redirect to="/" />}
            <Analytics />
          </Route>
          <Route path="/settings" nest>
            <Settings />
            {isDefinitelyNotAuthed && <Redirect to="/" />}
          </Route>
          <Route path="/patients">
            <PatientIntegration />
            {isDefinitelyNotAuthed && <Redirect to="/" />}
          </Route>
          <Route path="/music">
            <Music />
            {isDefinitelyNotAuthed && <Redirect to="/" />}
          </Route>
          <Route path="/help" nest>
            <HelpMenu />
            {isDefinitelyNotAuthed && <Redirect to="/" />}
          </Route>
          <Route path="/emr" nest>
            <EmrEntry />
          </Route>
        </DashboardLayout>
      </Switch>
    </Route>
  );
}
