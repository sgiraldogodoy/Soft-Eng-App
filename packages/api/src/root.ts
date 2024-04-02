import { serviceRequestRouter } from "./routes/services.ts";
import { pathfinder } from "./routes/pathfinder";
import { router } from "./trpc";
import { dbRouter } from "./routes/db-router.ts";

export const appRouter = router({
  pathfinder: pathfinder,
  service: serviceRequestRouter,
  db: dbRouter,
});

export type AppRouter = typeof appRouter;
