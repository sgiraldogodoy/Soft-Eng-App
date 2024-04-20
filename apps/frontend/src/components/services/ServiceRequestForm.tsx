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
import RoomRequestFields from "./RoomRequestFields";
import AVRequestFields from "./AVRequestFields";

import FlowerRequestFields from "./FlowerRequestFields";
import SecurityRequestFields from "@/components/services/SecurityRequestFields.tsx";
import GiftRequestFields from "./GiftRequestFields";
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
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { formService } from "common";

// Add your type-specific form schema to this array.
const FormSchema = formService;

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
  room: { longName: "Request a Room", formFields: RoomRequestFields },
  av: {
    longName: "Request AV Equipment",
    formFields: AVRequestFields,
  },
  flower: {
    longName: "Request Flowers",
    formFields: FlowerRequestFields,
  },
  security: {
    longName: "Request Security",
    formFields: SecurityRequestFields,
  },
  gift: {
    longName: "Request Gift",
    formFields: GiftRequestFields,
  },
};

interface Props {
  variant: FormTypes;
}

export default function InputForm({ variant }: Props) {
  const unfilteredQuery = trpc.node.getAll.useQuery();
  const unsortedQuery = unfilteredQuery.data
    ? unfilteredQuery.data?.filter((node) => !(node.type === "HALL"))
    : [];
  const nodesQuery = unsortedQuery.sort(function (a, b) {
    const nodeA = a.longName.toUpperCase();
    const nodeB = b.longName.toUpperCase();
    return nodeA < nodeB ? -1 : nodeA > nodeB ? 1 : 0;
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    shouldUnregister: true,
  });

  // const { requests, setRequests } = useContext(RequestsContext);
  const session = useAuth0();
  const utils = trpc.useUtils();
  const createFlowerRequest = trpc.flower.createOne.useMutation();
  const createSecurityRequest = trpc.security.createOne.useMutation();
  const createGiftRequest = trpc.gift.createOne.useMutation();
  const createAVRequest = trpc.av.createOne.useMutation();
  const createRoomRequest = trpc.room.createOne.useMutation();

  const ActiveFormFields = FORMTYPE_RECORD[variant].formFields as FormComponent<
    z.infer<typeof FormSchema>
  >;

  function onSubmit(data: z.infer<typeof FormSchema>) {
    data.nodeId = nodesQuery.find((n) => data.nodeId === n.longName)?.id ?? "";

    switch (data.type) {
      case "flower":
        toast.promise(
          createFlowerRequest.mutateAsync(
            {
              login: session.user?.email ?? "",
              ...data,
            },
            {
              onSuccess: () => {
                utils.service.getAll.invalidate();
              },
            },
          ),
          {
            success: "Successfully saved to the database.",
            loading: "Saving flower request to the database.",
            error: "Error saving to database.",
          },
        );
        break;
      case "security":
        toast.promise(
          createSecurityRequest.mutateAsync(
            {
              login: session.user?.email ?? "",
              ...data,
            },
            {
              onSuccess: () => {
                utils.service.getAll.invalidate();
              },
            },
          ),
          {
            success: "Successfully saved to the database.",
            loading: "Saving security request to the database.",
            error: "Error saving to database.",
          },
        );
        break;
      case "gift":
        toast.promise(
          createGiftRequest.mutateAsync(
            {
              login: session.user?.email ?? "",
              ...data,
            },
            {
              onSuccess: () => {
                utils.service.getAll.invalidate();
              },
            },
          ),
          {
            success: "Successfully saved to the database.",
            loading: "Saving gift request to the database.",
            error: "Error saving to database.",
          },
        );
        break;
      case "av":
        toast.promise(
          createAVRequest.mutateAsync(
            {
              login: session.user?.email ?? "",
              ...data,
            },
            {
              onSuccess: () => {
                utils.service.getAll.invalidate();
              },
            },
          ),
          {
            success: "Successfully saved to the database.",
            loading: "Saving av request to the database.",
            error: "Error saving to database.",
          },
        );
        break;
      case "room":
        toast.promise(
          createRoomRequest.mutateAsync(
            {
              login: session.user?.email ?? "",
              ...data,
            },
            {
              onSuccess: () => {
                utils.service.getAll.invalidate();
              },
            },
          ),
          {
            success: "Successfully saved to the database.",
            loading: "Saving room request to the database.",
            error: "Error saving to database.",
          },
        );
        break;
      default:
        toast.error("An error occured.");
    }

    form.reset();
  }

  useEffect(() => {
    console.log("SETTING TYPE: " + variant);
    form.setValue("type", variant);
  }, [variant, form]);

  return (
    <>
      <Card className="h-full backdrop-blur-md flex-1 flex flex-col overflow-auto z-0">
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
              <div className="flex flex-row gap-2 items-stretch">
                <FormField
                  control={form.control}
                  name="nodeId"
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
                                ? nodesQuery.find(
                                    (node) => node.longName === field.value,
                                  )?.longName
                                : "Select location"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[310px] max-h-[200px] overflow-scroll p-0">
                          <Command>
                            <CommandInput
                              placeholder="Search locations..."
                              className="h-9"
                            />
                            <CommandEmpty>No location found.</CommandEmpty>
                            <CommandGroup>
                              {nodesQuery.map((location) => (
                                <CommandItem
                                  value={location.longName}
                                  key={location.longName}
                                  onSelect={() => {
                                    form.setValue("nodeId", location.longName);
                                  }}
                                >
                                  {location.longName}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      location.longName === field.value
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
                            <SelectValue placeholder="Select a priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="LOW">Low</SelectItem>
                          <SelectItem value="MEDIUM">Medium</SelectItem>
                          <SelectItem value="HIGH">High</SelectItem>
                          <SelectItem value="EMERGENCY">Emergency</SelectItem>
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
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex flex-col flex-1">
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Status for the Request" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ASSIGNED">Assigned</SelectItem>
                        <SelectItem value="UNASSIGNED">Unassigned</SelectItem>
                        <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      This is the urgency of the request.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {<ActiveFormFields form={form} />}
              <FormField
                control={form.control}
                name="note"
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
                  variant="outline"
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
