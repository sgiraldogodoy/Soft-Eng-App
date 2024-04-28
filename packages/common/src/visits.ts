import { nestSchema } from "./zod-utils.ts";
import { ZCreateNodeSchema } from "./schemas.ts";
import { ZCreatePatientSchema, ZCreateStaffSchema } from "./user.ts";
import { z } from "zod";

export const ZCreateVisitSchema = z.object({
  patient: nestSchema(ZCreatePatientSchema),
  visitTime: z.coerce.date(),
  staff: nestSchema(ZCreateStaffSchema),
});

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
    }

    return data;
  }),
  checkedIn: z.boolean().default(false),
  staff: nestSchema(ZCreateStaffSchema),
  patient: nestSchema(ZCreatePatientSchema),
  visit: nestSchema(ZCreateVisitSchema).optional(),
  notes: z.string(),
  location: nestSchema(ZCreateNodeSchema).optional(),
});

export const ZCreateVisitNoteSchema = z.object({
  type: z.string(),
  content: z.string(),
  author: nestSchema(ZCreateStaffSchema).optional(),
  visit: nestSchema(ZCreateVisitSchema),
});
