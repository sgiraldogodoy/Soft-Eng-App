import { protectedProcedure, publicProcedure } from "../../trpc";
import { router } from "../../trpc";
import { z } from "zod";
import { baseService, gift } from "common";
import { transformCreateServiceInput } from "../../../utils/serviceInputTransformer.ts";

export const GiftRouter = router({
  createOne: protectedProcedure
    .input(
      baseService
        .extend({ data: gift, type: z.literal("gift").default("gift") })
        .transform(transformCreateServiceInput),
    )
    .mutation(async ({ input, ctx }) => {
      console.log(input);
      return ctx.db.gift.create({
        data: input,
      });
    }),

  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.gift.delete({
        where: {
          id: input.id,
        },
      });
    }),
  deleteMany: protectedProcedure
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

  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    return ctx.db.gift.deleteMany();
  }),

  updateOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: baseService.partial().extend({
          data: gift.partial(),
          type: z.literal("gift").default("gift"),
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

  updateMany: protectedProcedure
    .input(
      z.object({
        ids: z.array(z.string()),
        data: baseService.partial().extend({
          data: gift.partial(),
          type: z.literal("gift").default("gift"),
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
    return ctx.db.gift.findMany({
      include: {
        service: true,
      },
    });
  }),

  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.gift.findUnique({
        where: {
          id: input.id,
        },
        include: {
          service: true,
        },
      });
    }),
});
