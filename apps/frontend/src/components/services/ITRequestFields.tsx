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

export const ITRequestSchema = z.object({
  type: z.literal("it-request"),
  issueType: z.string(),
  errorCodes: z.string(),
});

const ITRequestFields = () => {
  return (
    <>
      <div className="flex gap-2 items-center flex-1">
        <FormField
          name="data.type"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Issue Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the type of issue that's occuring" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Computer">Computer</SelectItem>
                  <SelectItem value="Network">Network</SelectItem>
                  <SelectItem value="Mobile">Mobile</SelectItem>
                  <SelectItem value="Kiosk">Kiosk</SelectItem>
                  <SelectItem value="Access">Access</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                What kind of problem are you having?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="data.errorCodes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Major Errors</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Enter the error codes for any major error.
              </FormDescription>
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

export default ITRequestFields;
