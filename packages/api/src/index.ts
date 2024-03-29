import type { AppRouter } from "./root.ts";
import { appRouter } from "./root.ts";
import { createTRPCContext } from "./trpc.ts";

export type { AppRouter };
export { appRouter, createTRPCContext };
