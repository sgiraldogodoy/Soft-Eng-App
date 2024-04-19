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

export const av = z.object({
  dateTime: z.coerce.date(),
  type: z.string(),
});

export const maintenance = z.object({
  type: z.string(),
  severity: z.string(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
});

export const transport = z.object({
  type: z.string(),
  count: z.string(),
});

export const sanitation = z.object({
  type: z.string(),
  quality: z.string(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
});

export const visit = z.object({
  visitorName: z.string(),
  patientName: z.string(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
});

export const baseService = z.object({
  nodeId: z.string(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "EMERGENCY"]),
  login: z.string(),
  status: z
    .enum(["ASSIGNED", "UNASSIGNED", "IN_PROGRESS", "COMPLETED"])
    .default("UNASSIGNED"),
  type: z.enum([
    "av",
    "security",
    "room",
    "gift",
    "flower",
    "maintenance",
    "transport",
    "sanitation",
    "visit",
  ]),
  note: z.string(),
});

export const service = z.discriminatedUnion("type", [
  baseService.extend({ data: av, type: z.literal("av") }),
  baseService.extend({ data: security, type: z.literal("security") }),
  baseService.extend({ data: room, type: z.literal("room") }),
  baseService.extend({ data: gift, type: z.literal("gift") }),
  baseService.extend({ data: flower, type: z.literal("flower") }),
  baseService.extend({ data: maintenance, type: z.literal("maintenance") }),
  baseService.extend({ data: transport, type: z.literal("transport") }),
  baseService.extend({ data: sanitation, type: z.literal("sanitation") }),
  baseService.extend({ data: visit, type: z.literal("visit") }),
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
    .extend({ data: maintenance, type: z.literal("maintenance") })
    .omit({ login: true }),
  baseService
    .extend({ data: transport, type: z.literal("transport") })
    .omit({ login: true }),
  baseService
    .extend({ data: sanitation, type: z.literal("sanitation") })
    .omit({ login: true }),
  baseService
    .extend({ data: visit, type: z.literal("visit") })
    .omit({ login: true }),
]);
