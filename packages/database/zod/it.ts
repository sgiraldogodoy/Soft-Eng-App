import * as z from "zod";
import { CompleteService, RelatedServiceModel } from "./index";

export const ITModel = z.object({
  id: z.string(),
  serviceId: z.string(),
  type: z.string(),
  errorCodes: z.string().nullish(),
});

export interface CompleteIT extends z.infer<typeof ITModel> {
  service: CompleteService;
}

/**
 * RelatedITModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedITModel: z.ZodSchema<CompleteIT> = z.lazy(() =>
  ITModel.extend({
    service: RelatedServiceModel,
  }),
);
