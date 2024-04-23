import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";

export default function PatientRetrevial() {
  const formSchema = z.object({
    patient: z.string().min(0, {}),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patient: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 flex flex-col"
      >
        <FormField
          control={form.control}
          name="patient"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[300px]">
                    <SelectValue placeholder="Search for a Patient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="None">None</SelectItem>
                    <SelectItem value="MassHealth">MassHealth</SelectItem>
                    <SelectItem value="Aetna">Aetna</SelectItem>
                    <SelectItem value="Cigna">Cigna</SelectItem>
                    <SelectItem value="Blue Cross">Blue Cross</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
