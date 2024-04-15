import { serviceRequestRouter } from "./routes/services.ts";
import { router } from "./trpc";
import { Node } from "./routes/node.ts";
import { Edge } from "./routes/edge.ts";
import { SecurityRouter } from "./routes/Services/securityRouter.ts";
import { GiftRouter } from "./routes/Services/giftRouter.ts";

export const appRouter = router({
  service: serviceRequestRouter,
  security: SecurityRouter,
  gift: GiftRouter,
  node: Node,
  edge: Edge,
});

export type AppRouter = typeof appRouter;
