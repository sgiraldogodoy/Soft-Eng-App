import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Input } from "../ui/input";

const GiftRequest = () => {
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
              <FormDescription>Who should receive the service.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 items-center flex-1">
          <FormField
            name="data.type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gift Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Gift Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Electronic">Electronic</SelectItem>
                    <SelectItem value="Food&Drinks">Food&Drinks</SelectItem>
                    <SelectItem value="Toy">Toy</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  What type of gift would you like to request?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="data.wrapping"
            defaultValue={false}
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Gift Wrapped</FormLabel>
                <div className="space-y-1 leading-none"></div>
              </FormItem>
            )}
          />
        </div>
        <FormField
          name="data.message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write a message to the recipient here."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This message will be included with the gift.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div>
        <p className="text-xs">
          created by Santiago Giraldo Godoy & Keenan Porter
        </p>
      </div>
    </>
  );
};

export default GiftRequest;
