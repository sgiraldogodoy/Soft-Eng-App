import * as z from "zod"
import { NodeType } from "../.prisma/client"
import { CompleteEdge, RelatedEdgeModel, CompleteService, RelatedServiceModel, CompletePatient, RelatedPatientModel, CompleteAppointment, RelatedAppointmentModel } from "./index"

export const NodeModel = z.object({
  id: z.string(),
  x: z.number().int(),
  y: z.number().int(),
  building: z.string(),
  floor: z.string(),
  type: z.nativeEnum(NodeType),
  longName: z.string(),
  shortName: z.string(),
  available: z.boolean(),
})

export interface CompleteNode extends z.infer<typeof NodeModel> {
  outgoing: CompleteEdge[]
  incoming: CompleteEdge[]
  service: CompleteService[]
  patients: CompletePatient[]
  appointments: CompleteAppointment[]
}

/**
 * RelatedNodeModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedNodeModel: z.ZodSchema<CompleteNode> = z.lazy(() => NodeModel.extend({
  outgoing: RelatedEdgeModel.array(),
  incoming: RelatedEdgeModel.array(),
  service: RelatedServiceModel.array(),
  patients: RelatedPatientModel.array(),
  appointments: RelatedAppointmentModel.array(),
}))
