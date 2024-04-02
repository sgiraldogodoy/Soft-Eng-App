import { Route, Switch } from "wouter";
import HomePage from "@/components/HomePage.tsx";
import PathFind from "@/routes/PathFind.tsx";
import NavbarLayout from "@/NavbarLayout.tsx";
import Test from "@/components/Test.tsx";

export function AppRouter() {
  return (
    <>
      <Switch>
        <Route path="/" component={HomePage} />
        <NavbarLayout>
          <Route path="/test">
            <Test />
          </Route>
          <Route path="/pathfind">
            <PathFind />
          </Route>
        </NavbarLayout>
      </Switch>
    </>
  );
}
