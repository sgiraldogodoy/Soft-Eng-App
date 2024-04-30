import { protectedProcedure } from "../../trpc.ts";
import { router } from "../../trpc.ts";
import { z } from "zod";
import { ZCreateVisitSchema } from "common";
import { updateSchema } from "common/src/zod-utils.ts";

export const visitRouter = router({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.visit.findMany();
  }),

  //Hello from the other side
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.visit.findUnique({
        where: {
          id: input.id,
        },
        include: {
          patient: true,
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
    .input(updateSchema(ZCreateVisitSchema))
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

  deleteMany: protectedProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.visit.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      });
    }),

  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    return ctx.db.visit.deleteMany();
  }),

  connectToPatient: protectedProcedure
    .input(z.object({ visitId: z.string(), patientId: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.db.visit.update({
        where: {
          id: input.visitId,
        },
        data: {
          patient: {
            connect: {
              id: input.patientId,
            },
          },
        },
      });
    }),

  connectToStaff: protectedProcedure
    .input(z.object({ visitId: z.string(), staffId: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.db.visit.update({
        where: {
          id: input.visitId,
        },
        data: {
          staff: {
            connect: {
              id: input.staffId,
            },
          },
        },
      });
    }),

  close: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.db.visit.update({
        where: {
          id: input.id,
        },
        data: {
          closed: true,
        },
      });
    }),
});
