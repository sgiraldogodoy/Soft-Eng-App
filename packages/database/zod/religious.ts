import * as z from "zod";
import { CompleteService, RelatedServiceModel } from "./index";

export const ReligiousModel = z.object({
  id: z.string(),
  serviceId: z.string(),
  religion: z.string(),
  dateTime: z.date(),
});

export interface CompleteReligious extends z.infer<typeof ReligiousModel> {
  service: CompleteService;
}

/**
 * RelatedReligiousModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedReligiousModel: z.ZodSchema<CompleteReligious> = z.lazy(
  () =>
    ReligiousModel.extend({
      service: RelatedServiceModel,
    }),
);
