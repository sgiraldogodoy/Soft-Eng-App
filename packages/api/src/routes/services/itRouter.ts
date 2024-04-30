import { protectedProcedure } from "../../trpc";
import { router } from "../../trpc";
import { z } from "zod";
import { ZCreateBaseServiceSchema, ZCreateItSchema } from "common";
import { updateSchema } from "common/src/zod-utils.ts";

export const itRequestRouter = router({
  createOne: protectedProcedure
    .input(ZCreateItSchema)
    .mutation(async ({ input, ctx }) => {
      console.log(input);
      return ctx.db.iT.create({
        data: input,
      });
    }),

  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.iT.delete({
        where: {
          id: input.id,
        },
      });
    }),
  deleteMany: protectedProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.iT.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      });
    }),

  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    return ctx.db.iT.deleteMany();
  }),

  updateOne: protectedProcedure
    .input(updateSchema(ZCreateItSchema))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.iT.update({
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
          data: ZCreateItSchema.partial(),
          type: z.literal("it").default("it"),
        }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.iT.updateMany({
        where: {
          id: {
            in: input.ids,
          },
        },
        data: input.data,
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.iT.findMany({
      include: {
        service: true,
      },
    });
  }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.iT.findUnique({
        where: {
          id: input.id,
        },
        include: {
          service: true,
        },
      });
    }),
});
