import { protectedProcedure, publicProcedure } from "../../trpc.ts";
import { router } from "../../trpc.ts";
import { z } from "zod";
import { ZCreateAppointmentSchema, ZCreateStaffSchema } from "common";
import { updateSchema } from "common/src/zod-utils.ts";
import { DateTime } from "luxon";

export const appointmentRouter = router({
  createOne: protectedProcedure
    .input(ZCreateAppointmentSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.db.appointment.create({
        data: input,
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.appointment.findMany();
  }),

  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.appointment.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  getByCheckIn: publicProcedure
    .input(
      z.object({
        documentId: z.string(),
        dob: z.string().date(),
        name: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const patient = await ctx.db.patient.findUnique({
        where: {
          idNumber: input.documentId,
        },
        include: {
          appointments: true,
        },
      });
      const fullName =
        patient?.firstName +
        " " +
        patient?.middleName +
        " " +
        patient?.lastName;
      const dob = DateTime.fromJSDate(
        patient?.dateOfBirth ?? new Date(),
      ).toLocaleString(DateTime.DATE_SHORT);
      const inputDob = DateTime.fromISO(input.dob).toLocaleString(
        DateTime.DATE_SHORT,
      );
      let patientId;
      if (patient && dob === inputDob && fullName === input.name) {
        patientId = patient.id;
      }
      return ctx.db.appointment.findMany({
        where: {
          patientId: patientId,
        },
      });
    }),

  deleteOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.appointment.delete({
        where: {
          id: input.id,
        },
      });
    }),

  deleteMany: protectedProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.appointment.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      });
    }),

  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    return ctx.db.appointment.deleteMany();
  }),

  updateOne: protectedProcedure
    .input(updateSchema(ZCreateAppointmentSchema))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.appointment.update({
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
        data: ZCreateStaffSchema.partial(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.appointment.updateMany({
        where: {
          id: {
            in: input.ids,
          },
        },
        data: input.data,
      });
    }),

  connectToLocation: protectedProcedure
    .input(z.object({ appointmentId: z.string(), nodeId: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.db.appointment.update({
        where: {
          id: input.appointmentId,
        },
        data: {
          location: {
            connect: {
              id: input.nodeId,
            },
          },
        },
      });
    }),

  connectToVisit: protectedProcedure
    .input(z.object({ appointmentId: z.string(), visitId: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.db.appointment.update({
        where: {
          id: input.appointmentId,
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
});
