import * as z from "zod"
import { CompleteNode, RelatedNodeModel } from "./index"

export const EdgeModel = z.object({
  startNodeId: z.string(),
  endNodeId: z.string(),
})

export interface CompleteEdge extends z.infer<typeof EdgeModel> {
  startNode: CompleteNode
  endNode: CompleteNode
}

/**
 * RelatedEdgeModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedEdgeModel: z.ZodSchema<CompleteEdge> = z.lazy(() => EdgeModel.extend({
  startNode: RelatedNodeModel,
  endNode: RelatedNodeModel,
}))
