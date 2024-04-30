import { ZCreatePrescriptionSchema } from "common";
import { protectedProcedure, router } from "../../trpc";
import { z } from "zod";

export const diagnosisRouter = router({
  create: protectedProcedure
    .input(z.object({ recordId: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.db.diagnosis.create({
        data: {
          recordId: input.recordId,
          illness: "",
          notes: "",
          advice: "",
        },
      });
    }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.db.diagnosis.findUnique({
        where: {
          id: input.id,
        },
        include: {
          record: true,
          prescriptions: {
            include: {
              pharmacy: true,
            },
          },
        },
      });
    }),

  getRecordDiagnoses: protectedProcedure
    .input(z.object({ recordId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.diagnosis.findMany({
        where: {
          recordId: input.recordId,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: z.object({
          illness: z.string().optional(),
          advice: z.string().optional(),
          notes: z.string().optional(),
        }),
      }),
    )
    .mutation(({ input, ctx }) => {
      return ctx.db.diagnosis.update({
        where: {
          id: input.id,
        },
        data: input.data,
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.db.diagnosis.delete({
        where: {
          id: input.id,
        },
      });
    }),

  attachPrescription: protectedProcedure
    .input(ZCreatePrescriptionSchema)
    .mutation(async ({ input, ctx }) => {
      const { pharmacy, diagnosisId, ...rest } = input;

      const p = await ctx.db.prescription.create({
        data: {
          ...rest,
          diagnosis: {
            connect: {
              id: diagnosisId,
            },
          },
          pharmacy: {
            connectOrCreate: {
              where: {
                email: pharmacy.email,
              },
              create: {
                name: pharmacy.name,
                email: pharmacy.email,
              },
            },
          },
        },
      });

      return p;
    }),
});
