import { serviceRequestRouter } from "./routes/services.ts";
import { router } from "./trpc";
import { Node } from "./routes/node.ts";
import { Edge } from "./routes/edge.ts";
import { FlowerRouter } from "./routes/Services/flowerRouter.ts";
import { GiftRouter } from "./routes/Services/giftRouter.ts";

export const appRouter = router({
  service: serviceRequestRouter,
  gift: GiftRouter,
  flower: FlowerRouter,
  node: Node,
  edge: Edge,
});

export type AppRouter = typeof appRouter;
