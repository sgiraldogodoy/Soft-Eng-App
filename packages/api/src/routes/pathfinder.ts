import { publicProcedure, router } from "../trpc";
import z from "zod";
import { PathFinding } from "../../utils/PathFinding.ts";

export const pathfinder = router({
  getNodes: publicProcedure.query(({ ctx }) => {
    const data = ctx.db.node.findMany();

    return data;
  }),
  findPathBFS: publicProcedure
    .input(z.object({ startNodeId: z.string(), endNodeId: z.string() }))
    .query(async ({ input, ctx }) => {
      return await PathFinding.breadthFirstSearch(
        input.startNodeId,
        input.endNodeId,
        ctx.db,
      );
    }),
});
