import * as z from "zod"
import { CompleteService, RelatedServiceModel } from "./index"

export const GiftModel = z.object({
  id: z.string(),
  serviceId: z.string(),
  type: z.string(),
  recipientName: z.string(),
  wrapping: z.boolean(),
  message: z.string(),
})

export interface CompleteGift extends z.infer<typeof GiftModel> {
  service: CompleteService
}

/**
 * RelatedGiftModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedGiftModel: z.ZodSchema<CompleteGift> = z.lazy(() => GiftModel.extend({
  service: RelatedServiceModel,
}))
