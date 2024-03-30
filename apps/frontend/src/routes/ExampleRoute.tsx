import React from "react";
import { ExampleComponent } from "../components/ExampleComponent.tsx";
import { trpc } from "../utils/trpc.ts";

export default function ExampleRoute() {
  const query = trpc.base.hello.useQuery();

  return (
    <div className="w-100">
      <h1>This is an example page.</h1>
      <p>{query.data?.message ?? "loading"}</p>
      <ExampleComponent></ExampleComponent>
    </div>
  );
}
