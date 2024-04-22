import { protectedProcedure } from "../../trpc.ts";
import { router } from "../../trpc.ts";
import { z } from "zod";
import { ZCreateVisitSchema } from "common";

export const visitRouter = router({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.visit.findMany();
  }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.visit.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  createOne: protectedProcedure
    .input(ZCreateVisitSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.db.visit.create({
        data: input,
      });
    }),

  updateOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: ZCreateVisitSchema.partial(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { data } = input;
      return ctx.db.visit.update({
        where: {
          id: input.id,
        },
        data: {
          ...data,
        },
      });
    }),

  updateMany: protectedProcedure
    .input(
      z.object({
        ids: z.array(z.string()),
        data: ZCreateVisitSchema.partial(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.visit.updateMany({
        where: {
          id: {
            in: input.ids,
          },
        },
        data: input.data,
      });
    }),

  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.db.visit.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
