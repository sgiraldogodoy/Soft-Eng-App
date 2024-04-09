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

import { UseFormReturn } from "react-hook-form";
import { Input } from "../ui/input";
import { BaseFormSchema } from "./formSchema";

export const AVRequestSchema = z.object({
  type: z.literal("av-request"),
  avTypes: z.string(),
  deliveryTime: z.string(),
});

const AVRequestFormSchema = BaseFormSchema.merge(AVRequestSchema);

export default function AVRequest({
  form,
}: {
  form: UseFormReturn<z.infer<typeof AVRequestFormSchema>, unknown>;
}) {
  return (
    <div className="flex gap-2 items-center flex-1">
      <FormField
        control={form.control}
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
            <FormDescription>
              Do you want audio and/or video equipment?
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="deliveryTime"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>Delivery Time</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormDescription>
              When do you want everything set up?
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
