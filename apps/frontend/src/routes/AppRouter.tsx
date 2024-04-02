import { Route, Switch } from "wouter";
import HomePage from "@/components/HomePage.tsx";
import Test from "@/components/Test.tsx";

export function AppRouter() {
  return (
    <>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/test" component={Test} />
      </Switch>
    </>
  );
}
