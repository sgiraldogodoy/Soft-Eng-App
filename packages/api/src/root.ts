import { serviceRequestRouter } from "./routes/services.ts";
import { router } from "./trpc";
import { dbRouter } from "./routes/db-router.ts";
import { Node } from "./routes/node.ts";
import { SecurityRouter } from "./routes/Services/securityRouter.ts";

export const appRouter = router({
  service: serviceRequestRouter,
  security: SecurityRouter,
  db: dbRouter,
  node: Node,
});

export type AppRouter = typeof appRouter;
