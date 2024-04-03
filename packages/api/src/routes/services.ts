import { publicProcedure } from "../trpc";
import { router } from "../trpc";
import { z } from "zod";
import { addFlowerDatabase } from "../../utils/db.ts";
import { validateNode } from "../../utils/validators.ts";

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
      return await addFlowerDatabase(input, ctx.db);
    }),
  getFlowerRequest: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      // get a flower request

      return await ctx.db.flowerRequest.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  getAllFlowerRequests: publicProcedure.query(async ({ ctx }) => {
    // get all flower requests
    return ctx.db.flowerRequest.findMany();
  }),
  deleteFlowerRequest: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      // delete a flower request
      await ctx.db.flowerRequest.delete({
        where: {
          id: input.id,
        },
      });

      return { message: "Flower request deleted" };
    }),
  deliver: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db.flowerRequest.update({
        where: {
          id: input.id,
        },
        data: {
          delivered: true,
        },
      });

      console.log(res);

      return {
        message: "Flower request updated.",
      };
    }),
});
