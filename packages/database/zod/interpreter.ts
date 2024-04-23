import * as z from "zod";
import { CompleteService, RelatedServiceModel } from "./index";

export const InterpreterModel = z.object({
  id: z.string(),
  serviceId: z.string(),
  recipientName: z.string(),
  type: z.string(),
  dateTime: z.date(),
});

export interface CompleteInterpreter extends z.infer<typeof InterpreterModel> {
  service: CompleteService;
}

/**
 * RelatedInterpreterModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedInterpreterModel: z.ZodSchema<CompleteInterpreter> = z.lazy(
  () =>
    InterpreterModel.extend({
      service: RelatedServiceModel,
    }),
);
