import { nestSchema } from "./zod-utils.ts";
import { ZCreateNodeSchema } from "./schemas.ts";
import { ZCreatePatientSchema, ZCreateStaffSchema } from "./user.ts";
import { z } from "zod";

export const ZCreateVisitSchema = z.object({
  patient: nestSchema(ZCreatePatientSchema),
  visitTime: z.string().datetime(),
  staff: nestSchema(ZCreateStaffSchema),
});

export const ZCreateAppointmentSchema = z.object({
  createdTime: z.coerce.date(),
  appointmentTime: z.coerce.date(),
  checkedIn: z.boolean(),
  staff: nestSchema(ZCreateStaffSchema),
  patient: nestSchema(ZCreatePatientSchema),
  visit: nestSchema(ZCreateVisitSchema).optional(),
  notes: z.string(),
  location: nestSchema(ZCreateNodeSchema).optional(),
});

export const ZCreateVisitNoteSchema = z.object({
  type: z.string(),
  content: z.string(),
  author: nestSchema(ZCreateStaffSchema),
  visitId: nestSchema(ZCreateVisitSchema),
});
