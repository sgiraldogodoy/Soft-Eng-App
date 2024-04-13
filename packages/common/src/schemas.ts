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
  checkIn: z.date(),
  checkOut: z.date(),
});

export const security = z.object({
  dateTime: z.date(),
  threat: z.string(),
});

export const av = z.object({
  dateTime: z.date(),
  type: z.string(),
});

export const baseService = z.object({
  nodeId: z.string(),
  priority: z.enum(["Low", "Medium", "High", "Emergency"]),
  login: z.string(),
  status: z.string(),
  type: z.enum(["AV", "SECURITY", "ROOM", "GIFT", "FLOWER"]),
  note: z.string(),
});

export const service = z.discriminatedUnion("type", [
  baseService.merge(av).extend({ type: z.literal("AV") }),
  baseService.merge(security).extend({ type: z.literal("SECURITY") }),
  baseService.merge(room).extend({ type: z.literal("ROOM") }),
  baseService.merge(gift).extend({ type: z.literal("GIFT") }),
  baseService.merge(flower).extend({ type: z.literal("FLOWER") }),
]);
