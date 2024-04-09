import { z } from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";

import { Input } from "../ui/input";

export const AVRequestSchema = z.object({
  type: z.literal("av-request"),
  avTypes: z.string(),
  deliveryTime: z.string(),
});

const AVRequest = () => {
  return (
    <div className="flex gap-2 items-center flex-1">
      <FormField
        name="avTypes"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>AV Types</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select the Equipment Types" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Audio">Audio</SelectItem>
                <SelectItem value="Video">Video</SelectItem>
                <SelectItem value="Both">Both</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>What type of equipment?</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="deliveryTime"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>Delivery Time</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormDescription>When does it need to be set up?</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default AVRequest;
