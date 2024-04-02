import { Route, Switch } from "wouter";
import HomePage from "@/components/HomePage.tsx";
import PathFind from "@/routes/PathFind.tsx";
import RequestSummary from "@/components/services/RequestSummary";

export function AppRouter() {
  return (
    <>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/pathfind" component={PathFind} />
        <Route path="/services" component={RequestSummary} />
      </Switch>
    </>
  );
}
