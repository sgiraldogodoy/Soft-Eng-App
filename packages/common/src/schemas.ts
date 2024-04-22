import { z } from "zod";

export const node = z.object({
  id: z.string(),
  x: z.number(),
  y: z.number(),
  building: z.string(),
  floor: z.string(),
  type: z
    .enum([
      "HALL",
      "ELEV",
      "REST",
      "STAI",
      "DEPT",
      "LABS",
      "INFO",
      "CONF",
      "EXIT",
      "RETL",
      "SERV",
      "BATH",
    ])
    .transform((x) => (x === "BATH" ? "REST" : x)),
  longName: z.string(),
  shortName: z.string(),
  elevatorLetter: z.string().optional(),
  available: z.boolean().optional(),
});

export const edge = z.object({
  startNodeId: z.string(),
  endNodeId: z.string(),
});

export const flower = z.object({
  flower: z.string(),
  recipientName: z.string(),
});

export const gift = z.object({
  type: z.string(),
  recipientName: z.string(),
  wrapping: z.boolean(),
  message: z.string(),
});

export const room = z.object({
  checkIn: z.coerce.date(),
  checkOut: z.coerce.date(),
});

export const security = z.object({
  dateTime: z.coerce.date(),
  threat: z.string(),
});

export const av = z.object({
  dateTime: z.coerce.date(),
  type: z.string(),
});

export const baseService = z.object({
  nodeId: z.string(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "EMERGENCY"]),
  login: z.string(),
  status: z
    .enum(["ASSIGNED", "UNASSIGNED", "IN_PROGRESS", "COMPLETED"])
    .default("UNASSIGNED"),
  type: z.enum(["av", "security", "room", "gift", "flower"]),
  note: z.string(),
  assigneeId: z.string().nullish(),
});

export const service = z.discriminatedUnion("type", [
  baseService.extend({ data: av, type: z.literal("av") }),
  baseService.extend({ data: security, type: z.literal("security") }),
  baseService.extend({ data: room, type: z.literal("room") }),
  baseService.extend({ data: gift, type: z.literal("gift") }),
  baseService.extend({ data: flower, type: z.literal("flower") }),
]);

export const formService = z.discriminatedUnion("type", [
  baseService.extend({ data: av, type: z.literal("av") }).omit({ login: true }),
  baseService
    .extend({ data: security, type: z.literal("security") })
    .omit({ login: true }),
  baseService
    .extend({ data: room, type: z.literal("room") })
    .omit({ login: true }),
  baseService
    .extend({ data: gift, type: z.literal("gift") })
    .omit({ login: true }),
  baseService
    .extend({ data: flower, type: z.literal("flower") })
    .omit({ login: true }),
]);

export const staff = z.object({
  userId: z.string().optional(),
  name: z.string(),
  jobTitle: z.string(),
});

export const baseUser = z.object({
  sub: z.string(),
  email: z.string().nullish(),
  name: z.string(),
  role: z.enum(["patient", "staff", "admin"]).nullish(),
});

export const patient = z.object({
  SSN: z.number().optional(),
  nodeId: z.string().optional(),
  entryDate: z.coerce.date().optional(),
  pcpId: z.string(),
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
  inTreatment: z.boolean().optional(),
  insurance: z.string().optional(),
  dateOfBirth: z.coerce.date(),
  phoneNumber: z.string().optional(),
  userId: z.string().optional(),
});

export const user = z.discriminatedUnion("role", [
  baseUser.extend({ data: staff, role: z.literal("staff") }),
  baseUser.extend({ data: staff, role: z.literal("admin") }),
  baseUser.extend({ data: patient, role: z.literal("patient") }),
  baseUser.extend({ role: z.undefined() }),
]);
