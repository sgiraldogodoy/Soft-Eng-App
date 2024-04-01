import { serviceRequestRouter } from "./routes";
import { pathfinder } from "./routes/pathfinder";
import { router } from "./trpc";

export const appRouter = router({
  pathfinder: pathfinder,
  service: serviceRequestRouter,
});

export type AppRouter = typeof appRouter;
