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
});
