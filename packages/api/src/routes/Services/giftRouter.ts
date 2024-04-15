import { publicProcedure } from "../../trpc";
import { router } from "../../trpc";
import { z } from "zod";
import { baseService, gift } from "common";
import { transformCreateServiceInput } from "../../../utils/serviceInputTransformer.ts";

export const GiftRouter = router({
  createOne: publicProcedure
    .input(
      baseService
        .extend({ data: gift, type: z.literal("GIFT").default("GIFT") })
        .transform(transformCreateServiceInput),
    )
    .mutation(async ({ input, ctx }) => {
      console.log(input);
      return ctx.db.gift.create({
        data: input,
      });
    }),

  deleteOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.gift.delete({
        where: {
          id: input.id,
        },
      });
    }),
  deleteMany: publicProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.gift.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      });
    }),

  deleteAll: publicProcedure.mutation(async ({ ctx }) => {
    return ctx.db.gift.deleteMany();
  }),

  updateOne: publicProcedure
    .input(
      z.object({
        id: z.string(),
        data: baseService.partial().extend({
          data: gift.partial(),
          type: z.literal("GIFT").default("GIFT"),
        }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { data, ...rest } = input;

      return ctx.db.gift.update({
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
          data: gift.partial(),
          type: z.literal("GIFT").default("GIFT"),
        }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.gift.updateMany({
        where: {
          id: {
            in: input.ids,
          },
        },
        data: input.data,
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.gift.findMany();
  }),

  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.gift.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
});
