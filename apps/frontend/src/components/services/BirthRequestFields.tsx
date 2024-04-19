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

export const BirthRequestSchema = z.object({
  type: z.literal("birth-request"),
  patientName: z.string(),
  procedureTime: z.string(),
});

const BirthRequestFields = () => {
  return (
    <>
      <div className="flex gap-2 items-center flex-1">
        <FormField
          name="data.errorCodes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patient Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Who is going to be giving birth?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="data.dateTime"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Procedure Time</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormDescription>When should we expect you?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div>
        <p className="text-xs">
          {" "}
          created by Justin Yip. suggested by Santiago Giraldo
        </p>
      </div>
    </>
  );
};

export default BirthRequestFields;
