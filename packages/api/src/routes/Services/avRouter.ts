import { publicProcedure } from "../../trpc";
import { router } from "../../trpc";
import { z } from "zod";
import { baseService, av } from "common";
import { transformCreateServiceInput } from "../../../utils/serviceInputTransformer.ts";
export const avRequestRouter = router({
  //AV Request Service
  createOne: publicProcedure
    .input(
      baseService
        .extend({ data: av, type: z.literal("AV").default("AV") })
        .transform(transformCreateServiceInput),
    )
    .mutation(async ({ input, ctx }) => {
      console.log(input);
      return ctx.db.aV.create({
        data: input,
      });
    }),
  deleteOne: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      // delete a av request
      await ctx.db.aV.delete({
        where: {
          id: input.id,
        },
      });

      return { message: "AV request deleted" };
    }),
  deleteMany: publicProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.aV.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      });
    }),
  deleteAll: publicProcedure.mutation(async ({ ctx }) => {
    return ctx.db.aV.deleteMany();
  }),
  getOne: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      // get an av request

      return ctx.db.aV.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    // get all av requests
    return ctx.db.aV.findMany({
      include: {
        service: true,
      },
    });
  }),
  updateOne: publicProcedure
    .input(
      z.object({
        id: z.string(),
        data: baseService.partial().extend({
          data: av.partial(),
          type: z.literal("AV").default("AV"),
        }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { data, ...rest } = input;

      return ctx.db.aV.update({
        where: {
          id: input.id,
        },
        data: {
          ...data,
          service: {
            update: {
              ...rest,
            },
          },
        },
      });
    }),
  updateMany: publicProcedure
    .input(
      z.object({
        ids: z.array(z.string()),
        data: baseService.partial().extend({
          data: av.partial(),
          type: z.literal("AV").default("AV"),
        }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.aV.updateMany({
        where: {
          id: {
            in: input.ids,
          },
        },
        data: input.data,
      });
    }),
});
