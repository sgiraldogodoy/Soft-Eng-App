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
  type: z.literal("transport-request"),
  vehicleType: z.string(),
  patientCount: z.string(),
});

const TransportRequestFields = () => {
  return (
    <>
      <div className="flex gap-2 items-center flex-1">
        <FormField
          name="data.type"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Vehicle Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the vehicle that should be used" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Ambulance">Emergency Ambulance</SelectItem>
                  <SelectItem value="Helicopter">Helicopter</SelectItem>
                  <SelectItem value="Aircraft">Fixed-Wing Aircraft</SelectItem>
                  <SelectItem value="Boat">Boat</SelectItem>
                  <SelectItem value="Bus">Ambulance Bus</SelectItem>
                  <SelectItem value="Van">Van</SelectItem>
                  <SelectItem value="AllTerrain">
                    All-Terrain Vehicle
                  </SelectItem>
                  <SelectItem value="Train">Train</SelectItem>
                  <SelectItem value="Motorcycle">Motorcycle</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>What type of vehicle?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="data.count"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patient Count</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                How many patients are being transported?
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

export default TransportRequestFields;
