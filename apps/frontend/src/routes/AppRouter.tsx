import { Route, Switch } from "wouter";
import HomePage from "@/components/HomePage.tsx";
import PathFind from "@/routes/PathFind.tsx";
import FlowerRequest from "./FlowerRequest";

export function AppRouter() {
  return (
    <>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/pathfind" component={PathFind} />
        <Route path="/services" nest>
          <Switch>
            <Route path="/request" nest>
              <Switch>
                <Route path="/flowers" nest component={FlowerRequest} />
              </Switch>
            </Route>
          </Switch>
        </Route>
      </Switch>
    </>
  );
}
