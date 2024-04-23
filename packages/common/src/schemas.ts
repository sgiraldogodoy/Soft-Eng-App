import { z } from "zod";

export const ZCreateNodeSchema = z.object({
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

export const ZCreateEdgeSchema = z.object({
  startNodeId: z.string(),
  endNodeId: z.string(),
});
