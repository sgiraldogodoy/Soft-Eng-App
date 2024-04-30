import { nestSchema } from "./zod-utils.ts";
import { ZCreateNodeSchema } from "./schemas.ts";
import { ZCreatePatientSchema, ZCreateStaffSchema } from "./user.ts";
import { z } from "zod";

export const ZCreateAppointmentSchema = z.object({
  appointmentTime: z.string().transform((val, ctx) => {
    const { success: isDatetime } = z
      .string()
      .datetime({
        offset: true,
      })
      .safeParse(val);

    if (isDatetime) return val;

    console.log(val + ":00-4:00");
    const { data, success } = z
      .string()
      .datetime({
        offset: true,
      })
      .safeParse(val + ":00-04:00");

    if (!success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid date.",
        path: ["appointmentTime"],
      });
      return z.NEVER;
    }

    return data;
  }),
  checkedIn: z.boolean().default(false),
  staff: nestSchema(ZCreateStaffSchema),
  patient: nestSchema(ZCreatePatientSchema),
  notes: z.string(),
  location: nestSchema(ZCreateNodeSchema).optional(),
});

export const ZCreateVisitSchema = z.object({
  patient: nestSchema(ZCreatePatientSchema),
  visitTime: z.string().datetime(),
  staff: nestSchema(ZCreateStaffSchema),
  appointment: nestSchema(ZCreateAppointmentSchema),
});

export const ZCreateRecordSchema = z.object({
  type: z.string(),
  author: nestSchema(ZCreateStaffSchema),
  visit: nestSchema(ZCreateVisitSchema),
  notes: z.string().default(""),
});

const numlike = z.union([z.string(), z.number()]);
export const ZUpdateVitalsSchema = z.object({
  heartRate: numlike
    .pipe(z.coerce.number({ message: "Heart rate must be a number." }))
    .optional(),
  bodyTemp: numlike
    .pipe(
      z.coerce.number({
        message: "Body temperature must be a number.",
      }),
    )
    .optional(),
  respRate: numlike
    .pipe(
      z.coerce.number({
        message: "Respiration rate must be a number.",
      }),
    )
    .optional(),
  bloodPressure: z.string().regex(/(^[0-9]+\/[0-9]+$)|(^$)/, {
    message: "Blood pressure must be a fraction, i.e. 120/80",
  }),
});
export type TCreateVitalsSchema = z.infer<typeof ZUpdateVitalsSchema>;
