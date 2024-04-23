import * as z from "zod";
import { CompleteService, RelatedServiceModel } from "./index";

export const VisitorModel = z.object({
  id: z.string(),
  serviceId: z.string(),
  visitorName: z.string(),
  patientName: z.string(),
  startDate: z.date(),
  endDate: z.date().nullish(),
});

export interface CompleteVisitor extends z.infer<typeof VisitorModel> {
  service: CompleteService;
}

/**
 * RelatedVisitorModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedVisitorModel: z.ZodSchema<CompleteVisitor> = z.lazy(() =>
  VisitorModel.extend({
    service: RelatedServiceModel,
  }),
);
