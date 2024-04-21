import { protectedProcedure, publicProcedure } from "../trpc";
import { router } from "../trpc";
import { z } from "zod";
import { baseUser, patient } from "common";

export const Patient = router({
  createOne: protectedProcedure
    .input(
      z.object({
        data: patient.omit({ userId: true }),
        user: z.union([z.object({ id: z.string() }), baseUser]).optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      let userId;

      if (input.user && "sub" in input.user)
        userId = (await ctx.db.user.create({ data: input.user })).id;
      else if (input.user) userId = input.user.id;

      await ctx.db.patient.create({
        data: {
          ...input.data,
          nodeId: undefined,
          pcpId: undefined,
          user: {
            connect: {
              id: userId,
            },
          },
          location: input.data.nodeId
            ? {
                connect: {
                  id: input.data.nodeId,
                },
              }
            : undefined,
          pcp: input.data.pcpId
            ? {
                connect: {
                  userId: input.data.pcpId,
                },
              }
            : undefined,
        },
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

  connectToPcp: protectedProcedure
    .input(z.object({ patientId: z.string(), staffId: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.db.patient.update({
        where: {
          id: input.patientId,
        },
        data: {
          pcp: {
            connect: {
              userId: input.staffId,
            },
          },
        },
      });
    }),
});
