import { z } from "zod";

export const updateSchema = <T extends z.AnyZodObject>(schema: T) => {
  return z.object({
    id: z.string(),
    data: schema.partial(),
  });
};

export const nestSchema = <T extends z.AnyZodObject>(schema: T) => {
  return z.union([
    z.object({ connect: z.object({ id: z.string() }) }),
    z.object({ create: schema }),
  ]);
};

export const manySchema = <T extends z.AnyZodObject>(schemas: T) => {
  return z.object({ data: z.array(schemas) });
};
