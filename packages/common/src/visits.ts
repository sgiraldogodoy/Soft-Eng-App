import { nestSchema } from "./zod-utils.ts";
import { ZCreateNodeSchema } from "./schemas.ts";
import { ZCreatePatientSchema, ZCreateStaffSchema } from "./user.ts";
import { z } from "zod";

export const ZCreateAppointmentSchema = z.object({
  createdTime: z.coerce.date(),
  appointmentTime: z.coerce.date(),
  checkedIn: z.boolean(),
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
