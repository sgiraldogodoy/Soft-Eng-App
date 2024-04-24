import { nestSchema } from "./zod-utils.ts";
import { z } from "zod";

export const ZCreateBaseUserSchema = z.object({
  sub: z.string(),
  email: z.string().email(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  role: z.enum(["patient", "staff", "admin"]).optional(),
});

export const ZCreateUserWithAuth0 = ZCreateBaseUserSchema.extend({
  sub: z.undefined(),
  auth: z.union([
    z.object({
      password: z
        .string()
        .regex(/(.*[A-Z].*)/, {
          message: "Password must contain an uppercase letter.",
        })
        .regex(/(.*[a-z].*)/, {
          message: "Password must contain a lowercase letter.",
        })
        .regex(/(.*[0-9].*)/, {
          message: "Password must contain a number.",
        })
        .min(8, {
          message: "Password must be at least 8 characters.",
        }),
    }),
    z.string().describe("Auth0 Sub"),
  ]),
});

export const ZCreateStaffSchema = z.object({
  user: nestSchema(ZCreateBaseUserSchema).optional(),
  name: z.string(),
  jobTitle: z.string(),
});

export const ZCreatePatientSchema = z.object({
  SSN: z.coerce.number().optional(),
  location: z.object({ connect: z.object({ id: z.string() }) }),
  entryDate: z.coerce.date().optional(),
  pcp: nestSchema(ZCreateStaffSchema).optional(),
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
  inTreatment: z.boolean().optional(),
  insurance: z.string().optional(),
  dateOfBirth: z.string().date(),
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
