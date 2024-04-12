import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { CaretSortIcon } from "@radix-ui/react-icons";
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

import FlowerRequestFields, {
  FlowerRequestSchema,
} from "./FlowerRequestFields";
import { BaseFormSchema } from "./formSchema";
import SecurityRequestFields, {
  SecurityRequestSchema,
} from "@/components/services/SecurityRequestFields.tsx";
import GiftRequestFields, { GiftRequestSchema } from "./GiftRequestFields";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { PopoverContent } from "../ui/popover";
import { CheckIcon } from "lucide-react";
import { useContext, useEffect } from "react";
import { RequestsContext } from "@/routes/ServiceRequestPage";

// Add your type-specific form schema to this array.
const FormSchema = z.discriminatedUnion("type", [
  BaseFormSchema.merge(RoomRequestSchema),
  BaseFormSchema.merge(AVRequestSchema),
  BaseFormSchema.merge(FlowerRequestSchema),
  BaseFormSchema.merge(SecurityRequestSchema),
  BaseFormSchema.merge(GiftRequestSchema),
]);

type FormSchemaType = z.infer<typeof FormSchema>;

export type FormTypes = FormSchemaType["type"];

const options = FormSchema.options;

type SpecialSchemas = z.infer<typeof options extends (infer T)[] ? T : never>;

export type FormComponent<T> = ({
  form,
}: {
  form?: UseFormReturn<T extends infer U extends SpecialSchemas ? U : never>;
}) => JSX.Element;

// Add your components and long names to this record. It should map the type id to the title name and form component that the form will display.
const FORMTYPE_RECORD: Record<
  FormTypes,
  {
    longName: string;
    formFields: FormComponent<unknown>;
  }
> = {
  "room-request": { longName: "Request a Room", formFields: RoomRequestFields },
  "av-request": {
    longName: "Request AV Equipment",
    formFields: AVRequestFields,
  },
  "flower-request": {
    longName: "Request Flowers",
    formFields: FlowerRequestFields,
  },
  "security-request": {
    longName: "Request Security",
    formFields: SecurityRequestFields,
  },
  "gift-request": {
    longName: "Request Gift",
    formFields: GiftRequestFields,
  },
};

interface Props {
  variant: FormTypes;
}

export default function InputForm({ variant }: Props) {
  const nodesQuery = trpc.node.getAll.useQuery();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    shouldUnregister: true,
  });

  const { requests, setRequests } = useContext(RequestsContext);

  const ActiveFormFields = FORMTYPE_RECORD[variant].formFields as FormComponent<
    z.infer<typeof FormSchema>
  >;

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("attempting");
    console.log(data);

    setRequests([...requests, data]);

    toast(
      <div>
        <p className="font-semibold">Success! (Data not stored yet!)</p>
        <pre>
          <code>{JSON.stringify(data, null, 4)}</code>
        </pre>
      </div>,
    );

    form.reset();
  }

  useEffect(() => {
    form.setValue("type", variant);
  }, [variant, form]);

  return (
    <>
      <Card className="bg-white/90 drop-shadow-md shadow-inner backdrop-blur-md flex-1 flex flex-col overflow-auto">
        <CardHeader>
          <CardTitle className="capitalize">
            {FORMTYPE_RECORD[variant].longName}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col justify-center items-center gap-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex flex-col justify-between items-stretch gap-3"
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
              <div className="flex flex-row gap-2 items-stretch">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className="flex flex-col h-full justify-between flex-1">
                      <FormLabel>Location</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value
                                ? nodesQuery.data?.find(
                                    (node) => node.id === field.value,
                                  )?.longName
                                : "Select location"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] max-h-[200px] overflow-scroll p-0">
                          <Command>
                            <CommandInput
                              placeholder="Search locations..."
                              className="h-9"
                            />
                            <CommandEmpty>No location found.</CommandEmpty>
                            <CommandGroup>
                              {nodesQuery.data?.map((location) => (
                                <CommandItem
                                  value={location.id}
                                  key={location.id}
                                  onSelect={() => {
                                    form.setValue("location", location.id);
                                  }}
                                >
                                  {location.longName}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      location.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Where should the request be serviced?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem className="flex flex-col flex-1">
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
                        placeholder="Any other information?"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      These are any extra notes for the employee who services
                      the request.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-xs">
                {" "}
                created by Daniel Reynolds & Matthew Franco
              </p>
              <input type="hidden" {...form.register("type")} />
              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  variant="secondary"
                  onClick={() => {
                    form.reset();
                  }}
                >
                  Reset
                </Button>
                <Button className="flex-1 " type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
