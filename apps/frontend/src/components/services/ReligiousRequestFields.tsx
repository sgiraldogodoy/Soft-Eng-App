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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";

export const ReligiousRequestSchema = z.object({
  type: z.literal("religious-request"),
  religion: z.string(),
  ritesTime: z.string(),
});

const ReligiousRequestFields = () => {
  return (
    <>
      <div className="flex gap-2 items-center flex-1">
        <FormField
          name="data.religion"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Religion</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the associated religion" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Christianity">Christianity</SelectItem>
                  <SelectItem value="Catholic">Catholic</SelectItem>
                  <SelectItem value="Baptist">Baptist</SelectItem>
                  <SelectItem value="Islam">Islam</SelectItem>
                  <SelectItem value="Buddhism">Buddhism</SelectItem>
                  <SelectItem value="Jewish">Jewish</SelectItem>
                  <SelectItem value="Hinduism">Hinduism</SelectItem>
                  <SelectItem value="Shinto">Shinto</SelectItem>
                  <SelectItem value="Taoism">Taoism</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                What religious beliefs do you follow?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="data.dateTime"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Rites Time</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormDescription>
                When do you want the rites to occur?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div>
        <p className="text-xs">created by Justin Yip.</p>
      </div>
    </>
  );
};

export default ReligiousRequestFields;
