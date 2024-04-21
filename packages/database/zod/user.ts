import * as z from "zod"
import { Role } from "../.prisma/client"
import { CompletePatient, RelatedPatientModel, CompleteStaff, RelatedStaffModel } from "./index"

export const UserModel = z.object({
  id: z.string(),
  sub: z.string(),
  email: z.string().nullish(),
  role: z.nativeEnum(Role).nullish(),
  name: z.string(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  patient?: CompletePatient | null
  staff?: CompleteStaff | null
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  patient: RelatedPatientModel.nullish(),
  staff: RelatedStaffModel.nullish(),
}))
