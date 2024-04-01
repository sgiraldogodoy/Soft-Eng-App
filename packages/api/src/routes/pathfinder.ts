import { publicProcedure, router } from "../trpc";
import z from "zod";

export const pathfinder = router({
  getNodes: publicProcedure.query(({ ctx }) => {
    const data = ctx.db.node.findMany();

    return data;
  }),
  findPath: publicProcedure
    .input(z.object({ startNodeId: z.string(), endNodeId: z.string() }))
    .query(() => {
      return null;
    }),
});
