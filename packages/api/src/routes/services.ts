import { publicProcedure } from "../trpc";
import { router } from "../trpc";
import { z } from "zod";
import { baseService, flower } from "common";
import { transformCreateServiceInput } from "../../utils/serviceInputTransformer.ts";
export const serviceRequestRouter = router({
  //Flower Request Service
  createFlowerRequest: publicProcedure
    .input(
      baseService
        .merge(flower)
        .extend({ type: z.literal("FLOWER").default("FLOWER") })
        .transform(transformCreateServiceInput),
    )
    .mutation(async ({ input, ctx }) => {
      console.log(input);
      return await ctx.db.flower.create({
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

      return ctx.db.flower.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  getAllFlowerRequests: publicProcedure.query(async ({ ctx }) => {
    // get all flower requests
    return ctx.db.flower.findMany({
      include: {
        service: true,
      },
    });
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
