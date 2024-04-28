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

const Equipment = () => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <FormField
          name="data.recipientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipient</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Who shall receive the service.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex gap-2 items-center flex-1">
        <FormField
          name="data.type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Equipment Required</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an Equipment type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Testing">Testing</SelectItem>
                  <SelectItem value="Surgical">Surgical</SelectItem>
                  <SelectItem value="Anesthetic">Anesthetic</SelectItem>
                  <SelectItem value="Sanitation">Sanitation</SelectItem>
                  <SelectItem value="Office">Office</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>What Equipment is Required?</FormDescription>
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
                What date is the request needed for?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default Equipment;
