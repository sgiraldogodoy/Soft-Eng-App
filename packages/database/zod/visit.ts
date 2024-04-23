import * as z from "zod"
import { CompleteVisitNote, RelatedVisitNoteModel, CompleteStaff, RelatedStaffModel, CompletePatient, RelatedPatientModel, CompleteAppointment, RelatedAppointmentModel } from "./index"

export const VisitModel = z.object({
  id: z.string(),
  staffId: z.string().nullish(),
  patientId: z.string(),
  visitTime: z.date(),
})

export interface CompleteVisit extends z.infer<typeof VisitModel> {
  notes: CompleteVisitNote[]
  staff?: CompleteStaff | null
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
  staff: RelatedStaffModel.nullish(),
  patient: RelatedPatientModel,
  appointment: RelatedAppointmentModel.nullish(),
}))
