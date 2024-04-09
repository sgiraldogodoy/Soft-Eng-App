import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { trpc } from "@/utils/trpc";
import RoomRequestFields, { RoomRequestSchema } from "./RoomRequestFields";
import AVRequestFields, { AVRequestSchema } from "./AVRequestFields";

import { BaseFormSchema } from "./formSchema";

// Add your type-specific form schema to this array.
const FormSchema = z.discriminatedUnion("type", [
  BaseFormSchema.merge(RoomRequestSchema),
  BaseFormSchema.merge(AVRequestSchema),
]);

type FormSchemaType = z.infer<typeof FormSchema>;
type FormTypes = FormSchemaType["type"];

// Add your components and long names to this record. It should map the type id to the title name and form component that the form will display.
const FORMTYPE_RECORD: Record<
  FormTypes,
  {
    longName: string;
    formFields: ({
      form,
    }: {
      form: UseFormReturn<z.infer<typeof FormSchema>>;
    }) => JSX.Element;
  }
> = {
  "room-request": { longName: "Request a Room", formFields: RoomRequestFields },
  "av-request": {
    longName: "Request AV Equipment",
    formFields: AVRequestFields,
  },
};

interface Props {
  variant: FormTypes;
}

export default function InputForm({ variant }: Props) {
  const nodesQuery = trpc.db.getAllNodes.useQuery();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      recipient: "",
      location: "",
      type: variant,
    },
  });

  const ActiveFormFields = FORMTYPE_RECORD[variant].formFields;

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("attempting");
    console.log(data);
    toast("Success");
  }
  return (
    <Card className="w-2/3">
      <CardHeader>
        <CardTitle className="capitalize">
          {FORMTYPE_RECORD[variant].longName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col justify-between items-stretch gap-2"
          >
            <FormField
              control={form.control}
              name="recipient"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Who should receive the service.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row gap-2">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Location</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {nodesQuery.data?.map((n, index) => {
                          return (
                            <SelectItem
                              key={`location-${index}`}
                              value={n.nodeId}
                            >
                              {n.longName}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose a location for delivery.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Priority</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Priority for the Request" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Emergency">Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      This is the urgency of the request.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {<ActiveFormFields form={form} />}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    These are any extra notes for the employee who services the
                    request.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
