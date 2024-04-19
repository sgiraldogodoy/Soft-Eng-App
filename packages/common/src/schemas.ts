import { z } from "zod";

export const node = z.object({
  id: z.string(),
  x: z.number(),
  y: z.number(),
  building: z.string(),
  floor: z.string(),
  type: z.string(),
  longName: z.string(),
  shortName: z.string(),
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

export const interpreter = z.object({
    dateTime: z.coerce.date(),
    language: z.enum(["French", "German", "Spanish", "Finnish", "Russian"]),
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
  type: z.enum(["av", "security", "room", "gift", "flower", "interpreter"]),
  note: z.string(),
});

export const service = z.discriminatedUnion("type", [
  baseService.extend({ data: av, type: z.literal("av") }),
  baseService.extend({ data: security, type: z.literal("security") }),
  baseService.extend({ data: room, type: z.literal("room") }),
  baseService.extend({ data: gift, type: z.literal("gift") }),
  baseService.extend({ data: flower, type: z.literal("flower") }),
    baseService.extend({data: interpreter, type: z.literal("interpreter")}),
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
    baseService
        .extend({data: interpreter, type: z.literal("interpreter")}),
]);
