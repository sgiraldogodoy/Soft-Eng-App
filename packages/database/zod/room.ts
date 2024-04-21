import * as z from "zod";
import { CompleteService, RelatedServiceModel } from "./index";

export const RoomModel = z.object({
  id: z.string(),
  serviceId: z.string(),
  checkIn: z.date(),
  checkOut: z.date(),
});

export interface CompleteRoom extends z.infer<typeof RoomModel> {
  service: CompleteService;
}

/**
 * RelatedRoomModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedRoomModel: z.ZodSchema<CompleteRoom> = z.lazy(() =>
  RoomModel.extend({
    service: RelatedServiceModel,
  }),
);
