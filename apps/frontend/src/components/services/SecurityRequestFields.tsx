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

const SecurityRequest = () => {
  return (
    <>
      <div className="flex flex-row gap-2 items-center flex-1">
        <FormField
          name="data.threat"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Threat Level</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[300px]">
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
        <FormField
          name="data.dateTime"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormDescription>
                What date does the request need to be made?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div>
        <p className="text-xs"> created by Cole Welcher & Kevin McCrudden</p>
      </div>
    </>
  );
};

export default SecurityRequest;
