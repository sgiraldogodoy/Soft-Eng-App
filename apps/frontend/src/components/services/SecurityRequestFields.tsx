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
import { FormComponent } from "@/components/services/ServiceRequestForm.tsx";

export const SecurityRequestSchema = z.object({
  type: z.literal("security-request"),
  securityType: z.string(),
  time: z.string(),
  threatLevel: z.string(),
});

const SecurityRequestFormSchema = BaseFormSchema.merge(SecurityRequestSchema);

const SecurityRequest: FormComponent<
  z.infer<typeof SecurityRequestFormSchema>
> = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof SecurityRequestFormSchema>>;
}) => {
  return (
    <div className="flex gap-2 items-center flex-1">
      <FormField
        control={form.control}
        name="securityType"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>End Time</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormDescription>What is the security type?</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="time"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>Start Time</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormDescription>What is the time of the request?</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="threatLevel"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>Start Time</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormDescription>What is the threat level?</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default SecurityRequest;
