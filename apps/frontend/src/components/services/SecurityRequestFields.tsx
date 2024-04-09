import { z } from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SecurityRequestSchema = z.object({
  type: z.literal("security-request"),
  time: z.string(),
  threatLevel: z.string(),
});

const SecurityRequest = () => {
  return (
    <div className="flex gap-2 items-center flex-1">
      <FormField
        name="securityType"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>Time</FormLabel>
            <FormControl>
              <Input type="time" {...field} />
            </FormControl>
            <FormDescription>What time is the request made?</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="threatLevel"
        render={() => (
          <FormItem className="flex-1">
            <FormLabel>Threat Level</FormLabel>
            <FormControl>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Low" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Midnight">Midnight</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormDescription>What is the threat level?</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default SecurityRequest;
