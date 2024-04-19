import { protectedProcedure, publicProcedure } from "../trpc";
import { router } from "../trpc";
import { z } from "zod";
import { patient } from "common";

export const Patient = router({
  createOne: protectedProcedure
    .input(z.object({ data: patient }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.patient.create({
        data: input.data,
      });
    }),

  createMany: protectedProcedure
    .input(z.object({ data: z.array(patient) }))
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
    .input(z.object({ id: z.string(), data: patient.partial() }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.patient.update({
        where: {
          id: input.id,
        },
        data: input.data,
      });
    }),

  updateMany: protectedProcedure
    .input(z.object({ ids: z.array(z.string()), data: patient.partial() }))
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
});
