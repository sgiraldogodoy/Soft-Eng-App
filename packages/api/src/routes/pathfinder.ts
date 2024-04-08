import { publicProcedure, router } from "../trpc";
import z from "zod";
import {
  Context,
  aStar,
  breadthFirstSearch,
  depthFirstSearch,
} from "../../utils/PathFinding.ts";

const myPathFinding: Context = new Context();
myPathFinding.setPathFindingAlg = new aStar();

export const pathfinder = router({
  getNodes: publicProcedure.query(({ ctx }) => {
    const data = ctx.db.node.findMany();

    return data;
  }),

  findPath: publicProcedure
    .input(
      z.object({
        startNodeId: z.string(),
        endNodeId: z.string(),
        algorithm: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      if (input.algorithm === "DFS") {
        myPathFinding.setFindPathAlg(new depthFirstSearch());
      } else if (input.algorithm === "BFS") {
        myPathFinding.setFindPathAlg(new breadthFirstSearch());
      } else myPathFinding.setFindPathAlg(new aStar());

      return await myPathFinding.run(
        input.startNodeId,
        input.endNodeId,
        ctx.db,
      );
    }),
});
