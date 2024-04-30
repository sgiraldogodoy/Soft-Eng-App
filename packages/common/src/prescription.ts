import { z } from "zod";

export const ZCreatePrescriptionSchema = z.object({
  drug: z.string(),
  dosage: z.string(),
  pharmacy: z.object({
    name: z.string(),
    email: z.string(),
  }),
  refillAllowed: z.boolean(),
  frequency: z.string(),
  diagnosisId: z.string(),
});
