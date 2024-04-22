import { avRequestRouter } from "./routes/services/avRouter.ts";
import { router } from "./trpc";
import { Node } from "./routes/node.ts";
import { Edge } from "./routes/edge.ts";
import { SecurityRouter } from "./routes/services/securityRouter.ts";
import { FlowerRouter } from "./routes/services/flowerRouter.ts";
import { GiftRouter } from "./routes/services/giftRouter.ts";
import { serviceRouter } from "./routes/serviceRouter.ts";
import { RoomRouter } from "./routes/services/roomRouter.ts";
import { userRouter } from "./routes/users/user.ts";
import { patientRouter } from "./routes/users/patientRouter.ts";
import { staffRouter } from "./routes/users/staff.ts";

export const appRouter = router({
  user: userRouter,
  patient: patientRouter,
  staff: staffRouter,
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
