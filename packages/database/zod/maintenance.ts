import * as z from "zod";
import { CompleteService, RelatedServiceModel } from "./index";

export const MaintenanceModel = z.object({
  id: z.string(),
  serviceId: z.string(),
  type: z.string(),
  severity: z.string(),
  startDate: z.date(),
  endDate: z.date().nullish(),
});

export interface CompleteMaintenance extends z.infer<typeof MaintenanceModel> {
  service: CompleteService;
}

/**
 * RelatedMaintenanceModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedMaintenanceModel: z.ZodSchema<CompleteMaintenance> = z.lazy(
  () =>
    MaintenanceModel.extend({
      service: RelatedServiceModel,
    }),
);
