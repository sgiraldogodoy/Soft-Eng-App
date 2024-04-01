import { publicProcedure } from "../trpc";
import { router } from "../trpc";
import { z } from "zod";
import { validateNode, addFlowerDatabase } from "../../utils/db.ts";

export const serviceRequestRouter = router({
  createFlowerRequest: publicProcedure
    .input(
      z.object({
        id: z.string(),
        nodeId: z.string(),
        flowerName: z.string(),
        requestDate: z.date().optional(),
        loginName: z.string(),
        commentOnFlower: z.string(),
        totalPayment: z.number(),
        delivered: z.boolean(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const node = await validateNode(input.nodeId, ctx.db);
      if (!node) {
        return { message: "node does not exist" };
      }
      return addFlowerDatabase(input, ctx.db);
    }),
  getFlowerRequest: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      // get a flower request

      return ctx.db.flowerRequest.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  getAllFlowerRequests: publicProcedure.query(async ({ ctx }) => {
    // get all flower requests
    return ctx.db.flowerRequest.findMany();
  }),
});
