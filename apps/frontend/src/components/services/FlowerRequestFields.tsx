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
import { Input } from "../ui/input";

const FlowerRequest = () => {
  return (
    <>
      <div className="flex gap-2 items-center flex-1">
        <FormField
          name="data.flower"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Choose a flower.</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select which flower you would like" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Carnation">Carnation</SelectItem>
                  <SelectItem value="Hyacinth">Hyacinth</SelectItem>
                  <SelectItem value="Chrysanthemum">Chrysanthemum</SelectItem>
                  <SelectItem value="Lilies">Lilies</SelectItem>
                  <SelectItem value="Rose">Rose</SelectItem>
                  <SelectItem value="Sunflower">Sunflower</SelectItem>
                  <SelectItem value="Tulip">Tulip</SelectItem>
                  <SelectItem value="Pookie Flower">Pookie Flower</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Which flowers would you like?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="data.recipientName"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Recipient</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Who should receive the service.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div>
        <p className="text-xs"> created by Daniel Reynolds & Matthew Franco</p>
      </div>
    </>
  );
};

export default FlowerRequest;
