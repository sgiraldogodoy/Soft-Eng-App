import { protectedProcedure, publicProcedure } from "../../trpc.ts";
import { router } from "../../trpc.ts";
import { z } from "zod";
import { ZCreatePatientSchema } from "common";
import { manySchema, updateSchema } from "common/src/zod-utils.ts";

export const patient = router({
  createOne: protectedProcedure
    .input(ZCreatePatientSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.db.patient.create({
        data: {
          ...input,
          dateOfBirth: new Date(input.dateOfBirth).toISOString(),
        },
      });
    }),

  createMany: protectedProcedure
    .input(manySchema(ZCreatePatientSchema))
    .mutation(async ({ input, ctx }) => {
      ctx.db.patient.createMany({
        data: input.data,
        skipDuplicates: true,
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.patient.findMany();
  }),

  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.patient.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.patient.delete({
        where: {
          id: input.id,
        },
      });
    }),

  deleteMany: protectedProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.patient.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      });
    }),

  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    return ctx.db.patient.deleteMany();
  }),

  updateOne: protectedProcedure
    .input(updateSchema(ZCreatePatientSchema))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.patient.update({
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
        data: ZCreatePatientSchema.partial(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.patient.updateMany({
        where: {
          id: {
            in: input.ids,
          },
        },
        data: input.data,
      });
    }),

  connectToUser: protectedProcedure
    .input(z.object({ patientId: z.string(), userId: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.db.patient.update({
        where: {
          id: input.patientId,
        },
        data: {
          user: {
            connect: {
              id: input.userId,
            },
          },
        },
      });
    }),

  connectToStaffPcP: protectedProcedure
    .input(z.object({ patientId: z.string(), staffId: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.db.patient.update({
        where: {
          id: input.patientId,
        },
        data: {
          pcp: {
            connect: {
              id: input.staffId,
            },
          },
        },
      });
    }),
});
