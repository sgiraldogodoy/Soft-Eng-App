import { serviceRequestRouter } from "./routes";
import { pathfinder } from "./routes/pathfinder";
import { csvAPIRouter } from "./routes/csv-api";
import { router } from "./trpc";

export const appRouter = router({
  pathfinder: pathfinder,
  service: serviceRequestRouter,
  CSV: csvAPIRouter,
});

export type AppRouter = typeof appRouter;
