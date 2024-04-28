import { protectedProcedure } from "../../trpc.ts";
import { router } from "../../trpc.ts";
import { z } from "zod";
import { ZCreateRecordSchema } from "common";
import { updateSchema } from "common/src/zod-utils.ts";

export const recordRouter = router({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.record.findMany();
  }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.record.findUnique({
        where: {
          id: input.id,
        },
        include: {
          author: true,
          vitals: true,
          diagnoses: true,
        },
      });
    }),

  createOne: protectedProcedure
    .input(ZCreateRecordSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.db.record.create({
          data: input,
        });
      } catch (e) {
        console.error(e);
      }
    }),

  updateOne: protectedProcedure
    .input(updateSchema(ZCreateRecordSchema))
    .mutation(async ({ input, ctx }) => {
      try {
        console.log(input);
        const { data } = input;
        console.log(data);
        return await ctx.db.record.update({
          where: {
            id: input.id,
          },
          data: {
            ...data,
          },
        });
      } catch (e) {
        console.error(e);
      }
    }),

  updateMany: protectedProcedure
    .input(
      z.object({
        ids: z.array(z.string()),
        data: ZCreateRecordSchema.partial(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.record.updateMany({
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
      return ctx.db.record.delete({
        where: {
          id: input.id,
        },
      });
    }),

  deleteMany: protectedProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.record.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      });
    }),

  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    return ctx.db.record.deleteMany();
  }),

  connectToVisit: protectedProcedure
    .input(z.object({ visitNoteId: z.string(), visitId: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.db.record.update({
        where: {
          id: input.visitNoteId,
        },
        data: {
          visit: {
            connect: {
              id: input.visitId,
            },
          },
        },
      });
    }),

  connectToStaff: protectedProcedure
    .input(z.object({ visitNoteId: z.string(), authorId: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.db.record.update({
        where: {
          id: input.visitNoteId,
        },
        data: {
          author: {
            connect: {
              id: input.authorId,
            },
          },
        },
      });
    }),
});
