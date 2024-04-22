import { z } from "zod";

export const ZCreateFlowerSchema = z.object({
  flower: z.string(),
  recipientName: z.string(),
});

export const ZCreateGiftSchema = z.object({
  type: z.string(),
  recipientName: z.string(),
  wrapping: z.boolean(),
  message: z.string(),
});

export const ZCreateRoomSchema = z.object({
  checkIn: z.coerce.date(),
  checkOut: z.coerce.date(),
});

export const ZCreateSecuritySchema = z.object({
  dateTime: z.coerce.date(),
  threat: z.string(),
});

export const ZCreateAvSchema = z.object({
  dateTime: z.coerce.date(),
  type: z.string(),
});

export const ZCreateBaseServiceSchema = z.object({
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

export const ZCreateServiceSchema = z.discriminatedUnion("type", [
  ZCreateBaseServiceSchema.extend({
    data: ZCreateAvSchema,
    type: z.literal("av"),
  }),
  ZCreateBaseServiceSchema.extend({
    data: ZCreateSecuritySchema,
    type: z.literal("security"),
  }),
  ZCreateBaseServiceSchema.extend({
    data: ZCreateRoomSchema,
    type: z.literal("room"),
  }),
  ZCreateBaseServiceSchema.extend({
    data: ZCreateGiftSchema,
    type: z.literal("gift"),
  }),
  ZCreateBaseServiceSchema.extend({
    data: ZCreateFlowerSchema,
    type: z.literal("flower"),
  }),
]);
