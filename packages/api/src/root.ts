import { avRequestRouter } from "./routes/Services/avRouter.ts";
import { router } from "./trpc";
import { Node } from "./routes/node.ts";
import { Edge } from "./routes/edge.ts";
import { SecurityRouter } from "./routes/Services/securityRouter.ts";
import { FlowerRouter } from "./routes/Services/flowerRouter.ts";
import { GiftRouter } from "./routes/Services/giftRouter.ts";
import { serviceRouter } from "./routes/serviceRouter.ts";
import { RoomRouter } from "./routes/Services/roomRouter.ts";
import { userRouter } from "./routes/user.ts";

export const appRouter = router({
  user: userRouter,
  service: serviceRouter,
  security: SecurityRouter,
  av: avRequestRouter,
  gift: GiftRouter,
  flower: FlowerRouter,
  room: RoomRouter,
  node: Node,
  edge: Edge,
});

export type AppRouter = typeof appRouter;
