import { Redirect, Route, Switch } from "wouter";
import HomePage from "@/routes/HomePage.tsx";
import PathFind from "@/routes/PathFind.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import { InspectDatabase } from "@/routes/InspectDatabase.tsx";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import FloorTabs from "./MapEdit";
import ServiceRequestPage from "./ServiceRequestPage";
import { Settings } from "@/routes/Settings.tsx";
// import Settings from "./Settings";

export function AppRouter() {
  const { isAuthenticated, isLoading } = useAuth0();
  const isDefinitelyNotAuthed = !isAuthenticated && !isLoading;

  return (
    <Route>
      <Switch>
        <Route path="/" component={HomePage} />
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
            <FloorTabs />
          </Route>
          <Route path="/settings">
            <Settings />
            {isDefinitelyNotAuthed && <Redirect to="/" />}
          </Route>
        </DashboardLayout>
      </Switch>
    </Route>
  );
}
