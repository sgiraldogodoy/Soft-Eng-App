import { publicProcedure } from "../../trpc";
import { router } from "../../trpc";
import { z } from "zod";
import { baseService, av } from "common";
import { transformCreateServiceInput } from "../../../utils/serviceInputTransformer.ts";

export const avRequestRouter = router({
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
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.aV.delete({
        where: {
          id: input.id,
        },
      });
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

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.aV.findMany();
  }),

  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.aV.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
});
