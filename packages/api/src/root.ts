import { serviceRequestRouter } from "./routes/services.ts";
import { router } from "./trpc";
import { Node } from "./routes/node.ts";
import { Edge } from "./routes/edge.ts";

export const appRouter = router({
  service: serviceRequestRouter,
  node: Node,
  edge: Edge,
});

export type AppRouter = typeof appRouter;
