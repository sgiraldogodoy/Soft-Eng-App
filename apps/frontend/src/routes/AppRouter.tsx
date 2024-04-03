import { Redirect, Route, Switch } from "wouter";
import HomePage from "@/components/HomePage.tsx";
import PathFind from "@/routes/PathFind.tsx";
import NavbarLayout from "@/components/NavbarLayout.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import { InspectDatabase } from "@/routes/InspectDatabase.tsx";

export function AppRouter() {
  const { isAuthenticated } = useAuth0();
  return (
    <Route>
      <Switch>
        <Route path="/" component={HomePage} />
        <NavbarLayout>
          <Route path="/pathfind">
            <PathFind />
          </Route>
          <Route path="/database">
            <InspectDatabase />
            {!isAuthenticated && <Redirect to="/" />}
          </Route>
        </NavbarLayout>
      </Switch>
    </Route>
  );
}
