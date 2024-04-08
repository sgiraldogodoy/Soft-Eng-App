import { z } from "zod";

// This is the schema for the form base. It shouldn't change!
export const BaseFormSchema = z.object({
  recipient: z.string().min(2, {
    message: "Recipient must be at least 2 characters.",
  }),

  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  priority: z.enum(["Low", "Medium", "High", "Emergency"]),
  notes: z.string().optional(),
});
