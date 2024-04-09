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

import { BaseFormSchema } from "./formSchema";
import { FormComponent } from "@/components/services/ServiceRequestForm.tsx";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "@/components/ui/textarea.tsx";

export const GiftRequestSchema = z.object({
  type: z.literal("gift-request"),
  giftType: z.string(),
  giftWrap: z.boolean(),
  giftMessage: z.string(),
});

const GiftRequestFormSchema = BaseFormSchema.merge(GiftRequestSchema);

const GiftRequest: FormComponent<z.infer<typeof GiftRequestFormSchema>> = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof GiftRequestFormSchema>>;
}) => {
  return (
    <div className="flex gap-2 items-center flex-1">
      <FormField
        control={form.control}
        name="giftType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Gift Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
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
        control={form.control}
        name="giftWrap"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Gift Wrapped</FormLabel>
              <FormDescription>
                Would you like the gift to be wrapped on delivery?
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="giftMessage"
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
  );
};

export default GiftRequest;
