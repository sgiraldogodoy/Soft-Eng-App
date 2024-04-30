import { protectedProcedure } from "../../trpc.ts";
import { router } from "../../trpc.ts";
import { z } from "zod";
import {ZCreatePatientSchema, ZUpdatePatientSchema} from "common";
import { manySchema, updateSchema } from "common/src/zod-utils.ts";
import { DateTime } from "luxon";

export const patient = router({
  createOne: protectedProcedure
    .input(ZCreatePatientSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.db.patient.create({
        data: {
          ...input,
          dateOfBirth:
            DateTime.fromISO(input.dateOfBirth).setZone("local").toISO() ?? "",
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

  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.patient.findMany({
      include: {
        location: true,
        pcp: true,
        user: true,
      },
    });
  }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.patient.findUnique({
        where: {
          id: input.id,
        },
        include: {
          location: true,
          pcp: true,
          user: true,
          appointments: true,
          visits: true,
          identity: true,
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

    updatePatient: protectedProcedure
        .input(z.object({
            basePatient: updateSchema(ZUpdatePatientSchema),
            locationId: z.string().optional(),
            identity: z.object({
                idNumber: z.string(),
                idType: z.enum(["ssn", "driverLicense", "passport"])
            }).optional(),
            pcpId: z.string().optional(),
            userId: z.string().optional(),
        }))
        .mutation(async ({input, ctx}) => {
            return ctx.db.patient.update({
                where: {
                    id: input.basePatient.id,
                },
                data: {
                    ...input.basePatient.data,
                    location: {
                        connect: {
                            id: input.locationId,
                        },
                    },
                    pcp: {
                        connect: {
                            id: input.pcpId,
                        },
                    },
                    user: {
                        connect: {
                            id: input.userId,
                        },
                    },
                    identity: {
                        connectOrCreate: {
                            where: {
                                idNumber: input?.identity?.idNumber,
                            },
                            create: {
                                ...input?.identity!,
                            },
                        },
                    },
                },
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

  diagnoses: protectedProcedure
    .input(z.object({ patientId: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.db.diagnosis.findMany({
        where: {
          record: {
            visit: {
              patientId: input.patientId,
            },
          },
        },
        include: {
          record: true,
        },
      });
    }),

  prescriptions: protectedProcedure
    .input(z.object({ patientId: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.db.prescription.findMany({
        where: {
          diagnosis: {
            record: {
              visit: {
                patientId: input.patientId,
              },
            },
          },
        },
        include: {
          diagnosis: {
            include: {
              record: {
                include: {
                  visit: {
                    include: { patient: true },
                  },
                },
              },
            },
          },
        },
      });
    }),
});
