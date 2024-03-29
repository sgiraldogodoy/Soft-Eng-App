import { baseRouter } from "./routes";
import { router } from "./trpc";

export const appRouter = router({
  base: baseRouter,
});

export type AppRouter = typeof appRouter;
