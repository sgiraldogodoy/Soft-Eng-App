import { Switch, Route } from "wouter";
import { InspectDatabase } from "./InspectDatabase";

export function AppRouter() {
  return (
    <>
      {/* <Route path="/" component={Login} */}
      <Switch>
        <Route path="/">
          <InspectDatabase />
        </Route>
      </Switch>
    </>
  );
}
