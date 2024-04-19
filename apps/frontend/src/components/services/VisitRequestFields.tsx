import { z } from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { Input } from "@/components/ui/input.tsx";

export const VisitRequestSchema = z.object({
  type: z.literal("visit-request"),
  visitorName: z.string(),
  visiteeName: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});

const VisitRequestFields = () => {
  return (
    <>
      <div className="flex gap-2 items-center flex-1">
        <FormField
          name="data.visitorName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Visitor Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Who is visiting?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="data.patientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patient Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Who is being visited?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="data.startDate"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormDescription>When will the visit start?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="data.endDate"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormDescription>When will the visit end?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div>
        <p className="text-xs"> created by Justin Yip</p>
      </div>
    </>
  );
};

export default VisitRequestFields;
