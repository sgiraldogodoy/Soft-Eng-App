import * as z from "zod"
import { CompleteService, RelatedServiceModel } from "./index"

export const FlowerModel = z.object({
  id: z.string(),
  serviceId: z.string(),
  flower: z.string(),
  recipientName: z.string(),
})

export interface CompleteFlower extends z.infer<typeof FlowerModel> {
  service: CompleteService
}

/**
 * RelatedFlowerModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedFlowerModel: z.ZodSchema<CompleteFlower> = z.lazy(() => FlowerModel.extend({
  service: RelatedServiceModel,
}))
