import { z } from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";

export const SanitationRequestSchema = z.object({
  type: z.literal("sanitation-request"),
  cleaningType: z.string(),
  quality: z.string(),
});

const SanitationRequestFields = () => {
  return (
    <>
      <div className="flex gap-2 items-center flex-1">
        <FormField
          name="data.quality"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Sanitation Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the type of cleaning" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="General Sanitation">
                    General Sanitation
                  </SelectItem>
                  <SelectItem value="Bed Cleaning">Bed Cleaning</SelectItem>
                  <SelectItem value="Bathroom Cleaning">
                    Bathroom Cleaning
                  </SelectItem>
                  <SelectItem value="Waste Disposal">Waste Disposal</SelectItem>
                  <SelectItem value="Hazard Removal">Hazard Removal</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>What kind of cleaning is it?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="data.quality"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Cleaning Quality</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the quality of the cleaning" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Rush Job">Rush Job</SelectItem>
                  <SelectItem value="Quick">Quick</SelectItem>
                  <SelectItem value="Simple">Simple</SelectItem>
                  <SelectItem value="Extensive">Extensive</SelectItem>
                  <SelectItem value="Full Decontamination">
                    Full Decontamination
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                How thorough should the cleaning be?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div>
        <p className="text-xs"> created by Justin Yip</p>
      </div>
    </>
  );
};

export default SanitationRequestFields;
