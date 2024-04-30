import { protectedProcedure } from "../../trpc.ts";
import { router } from "../../trpc.ts";
import { z } from "zod";
import { ZCreateAppointmentSchema, ZCreateStaffSchema } from "common";
import { updateSchema } from "common/src/zod-utils.ts";
import { DateTime } from "luxon";
import { TRPCError } from "@trpc/server";

export const appointmentRouter = router({
  createOne: protectedProcedure
    .input(ZCreateAppointmentSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.db.appointment.create({
        data: input,
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.appointment.findMany({
      include: {
        visit: true,
      },
    });
  }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.appointment.findUnique({
        where: {
          id: input.id,
        },
        include: {
          patient: true,
          location: true,
          visit: true,
        },
      });
    }),

  updateCheckIn: protectedProcedure
    .input(
      z.object({
        documentId: z.string(),
        dob: z.string().date(),
        name: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const patient = await ctx.db.patient.findUnique({
        where: {
          idNumber: input.documentId,
        },
      });
      const middleName = patient?.middleName ? patient.middleName + " " : "";
      const fullName =
        patient?.firstName + " " + middleName + patient?.lastName;
      const dob = DateTime.fromJSDate(
        patient?.dateOfBirth ?? new Date(),
      ).toLocaleString(DateTime.DATE_SHORT);
      const inputDob = DateTime.fromISO(input.dob).toLocaleString(
        DateTime.DATE_SHORT,
      );

      /*console.log("patient", patient);
            console.log("dob", dob);
            console.log("inputDob", inputDob);
            console.log("fullName", fullName);
            console.log("input.name", input.name);*/
      let patientId = "";
      if (patient && dob === inputDob && fullName === input.name) {
        patientId = patient.id;
      }

      if (patientId === "") {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Patient not found",
        });
      } else {
        const appointments = await ctx.db.appointment.findMany({
          where: {
            patientId: patientId,
          },
        });

        const today = new Date();
        const hourAgo = new Date(today);
        hourAgo.setHours(today.getHours() - 1);
        const nexthour = new Date(today);
        nexthour.setHours(today.getHours() + 1);

        const todayAppointments = appointments.filter((appointment) => {
          return (
            new Date(appointment.appointmentTime) >= hourAgo &&
            new Date(appointment.appointmentTime) <= nexthour &&
            !appointment.checkedIn
          );
        });
        if (todayAppointments.length > 0) {
          //get earliest appointment
          todayAppointments.sort(
            (a, b) =>
              new Date(a.appointmentTime).getTime() -
              new Date(b.appointmentTime).getTime(),
          );
          const appointmentId = todayAppointments[0].id;

          return ctx.db.appointment.update({
            where: {
              id: appointmentId,
            },
            data: {
              checkedIn: true,
            },
          });
        } else {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "No appointments today found",
          });
        }
      }
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
