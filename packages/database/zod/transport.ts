import * as z from "zod";
import { CompleteService, RelatedServiceModel } from "./index";

export const TransportModel = z.object({
  id: z.string(),
  serviceId: z.string(),
  type: z.string(),
  count: z.string(),
});

export interface CompleteTransport extends z.infer<typeof TransportModel> {
  service: CompleteService;
}

/**
 * RelatedTransportModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTransportModel: z.ZodSchema<CompleteTransport> = z.lazy(
  () =>
    TransportModel.extend({
      service: RelatedServiceModel,
    }),
);
