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
// import { useAuth0 } from "@auth0/auth0-react";
import { ZCreatePatientSchema } from "common";
import { Input } from "@/components/ui/input.tsx";

// Add your type-specific form schema to this array.
const FormSchema = ZCreatePatientSchema.extend({
  user: z
    .object({})
    .passthrough()
    .pipe(
      z.preprocess((user) => {
        if (typeof user !== "object" || !user) {
          return false;
        }
        if ("connect" in user) {
          if (typeof user.connect !== "object" || !user.connect) return false;
          if ("id" in user.connect && user.connect.id !== "") {
            return user;
          }
        }

        return user;
      }, ZCreatePatientSchema.shape.user),
    ),
  pcp: z
    .object({})
    .passthrough()
    .pipe(
      z.preprocess((pcp) => {
        if (typeof pcp !== "object" || !pcp) {
          return false;
        }
        if ("connect" in pcp) {
          if (typeof pcp.connect !== "object" || !pcp.connect) return false;
          if ("id" in pcp.connect && pcp.connect.id !== "") {
            return pcp;
          }
        }

        return pcp;
      }, ZCreatePatientSchema.shape.pcp),
    ),
});

export default function InputForm() {
  const unfilteredQuery = trpc.node.getAll.useQuery();
  const unfilteredStaffQuery = trpc.staff.getAll.useQuery();
  const unfilteredUserQuery = trpc.user.getAll.useQuery();
  const unsortedQuery = unfilteredQuery.data
    ? unfilteredQuery.data?.filter((node) => !(node.type === "HALL"))
    : [];
  const unsortedStaffQuery = unfilteredStaffQuery.data
    ? unfilteredStaffQuery.data
    : [];
  //filter users only users that email field is populated
  const unsortedUserQuery = unfilteredUserQuery.data
    ? unfilteredUserQuery.data?.filter((user) => user.email)
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
  const userQuery = unsortedUserQuery.sort(function (a, b) {
    if (a.email === null || b.email === null) {
      return 0;
    } else {
      const userA = a.email.toUpperCase();
      const userB = b.email.toUpperCase();
      return userA < userB ? -1 : userA > userB ? 1 : 0;
    }
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    shouldUnregister: true,
  });

  // const { requests, setRequests } = useContext(RequestsContext);
  // const session = useAuth0();
  const utils = trpc.useUtils();
  const createPatientRequest = trpc.patient.createOne.useMutation();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    data.node.connect.id =
      nodesQuery.find((n) => data.node.connect.id === n.longName)?.id ?? "";

    console.log(data);
    toast.promise(
      createPatientRequest.mutateAsync(
        {
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
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>First Name*</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="middleName"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Middle Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Last Name*</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-row gap-2 items-stretch">
                <FormField
                  control={form.control}
                  name="SSN"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>SSN</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" />
                      </FormControl>
                      <FormDescription>Only if you have one.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="node.connect.id"
                  render={({ field }) => (
                    <FormItem className="flex flex-col h-full justify-between flex-1">
                      <FormLabel>Location*</FormLabel>
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
                                    form.setValue(
                                      "node.connect.id",
                                      location.longName,
                                    );
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
              </div>
              <div className="flex flex-row gap-2 items-stretch">
                <FormField
                  control={form.control}
                  name="insurance"
                  render={({ field }) => (
                    <FormItem className="flex flex-col flex-1">
                      <FormLabel>Patient's Insurance</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a insurance provider" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="None">None</SelectItem>
                          <SelectItem value="MassHealth">MassHealth</SelectItem>
                          <SelectItem value="Aetna">Aetna</SelectItem>
                          <SelectItem value="Cigna">Cigna</SelectItem>
                          <SelectItem value="Blue Cross">Blue Cross</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        This is the insurance provider of the patient.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pcp.connect.id"
                  render={({ field }) => (
                    <FormItem className="flex flex-col h-full justify-between flex-1">
                      <FormLabel>Primary Care Provider</FormLabel>
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
                                    form.setValue(
                                      "pcp.connect.id",
                                      assignee.id,
                                    );
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
                        Who is your care provider?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-row gap-2 items-stretch">
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormDescription>When were you born?</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Primary Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="user.connect.id"
                render={({ field }) => (
                  <FormItem className="flex flex-col h-full justify-between flex-1">
                    <FormLabel>Link user email</FormLabel>
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
                              ? userQuery.find(
                                  (user) => user.id === field.value,
                                )?.email
                              : "Select User Email"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[310px] max-h-[200px] overflow-scroll p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search user..."
                            className="h-9"
                          />
                          <CommandEmpty>No email found.</CommandEmpty>
                          <CommandGroup>
                            {userQuery.map((user) => (
                              <CommandItem
                                value={user.email ?? ""}
                                key={user.email}
                                onSelect={() => {
                                  form.setValue("user.connect.id", user.id);
                                }}
                              >
                                {user.email}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    user.email === field.value
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
                    <FormDescription>what is your user email?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
