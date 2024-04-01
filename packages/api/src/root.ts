import { baseRouter } from "./routes";
import { pathfinder } from "./routes/pathfinder";
import { router } from "./trpc";

export const appRouter = router({
  base: baseRouter,
  pathfinder: pathfinder,
});

export type AppRouter = typeof appRouter;
