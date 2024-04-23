import * as z from "zod"
import { ServiceType } from "../.prisma/client"
import { CompleteNode, RelatedNodeModel, CompleteFlower, RelatedFlowerModel, CompleteGift, RelatedGiftModel, CompleteRoom, RelatedRoomModel, CompleteSecurity, RelatedSecurityModel, CompleteAV, RelatedAVModel } from "./index"

export const ServiceModel = z.object({
  id: z.string(),
  nodeId: z.string(),
  priority: z.string(),
  date: z.date(),
  login: z.string(),
  status: z.string(),
  type: z.nativeEnum(ServiceType),
  note: z.string(),
})

export interface CompleteService extends z.infer<typeof ServiceModel> {
  node: CompleteNode
  flower?: CompleteFlower | null
  gift?: CompleteGift | null
  room?: CompleteRoom | null
  security?: CompleteSecurity | null
  av?: CompleteAV | null
}

/**
 * RelatedServiceModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedServiceModel: z.ZodSchema<CompleteService> = z.lazy(() => ServiceModel.extend({
  node: RelatedNodeModel,
  flower: RelatedFlowerModel.nullish(),
  gift: RelatedGiftModel.nullish(),
  room: RelatedRoomModel.nullish(),
  security: RelatedSecurityModel.nullish(),
  av: RelatedAVModel.nullish(),
}))
