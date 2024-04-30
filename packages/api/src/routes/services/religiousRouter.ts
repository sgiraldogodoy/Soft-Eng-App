import { protectedProcedure } from "../../trpc";
import { router } from "../../trpc";
import { z } from "zod";
import { ZCreateBaseServiceSchema, ZCreateReligiousSchema } from "common";
import { updateSchema } from "common/src/zod-utils.ts";

export const religiousRequestRouter = router({
  createOne: protectedProcedure
    .input(ZCreateReligiousSchema)
    .mutation(async ({ input, ctx }) => {
      console.log(input);
      return ctx.db.religious.create({
        data: input,
      });
    }),

  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.religious.delete({
        where: {
          id: input.id,
        },
      });
    }),
  deleteMany: protectedProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.religious.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      });
    }),

  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    return ctx.db.religious.deleteMany();
  }),

  updateOne: protectedProcedure
    .input(updateSchema(ZCreateReligiousSchema))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.religious.update({
        where: {
          id: input.id,
        },
        data: input.data,
      });
    }),

  updateMany: protectedProcedure
    .input(
      z.object({
        ids: z.array(z.string()),
        data: ZCreateBaseServiceSchema.partial().extend({
          data: ZCreateReligiousSchema.partial(),
          type: z.literal("religious").default("religious"),
        }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.religious.updateMany({
        where: {
          id: {
            in: input.ids,
          },
        },
        data: input.data,
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.religious.findMany({
      include: {
        service: true,
      },
    });
  }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.religious.findUnique({
        where: {
          id: input.id,
        },
        include: {
          service: true,
        },
      });
    }),
});
