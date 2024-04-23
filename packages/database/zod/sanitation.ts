import * as z from "zod";
import { CompleteService, RelatedServiceModel } from "./index";

export const SanitationModel = z.object({
  id: z.string(),
  serviceId: z.string(),
  type: z.string(),
  quality: z.string(),
  startDate: z.date(),
  endDate: z.date().nullish(),
});

export interface CompleteSanitation extends z.infer<typeof SanitationModel> {
  service: CompleteService;
}

/**
 * RelatedSanitationModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSanitationModel: z.ZodSchema<CompleteSanitation> = z.lazy(
  () =>
    SanitationModel.extend({
      service: RelatedServiceModel,
    }),
);
