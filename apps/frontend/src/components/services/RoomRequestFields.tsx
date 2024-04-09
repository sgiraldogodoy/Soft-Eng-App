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

export const RoomRequestSchema = z.object({
  type: z.literal("room-request"),
  startTime: z.string(),
  endTime: z.string(),
});

const RoomRequest = () => {
  return (
    <div className="flex gap-2 items-center flex-1">
      <FormField
        name="startTime"
        render={({ field }) => (
          <FormItem className="flex-1">
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
        name="endTime"
        render={({ field }) => (
          <FormItem className="flex-1">
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
};

export default RoomRequest;
