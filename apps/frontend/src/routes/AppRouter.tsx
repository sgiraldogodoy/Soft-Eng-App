import { Redirect, Route, Switch } from "wouter";
import HomePage from "@/components/HomePage.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import { InspectDatabase } from "@/routes/InspectDatabase.tsx";
import RequestSummary from "../components/services/RequestSummary";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import ServiceRequestForm from "@/components/services/ServiceRequestForm";
import FloorTabs from "./MapEdit";
import PathFind from "@/routes/PathFind.tsx";

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
            <div className="w-full h-full flex items-center justify-center">
              <ServiceRequestForm variant="room-request" />
            </div>
          </Route>
          <Route path="/requestsummary">
            <RequestSummary />
          </Route>
          <Route path="/mapediting">
            <FloorTabs />
          </Route>
        </DashboardLayout>
      </Switch>
    </Route>
  );
}
