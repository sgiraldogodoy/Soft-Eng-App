import { publicProcedure } from "../trpc";
import { router } from "../trpc";
import { z } from "zod";

export const serviceRequestRouter = router({
  //Flower Request Service
  createFlowerRequest: publicProcedure
    .input(
      z.object({
        id: z.string().optional(),
        nodeId: z.string(),
        flowerName: z.string(),
        requestDate: z.date().optional(),
        loginName: z.string(),
        commentOnFlower: z.string(),
        totalPayment: z.number(),
        delivered: z.boolean(),
        recipient: z.string().optional(),
        priority: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      // if (!node) {
      //   throw new Error(
      //     "Node does not exist. Please create a node with that Id first.",
      //   );
      // }
      // return await addFlowerDatabase(input, ctx.db);
      return ctx.db.flowerRequest.create({
        data: input,
      });
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
