import { serviceRequestRouter } from "./routes";
import { router } from "./trpc";

export const appRouter = router({
  service: serviceRequestRouter,
});

export type AppRouter = typeof appRouter;
