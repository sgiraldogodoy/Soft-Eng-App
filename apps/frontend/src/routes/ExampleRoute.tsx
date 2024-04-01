import React from "react";
import { ExampleComponent } from "@/components/ExampleComponent.tsx";
import { trpc } from "../utils/trpc.ts";
import { Button } from "@/components/ui/button.tsx";

export default function ExampleRoute() {
  const query = trpc.base.hello.useQuery();

  return (
    <div className="w-100">
      <h1>This is an example page.</h1>

      <p>{query.data?.message ?? "loading"}</p>
      <ExampleComponent></ExampleComponent>
      <Button></Button>
    </div>
  );
}
