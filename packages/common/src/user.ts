import { nestSchema } from "./zod-utils.ts";
import { z } from "zod";

export const ZCreateBaseUserSchema = z.object({
  sub: z.string(),
  email: z.string().nullish(),
  name: z.string(),
  role: z.enum(["patient", "staff", "admin"]).nullish(),
});

export const ZCreateStaffSchema = z.object({
  userId: z.string().optional(),
  name: z.string(),
  jobTitle: z.string(),
});

export const ZCreatePatientSchema = z.object({
  SSN: z.number().optional(),
  node: z.object({ connect: z.object({ id: z.string() }) }),
  entryDate: z.coerce.date().optional(),
  pcp: nestSchema(ZCreateStaffSchema).optional(),
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
  inTreatment: z.boolean().optional(),
  insurance: z.string().optional(),
  dateOfBirth: z.coerce.date(),
  phoneNumber: z.string().optional(),
  user: nestSchema(ZCreateBaseUserSchema).optional(),
});
export const ZCreateUserSchema = z.discriminatedUnion("role", [
  ZCreateBaseUserSchema.extend({
    staff: z.union([
      z.object({ connect: ZCreateStaffSchema }),
      z.object({ id: z.string() }),
    ]),
    role: z.literal("staff"),
  }),
  ZCreateBaseUserSchema.extend({
    staff: z.union([
      z.object({ connect: ZCreateStaffSchema }),
      z.object({ id: z.string() }),
    ]),
    role: z.literal("admin"),
  }),
  ZCreateBaseUserSchema.extend({
    staff: z.union([
      z.object({ connect: ZCreatePatientSchema }),
      z.object({ id: z.string() }),
    ]),
    role: z.literal("patient"),
  }),
  ZCreateBaseUserSchema.extend({ role: z.undefined() }),
]);
