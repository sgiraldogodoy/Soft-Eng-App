import * as z from "zod";
import {
  CompleteNode,
  RelatedNodeModel,
  CompletePatient,
  RelatedPatientModel,
  CompleteStaff,
  RelatedStaffModel,
  CompleteVisit,
  RelatedVisitModel,
} from "./index";

export const AppointmentModel = z.object({
  id: z.string(),
  createdTime: z.date(),
  appointmentTime: z.date(),
  checkedIn: z.boolean(),
  nodeId: z.string().nullish(),
  patientId: z.string(),
  staffId: z.string(),
  visitId: z.string().nullish(),
  notes: z.string(),
});

export interface CompleteAppointment extends z.infer<typeof AppointmentModel> {
  location?: CompleteNode | null;
  patient: CompletePatient;
  staff: CompleteStaff;
  visit?: CompleteVisit | null;
}

/**
 * RelatedAppointmentModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedAppointmentModel: z.ZodSchema<CompleteAppointment> = z.lazy(
  () =>
    AppointmentModel.extend({
      location: RelatedNodeModel.nullish(),
      patient: RelatedPatientModel,
      staff: RelatedStaffModel,
      visit: RelatedVisitModel.nullish(),
    }),
);
