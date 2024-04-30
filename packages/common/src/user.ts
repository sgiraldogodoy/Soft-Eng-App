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

export const ZCreateStaffSchema = z.object({
  user: nestSchema(ZCreateBaseUserSchema).optional(),
  name: z.string(),
  jobTitle: z.string(),
});

export const ZCreateIdentificationSchema = z.object({
  idType: z.enum(["ssn", "driverLicense", "passport"]),
  idNumber: z.string().or(z.literal("")),
});

export const ZCreatePatientSchema = z.object({
  identity: z.object({ create: ZCreateIdentificationSchema }),
  location: z.object({ connect: z.object({ id: z.string() }) }).optional(),
  entryDate: z.coerce.date().optional(),
  pcp: nestSchema(ZCreateStaffSchema).optional(),
  firstName: z.string().min(1),
  middleName: z.string().optional(),
  lastName: z.string().min(1),
  inTreatment: z.boolean().optional(),
  weight: z.number().optional(),
  height: z.number().optional(),
  bloodType: z.string().optional(),
  sex: z.enum(["male", "female", "other"]),
  insurance: z.string().optional(),
  dateOfBirth: z.string().date(),
  phoneNumber: z.string().optional(),
  user: nestSchema(ZCreateBaseUserSchema).optional(),
  notes: z.string().optional(),
});

export const ZUpdatePatientSchema = z.object({
    entryDate: z.coerce.date().optional(),
    firstName: z.string().min(1).optional(),
    middleName: z.string().optional(),
    lastName: z.string().min(1).optional(),
    inTreatment: z.boolean().optional(),
    weight: z.number().optional(),
    height: z.number().optional(),
    bloodType: z.string().optional(),
    sex: z.enum(["male", "female", "other"]).optional(),
    insurance: z.string().optional(),
    dateOfBirth: z.string().date().optional(),
    phoneNumber: z.string().optional(),
    notes: z.string().optional(),
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

export const ZCreateUserWithAuth0AndNested = ZCreateBaseUserSchema.extend({
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
  staff: nestSchema(ZCreateStaffSchema).optional(),
  patient: nestSchema(ZCreatePatientSchema).optional(),
});
