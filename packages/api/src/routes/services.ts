import { publicProcedure } from "../trpc";
import { router } from "../trpc";
import { z } from "zod";
import { addFlowerDatabase } from "../../utils/db.ts";
export const serviceRequestRouter = router({
  //Flower Request Service
  createFlowerRequest: publicProcedure
    .input(
      z.object({
        id: z.string().optional(),
        serviceId: z.string(),
        flower: z.string(),
        recipientName: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
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

      return ctx.db.flower.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  getAllFlowerRequests: publicProcedure.query(async ({ ctx }) => {
    // get all flower requests
    return ctx.db.flower.findMany();
  }),
  deleteFlowerRequest: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      // delete a flower request
      await ctx.db.flower.delete({
        where: {
          id: input.id,
        },
      });

      return { message: "Flower request deleted" };
    }),
});
