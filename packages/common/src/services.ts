import { z } from "zod";
import { nestSchema } from "./zod-utils.ts";

export const ZCreateBaseServiceSchema = z.object({
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
    "visitor",
    "it",
    "religious",
    "interpreter",
  ]),
  note: z.string(),
  assigneeId: z.string().nullish(),
});

export const ZCreateFlowerSchema = z.object({
  flower: z.string(),
  recipientName: z.string(),
  service: nestSchema(ZCreateBaseServiceSchema),
});

export const ZCreateGiftSchema = z.object({
  type: z.string(),
  recipientName: z.string(),
  wrapping: z.boolean(),
  message: z.string(),
  service: nestSchema(ZCreateBaseServiceSchema),
});

export const ZCreateRoomSchema = z.object({
  checkIn: z.coerce.date(),
  checkOut: z.coerce.date(),
  service: nestSchema(ZCreateBaseServiceSchema),
});

export const ZCreateSecuritySchema = z.object({
  dateTime: z.coerce.date(),
  threat: z.string(),
  service: nestSchema(ZCreateBaseServiceSchema),
});

export const ZCreateAvSchema = z.object({
  dateTime: z.coerce.date(),
  type: z.string(),
  service: nestSchema(ZCreateBaseServiceSchema),
});

export const ZCreateMaintenanceSchema = z.object({
  type: z.string(),
  severity: z.string(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  service: nestSchema(ZCreateBaseServiceSchema),
});

export const ZCreateTransportSchema = z.object({
  type: z.string(),
  count: z.string(),
  service: nestSchema(ZCreateBaseServiceSchema),
});

export const ZCreateSanitationSchema = z.object({
  type: z.string(),
  quality: z.string(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  service: nestSchema(ZCreateBaseServiceSchema),
});

export const ZCreateVisitorSchema = z.object({
  visitorName: z.string(),
  patientName: z.string(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  service: nestSchema(ZCreateBaseServiceSchema),
});

export const ZCreateItSchema = z.object({
  type: z.string(),
  errorCodes: z.string().optional(),
  service: nestSchema(ZCreateBaseServiceSchema),
});

export const ZCreateReligiousSchema = z.object({
  religion: z.string(),
  dateTime: z.coerce.date(),
  service: nestSchema(ZCreateBaseServiceSchema),
});

export const ZCreateInterpreterSchema = z.object({
  recipientName: z.string(),
  type: z.enum([
    "French",
    "German",
    "Spanish",
    "Russian",
    "Ukrainian",
    "Portuguese",
    "Cantonese",
    "Mandarin",
    "Haitian",
    "Vietnamese",
    "Hindi",
    "Italian",
  ]),
  dateTime: z.coerce.date(),
  service: nestSchema(ZCreateBaseServiceSchema),
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
  ZCreateBaseServiceSchema.extend({
    data: ZCreateMaintenanceSchema,
    type: z.literal("maintenance"),
  }),
  ZCreateBaseServiceSchema.extend({
    data: ZCreateTransportSchema,
    type: z.literal("transport"),
  }),
  ZCreateBaseServiceSchema.extend({
    data: ZCreateSanitationSchema,
    type: z.literal("sanitation"),
  }),
  ZCreateBaseServiceSchema.extend({
    data: ZCreateVisitorSchema,
    type: z.literal("visitor"),
  }),
  ZCreateBaseServiceSchema.extend({
    data: ZCreateItSchema,
    type: z.literal("it"),
  }),
  ZCreateBaseServiceSchema.extend({
    data: ZCreateReligiousSchema,
    type: z.literal("religious"),
  }),
  ZCreateBaseServiceSchema.extend({
    data: ZCreateInterpreterSchema,
    type: z.literal("interpreter"),
  }),
]);
