import { serviceRequestRouter } from "./routes/services.ts";
import { avRequestRouter } from "./routes/Services/avRouter.ts";
import { router } from "./trpc";
import { dbRouter } from "./routes/db-router.ts";
import { Node } from "./routes/node.ts";

export const appRouter = router({
  service: serviceRequestRouter,
  av: avRequestRouter,
  db: dbRouter,
  node: Node,
});

export type AppRouter = typeof appRouter;
