import { Route, Switch } from "wouter";
import HomePage from "@/components/HomePage.tsx";
import PathFind from "@/routes/PathFind.tsx";
import NavbarLayout from "@/components/NavbarLayout.tsx";

export function AppRouter() {
  return (
    <Route>
      <Switch>
        <Route path="/" component={HomePage} />
        <NavbarLayout>
          <Route path="/pathfind">
            <PathFind />
          </Route>
        </NavbarLayout>
      </Switch>
    </Route>
  );
}
