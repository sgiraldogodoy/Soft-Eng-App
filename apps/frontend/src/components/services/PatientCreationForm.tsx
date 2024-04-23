import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useAuth0 } from "@auth0/auth0-react";
import { ZCreateBaseServiceSchema, ZCreateFlowerSchema } from "common";

// Add your type-specific form schema to this array.
const FormSchema = z.discriminatedUnion("type", [
  ZCreateBaseServiceSchema.extend({
    data: ZCreateFlowerSchema.omit({ service: true }),
    type: z.literal("flower"),
  }).omit({ login: true }),
]);

export default function InputForm() {
  const unfilteredQuery = trpc.node.getAll.useQuery();
  const unfilteredStaffQuery = trpc.staff.getAll.useQuery();
  const unsortedQuery = unfilteredQuery.data
    ? unfilteredQuery.data?.filter((node) => !(node.type === "HALL"))
    : [];
  const unsortedStaffQuery = unfilteredStaffQuery.data
    ? unfilteredStaffQuery.data
    : [];
  const nodesQuery = unsortedQuery.sort(function (a, b) {
    const nodeA = a.longName.toUpperCase();
    const nodeB = b.longName.toUpperCase();
    return nodeA < nodeB ? -1 : nodeA > nodeB ? 1 : 0;
  });
  const staffQuery = unsortedStaffQuery.sort(function (a, b) {
    const staffA = a.name.toUpperCase();
    const staffB = b.name.toUpperCase();
    return staffA < staffB ? -1 : staffA > staffB ? 1 : 0;
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    shouldUnregister: true,
  });

  // const { requests, setRequests } = useContext(RequestsContext);
  const session = useAuth0();
  const utils = trpc.useUtils();
  const createFlowerRequest = trpc.flower.createOne.useMutation();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    data.nodeId = nodesQuery.find((n) => data.nodeId === n.longName)?.id ?? "";

    console.log(data);
    toast.promise(
      createFlowerRequest.mutateAsync(
        {
          flower: data.data.flower,
          recipientName: data.data.recipientName,
          service: {
            create: {
              login: session.user?.email ?? "",
              ...data,
            },
          },
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

    form.reset();
  }

  return (
    <>
      <Card className="h-full backdrop-blur-md flex-1 flex flex-col overflow-auto z-0 bg-white/90">
        <CardHeader>
          <CardTitle className="capitalize">Patient Creation</CardTitle>
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
                name="staffId"
                render={({ field }) => (
                  <FormItem className="flex flex-col h-full justify-between flex-1">
                    <FormLabel>Assignee</FormLabel>
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
                              ? staffQuery.find(
                                  (staff) => staff.id === field.value,
                                )?.name
                              : "Select Staff"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[310px] max-h-[200px] overflow-scroll p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search employee..."
                            className="h-9"
                          />
                          <CommandEmpty>No employee found.</CommandEmpty>
                          <CommandGroup>
                            {staffQuery.map((assignee) => (
                              <CommandItem
                                value={assignee.name}
                                key={assignee.name}
                                onSelect={() => {
                                  form.setValue("staffId", assignee.id);
                                }}
                              >
                                {assignee.name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    assignee.name === field.value
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
                      Who should be assigned the request?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
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

/*import { Button } from "@/components/ui/button";
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
*/
