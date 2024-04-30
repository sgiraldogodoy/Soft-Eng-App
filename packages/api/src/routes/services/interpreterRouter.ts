import { protectedProcedure } from "../../trpc";
import { router } from "../../trpc";
import { z } from "zod";
import { ZCreateBaseServiceSchema, ZCreateInterpreterSchema } from "common";
import { updateSchema } from "common/src/zod-utils.ts";

export const InterpreterRouter = router({
  createOne: protectedProcedure
    .input(ZCreateInterpreterSchema)
    .mutation(async ({ input, ctx }) => {
      console.log(input);
      return ctx.db.interpreter.create({
        data: input,
      });
    }),

  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.interpreter.delete({
        where: {
          id: input.id,
        },
      });
    }),
  deleteMany: protectedProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.interpreter.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      });
    }),
  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    return ctx.db.interpreter.deleteMany();
  }),

  updateOne: protectedProcedure
    .input(updateSchema(ZCreateInterpreterSchema))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.interpreter.update({
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
          data: ZCreateInterpreterSchema.partial(),
          type: z.literal("interpreter").default("interpreter"),
        }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.interpreter.updateMany({
        where: {
          id: {
            in: input.ids,
          },
        },
        data: input.data,
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.interpreter.findMany({
      include: {
        service: true,
      },
    });
  }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.interpreter.findUnique({
        where: {
          id: input.id,
        },
        include: {
          service: true,
        },
      });
    }),
});
