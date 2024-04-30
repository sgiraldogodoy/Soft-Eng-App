import { protectedProcedure } from "../../trpc";
import { router } from "../../trpc";
import { z } from "zod";
import { ZCreateBaseServiceSchema, ZCreateVisitorSchema } from "common";
import { updateSchema } from "common/src/zod-utils.ts";

export const visitorRequestRouter = router({
  createOne: protectedProcedure
    .input(ZCreateVisitorSchema)
    .mutation(async ({ input, ctx }) => {
      console.log(input);
      return ctx.db.visitor.create({
        data: input,
      });
    }),

  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.visitor.delete({
        where: {
          id: input.id,
        },
      });
    }),
  deleteMany: protectedProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.visitor.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      });
    }),

  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    return ctx.db.visitor.deleteMany();
  }),

  updateOne: protectedProcedure
    .input(updateSchema(ZCreateVisitorSchema))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.visitor.update({
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
          data: ZCreateVisitorSchema.partial(),
          type: z.literal("visit").default("visit"),
        }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.visitor.updateMany({
        where: {
          id: {
            in: input.ids,
          },
        },
        data: input.data,
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.visitor.findMany({
      include: {
        service: true,
      },
    });
  }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.visitor.findUnique({
        where: {
          id: input.id,
        },
        include: {
          service: true,
        },
      });
    }),
});
