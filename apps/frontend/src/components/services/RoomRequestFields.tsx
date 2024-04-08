import { z } from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { UseFormReturn } from "react-hook-form";
import { Input } from "../ui/input";
import { BaseFormSchema } from "./formSchema";

export const RoomRequestSchema = z.object({
  type: z.literal("room-request"),
  startTime: z.string(),
  endTime: z.string(),
});

const RoomRequestFormSchema = BaseFormSchema.merge(RoomRequestSchema);

export default function RoomRequest({
  form,
}: {
  form: UseFormReturn<z.infer<typeof RoomRequestFormSchema>, unknown>;
}) {
  return (
    <div>
      <FormField
        control={form.control}
        name="startTime"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Start Time</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormDescription>What time should it start?</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="endTime"
        render={({ field }) => (
          <FormItem>
            <FormLabel>End Time</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormDescription>What time should it end?</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
