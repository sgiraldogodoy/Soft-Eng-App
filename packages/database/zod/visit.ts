import * as z from "zod"
import { CompleteVisitNote, RelatedVisitNoteModel, CompletePatient, RelatedPatientModel, CompleteAppointment, RelatedAppointmentModel } from "./index"

export const VisitModel = z.object({
  id: z.string(),
  patientId: z.string(),
  visitTime: z.date(),
})

export interface CompleteVisit extends z.infer<typeof VisitModel> {
  notes: CompleteVisitNote[]
  patient: CompletePatient
  appointment?: CompleteAppointment | null
}

/**
 * RelatedVisitModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedVisitModel: z.ZodSchema<CompleteVisit> = z.lazy(() => VisitModel.extend({
  notes: RelatedVisitNoteModel.array(),
  patient: RelatedPatientModel,
  appointment: RelatedAppointmentModel.nullish(),
}))
