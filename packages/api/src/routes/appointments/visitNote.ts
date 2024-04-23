import { protectedProcedure } from "../../trpc.ts";
import { router } from "../../trpc.ts";
import { z } from "zod";
import { ZCreateVisitNoteSchema } from "common";
import { updateSchema } from "common/src/zod-utils.ts";

export const visitNoteRouter = router({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.visitNote.findMany();
  }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.visitNote.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  createOne: protectedProcedure
    .input(ZCreateVisitNoteSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.db.visitNote.create({
        data: input,
      });
    }),

  updateOne: protectedProcedure
    .input(updateSchema(ZCreateVisitNoteSchema))
    .mutation(async ({ input, ctx }) => {
      const { data } = input;
      return ctx.db.visitNote.update({
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
        data: ZCreateVisitNoteSchema.partial(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.visitNote.updateMany({
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
      return ctx.db.visitNote.delete({
        where: {
          id: input.id,
        },
      });
    }),

  deleteMany: protectedProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.visitNote.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      });
    }),

  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    return ctx.db.visitNote.deleteMany();
  }),

  connectToVisit: protectedProcedure
    .input(z.object({ visitNoteId: z.string(), visitId: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.db.visitNote.update({
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
      return ctx.db.visitNote.update({
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
