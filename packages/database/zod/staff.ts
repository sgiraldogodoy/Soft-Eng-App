import * as z from "zod"
import { CompleteAppointment, RelatedAppointmentModel, CompleteVisit, RelatedVisitModel, CompleteUser, RelatedUserModel, CompleteVisitNote, RelatedVisitNoteModel, CompletePatient, RelatedPatientModel } from "./index"

export const StaffModel = z.object({
  id: z.string(),
  name: z.string(),
  jobTitle: z.string(),
  userId: z.string().nullish(),
})

export interface CompleteStaff extends z.infer<typeof StaffModel> {
  appointment: CompleteAppointment[]
  visit: CompleteVisit[]
  user?: CompleteUser | null
  visitNotes: CompleteVisitNote[]
  patients: CompletePatient[]
}

/**
 * RelatedStaffModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedStaffModel: z.ZodSchema<CompleteStaff> = z.lazy(() => StaffModel.extend({
  appointment: RelatedAppointmentModel.array(),
  visit: RelatedVisitModel.array(),
  user: RelatedUserModel.nullish(),
  visitNotes: RelatedVisitNoteModel.array(),
  patients: RelatedPatientModel.array(),
}))
