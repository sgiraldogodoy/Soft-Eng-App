import * as z from "zod";
import { CompleteService, RelatedServiceModel } from "./index";

export const AVModel = z.object({
  id: z.string(),
  serviceId: z.string(),
  dateTime: z.date(),
  type: z.string(),
});

export interface CompleteAV extends z.infer<typeof AVModel> {
  service: CompleteService;
}

/**
 * RelatedAVModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedAVModel: z.ZodSchema<CompleteAV> = z.lazy(() =>
  AVModel.extend({
    service: RelatedServiceModel,
  }),
);
