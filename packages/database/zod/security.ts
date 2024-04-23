import * as z from "zod"
import { CompleteService, RelatedServiceModel } from "./index"

export const SecurityModel = z.object({
  id: z.string(),
  serviceId: z.string(),
  dateTime: z.date(),
  threat: z.string(),
})

export interface CompleteSecurity extends z.infer<typeof SecurityModel> {
  service: CompleteService
}

/**
 * RelatedSecurityModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSecurityModel: z.ZodSchema<CompleteSecurity> = z.lazy(() => SecurityModel.extend({
  service: RelatedServiceModel,
}))
