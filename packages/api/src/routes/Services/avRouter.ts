import { publicProcedure } from "../trpc";
import { router } from "../trpc";
import { z } from "zod";
import { baseService, av } from "common";
import { transformCreateServiceInput } from "../../utils/serviceInputTransformer.ts";
export const avRequestRouter = router({
  //AV Request Service
  createAVRequest: publicProcedure
    .input(
      baseService
        .merge(av)
        .extend({ type: z.literal("AV").default("AV") })
        .transform(transformCreateServiceInput),
    )
    .mutation(async ({ input, ctx }) => {
      console.log(input);
      return await ctx.db.av.create({
        data: input,
      });
    }),
  getAVRequest: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      // get an av request

      return ctx.db.av.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  getAllAVRequests: publicProcedure.query(async ({ ctx }) => {
    // get all av requests
    return ctx.db.av.findMany({
      include: {
        service: true,
      },
    });
  }),
  deleteAVRequest: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      // delete an av request
      await ctx.db.av.delete({
        where: {
          id: input.id,
        },
      });

      return { message: "AV request deleted" };
    }),
});
