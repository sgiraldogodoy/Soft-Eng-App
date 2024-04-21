import * as z from "zod"
import { CompleteUser, RelatedUserModel, CompleteVisitNote, RelatedVisitNoteModel, CompletePatient, RelatedPatientModel } from "./index"

export const StaffModel = z.object({
  userId: z.string(),
})

export interface CompleteStaff extends z.infer<typeof StaffModel> {
  user: CompleteUser
  visitNotes: CompleteVisitNote[]
  patients: CompletePatient[]
}

/**
 * RelatedStaffModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedStaffModel: z.ZodSchema<CompleteStaff> = z.lazy(() => StaffModel.extend({
  user: RelatedUserModel,
  visitNotes: RelatedVisitNoteModel.array(),
  patients: RelatedPatientModel.array(),
}))
