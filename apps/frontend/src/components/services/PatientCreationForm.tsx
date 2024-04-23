import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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

export default function PatientCreationForm() {
  const formSchema = z.object({
    firstname: z.string().min(0, {}),
    middlename: z.string().min(0, {}),
    lastname: z.string().min(0, {}),
    dob: z.string().min(0, {}),
    phonenumber: z.string().min(0, {}),
    ssn: z.string().min(0, {}),
    insurance: z.string().min(0, {}),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      middlename: "",
      lastname: "",
      dob: "",
      phonenumber: "",
      ssn: "",
      insurance: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 flex flex-col"
      >
        <div className="flex flex-row space-x-5">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input className="bg-white text-black " {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="middlename"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Middle Name</FormLabel>
                <FormControl>
                  <Input className="bg-white text-black " {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input className="bg-white text-black " {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row space-x-5">
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phonenumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Phone Number</FormLabel>
                <FormControl>
                  <Input className="bg-white text-black" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ssn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Patient's SSN</FormLabel>
                <FormControl>
                  <Input className="bg-white text-black " {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          name="insurance"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Patient's Insurance</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[300px]">
                    <SelectValue placeholder="Select Patient's Insurance" />
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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="filephoto"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Patient Photo</FormLabel>
              <FormControl>
                <Input type="file" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="bg-white text-black ml-16 w-1/2 hover:bg-gray-300 justify-center items-center"
          type="submit"
          variant="outline"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
