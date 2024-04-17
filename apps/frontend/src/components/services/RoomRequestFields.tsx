import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const RoomRequest = () => {
  return (
    <>
      <div className="flex gap-2 items-center flex-1">
        <FormField
          name="data.checkIn"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Start Time</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormDescription>What time should it start?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="data.checkOut"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>End Time</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormDescription>What time should it end?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div>
        <p className="text-xs"> created by Ace Beattie & Michael Lin</p>
      </div>
    </>
  );
};

export default RoomRequest;
