import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { Input } from "@/components/ui/input.tsx";

const Food = () => {
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
          name="data.order"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Order</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Enter Order here</FormDescription>
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

export default Food;
