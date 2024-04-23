import * as z from "zod";
import {
  CompleteNode,
  RelatedNodeModel,
  CompleteStaff,
  RelatedStaffModel,
  CompleteVisit,
  RelatedVisitModel,
  CompleteAppointment,
  RelatedAppointmentModel,
  CompleteUser,
  RelatedUserModel,
} from "./index";

export const PatientModel = z.object({
  id: z.string(),
  SSN: z.number().int().nullish(),
  nodeId: z.string().nullish(),
  pcpId: z.string().nullish(),
  entryDate: z.date(),
  firstName: z.string(),
  middleName: z.string().nullish(),
  lastName: z.string(),
  dateOfBirth: z.date(),
  phoneNumber: z.string().nullish(),
  inTreatment: z.boolean(),
  insurance: z.string().nullish(),
  userId: z.string().nullish(),
});

export interface CompletePatient extends z.infer<typeof PatientModel> {
  location?: CompleteNode | null;
  pcp?: CompleteStaff | null;
  visits: CompleteVisit[];
  appointments: CompleteAppointment[];
  user?: CompleteUser | null;
}

/**
 * RelatedPatientModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPatientModel: z.ZodSchema<CompletePatient> = z.lazy(() =>
  PatientModel.extend({
    location: RelatedNodeModel.nullish(),
    pcp: RelatedStaffModel.nullish(),
    visits: RelatedVisitModel.array(),
    appointments: RelatedAppointmentModel.array(),
    user: RelatedUserModel.nullish(),
  }),
);
