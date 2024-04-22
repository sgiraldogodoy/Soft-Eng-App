import { Redirect, Route, Switch } from "wouter";
import HomePage from "@/routes/HomePage.tsx";
import PathFind from "@/routes/PathFind.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import { InspectDatabase } from "@/routes/InspectDatabase.tsx";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import MapEdit from "./MapEdit";
import ServiceRequestPage from "./ServiceRequestPage";
import { Settings } from "@/routes/Settings.tsx";
// import Settings from "./Settings";

export function AppRouter() {
  const { isAuthenticated } = useAuth0();
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
            {!isAuthenticated && <Redirect to="/" />}
          </Route>
          <Route path="/services">
            {!isAuthenticated && <Redirect to="/" />}
            <div className="w-full h-full flex items-center justify-center">
              <ServiceRequestPage />
            </div>
          </Route>
          <Route path="/mapediting">
            {!isAuthenticated && <Redirect to="/" />}
            <MapEdit />
          </Route>
          <Route path="/settings">
            <Settings />
            {!isAuthenticated && <Redirect to="/" />}
          </Route>
        </DashboardLayout>
      </Switch>
    </Route>
  );
}
