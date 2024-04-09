import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { z } from "zod";
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { UseFormReturn } from "react-hook-form";
import { BaseFormSchema } from "./formSchema";
import { FormComponent } from "@/components/services/ServiceRequestForm.tsx";

export const SecurityRequestSchema = z.object({
  type: z.literal("security-request"),
  securityType: z.string(),
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
        render={() => (
          <FormItem className="flex-1">
            <FormLabel>Threat Level</FormLabel>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Low" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Midnight">Midnight</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>What is the security type?</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default SecurityRequest;
