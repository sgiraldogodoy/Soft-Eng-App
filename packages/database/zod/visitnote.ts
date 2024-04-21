import * as z from "zod";
import {
  CompleteStaff,
  RelatedStaffModel,
  CompleteVisit,
  RelatedVisitModel,
} from "./index";

export const VisitNoteModel = z.object({
  id: z.string(),
  type: z.string(),
  content: z.string(),
  authorId: z.string(),
  visitId: z.string(),
});

export interface CompleteVisitNote extends z.infer<typeof VisitNoteModel> {
  author: CompleteStaff;
  visit: CompleteVisit;
}

/**
 * RelatedVisitNoteModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedVisitNoteModel: z.ZodSchema<CompleteVisitNote> = z.lazy(
  () =>
    VisitNoteModel.extend({
      author: RelatedStaffModel,
      visit: RelatedVisitModel,
    }),
);
