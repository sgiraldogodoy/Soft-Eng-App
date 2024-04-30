import { protectedProcedure, publicProcedure } from "../../trpc";
import { router } from "../../trpc";
import { z } from "zod";
import { ZCreateBaseServiceSchema, ZCreateFoodSchema } from "common";
import { updateSchema } from "common/src/zod-utils.ts";

export const FoodRouter = router({
  createOne: protectedProcedure
    .input(ZCreateFoodSchema)
    .mutation(async ({ input, ctx }) => {
      console.log(input);
      return ctx.db.food.create({
        data: input,
      });
    }),

  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.food.delete({
        where: {
          id: input.id,
        },
      });
    }),
  deleteMany: protectedProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.food.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      });
    }),
  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    return ctx.db.food.deleteMany();
  }),

  updateOne: protectedProcedure
    .input(updateSchema(ZCreateFoodSchema))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.food.update({
        where: {
          id: input.id,
        },
        data: input.data,
      });
    }),

  updateMany: protectedProcedure
    .input(
      z.object({
        ids: z.string(),
        data: ZCreateBaseServiceSchema.partial().extend({
          data: ZCreateFoodSchema.partial(),
          type: z.literal("equipment").default("equipment"),
        }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.food.updateMany({
        where: {
          id: {
            in: input.ids,
          },
        },
        data: input.data,
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.food.findMany({
      include: {
        service: true,
      },
    });
  }),

  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.food.findUnique({
        where: {
          id: input.id,
        },
        include: {
          service: true,
        },
      });
    }),
});
