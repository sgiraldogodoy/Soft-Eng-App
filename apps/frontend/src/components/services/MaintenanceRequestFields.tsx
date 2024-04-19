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
import { Input } from "@/components/ui/input.tsx";

export const MaintenanceRequestSchema = z.object({
  type: z.literal("maintenance-request"),
  equipmentType: z.string(),
  severity: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});

const MaintenanceRequestFields = () => {
  return (
    <>
      <div className="flex gap-2 items-center flex-1">
        <FormField
          name="data.type"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Equipment Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the Equipment Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Medical">Medical</SelectItem>
                  <SelectItem value="Security">Security</SelectItem>
                  <SelectItem value="Device">Device</SelectItem>
                  <SelectItem value="Vehicle">Vehicle</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>What type of equipment?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="data.severity"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Severity</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the Severity" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="None">No Damage</SelectItem>
                  <SelectItem value="Minor">Minor</SelectItem>
                  <SelectItem value="Moderate">Moderate</SelectItem>
                  <SelectItem value="Major">Major</SelectItem>
                  <SelectItem value="Severe">Severe</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>How bad is the damage?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="data.startDate"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormDescription>When will maintenance start?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="data.endDate"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormDescription>When will maintenance end?</FormDescription>
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

export default MaintenanceRequestFields;
