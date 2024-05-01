import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
// import {Input} from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ZCreateAppointmentSchema } from "common";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/utils/trpc.ts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { PopoverContent } from "@radix-ui/react-popover";
import { Popover, PopoverTrigger } from "@/components/ui/popover.tsx";
import { cn } from "@/lib/utils.ts";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command.tsx";
import { CheckIcon } from "lucide-react";
// import { useState } from "react";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Input } from "@/components/ui/input.tsx";
import { toast } from "sonner";
import { useMemo } from "react";

const preprocessNested = (v: unknown) => {
  if (typeof v !== "object" || !v) {
    return undefined;
  }
  if (
    "connect" in v &&
    typeof v.connect === "object" &&
    v.connect &&
    "id" in v.connect &&
    v.connect.id !== "" &&
    v.connect.id !== undefined
  ) {
    return v;
  }

  return undefined;
};

const FormSchema = ZCreateAppointmentSchema.extend({
  staff: z.preprocess(
    preprocessNested,
    z.object({ connect: z.object({ id: z.string() }) }),
  ),
});

// type TCreateAppointmentSchema = z.infer<typeof ZCreateAppointmentSchema>;

interface ScheduleAppointmentDialogueProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function ScheduleAppointmentDialogue({
  open,
  setOpen,
}: ScheduleAppointmentDialogueProps) {
  const staffQuery = trpc.staff.getAll.useQuery();
  // const unsortedStaffQuery = unfilteredStaffQuery.data
  //   ? unfilteredStaffQuery.data
  //   : [];
  // const staffQuery = unsortedStaffQuery.sort(function (a, b) {
  //   const staffA = a.name.toUpperCase();
  //   const staffB = b.name.toUpperCase();
  //   return staffA < staffB ? -1 : staffA > staffB ? 1 : 0;
  // });

  const staffData = useMemo(
    () => staffQuery.data?.sort((a, b) => a.name.localeCompare(b.name)),
    [staffQuery],
  );

  const patientQuery = trpc.patient.getAll.useQuery();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    shouldUnregister: true,
    defaultValues: {
      notes: "",
      staff: {
        connect: {
          id: "",
        },
      },
    },
  });

  const utils = trpc.useUtils();
  const createAppointmentMutation = trpc.appointment.createOne.useMutation();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const createAppointment = createAppointmentMutation.mutateAsync(
      {
        ...data,
        appointmentTime: data.appointmentTime ?? "",
      },
      {
        onSuccess: () => {
          utils.appointment.getAll.invalidate();
          utils.user.me.invalidate();
        },
      },
    );

    toast.promise(createAppointment, {
      success: "Successfully scheduled your appointment.",
      loading: "Scheduling appointment...",
      error: "Error scheduling your appointment.",
    });

    try {
      await createAppointment;
      form.reset();
    } catch {
      console.error("Error :(");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Schedule an appointment</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col justify-between items-stretch gap-4"
          >
            <FormField
              control={form.control}
              name="staff.connect.id"
              render={({ field }) => (
                <FormItem className="flex flex-col flex-1">
                  <FormLabel>Select a doctor</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "flex-1 justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value
                            ? staffData?.find(
                                (staff) => staff.id === field.value,
                              )?.name
                            : "Select staff"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <Command>
                        <CommandInput
                          placeholder="Search doctor..."
                          className="h-9"
                        />
                        <CommandEmpty>No doctors found.</CommandEmpty>
                        <CommandGroup>
                          {staffData?.map((staff) => (
                            <CommandItem
                              value={staff.name}
                              key={staff.name}
                              onSelect={() => {
                                form.setValue("staff.connect.id", staff.id);
                              }}
                            >
                              {staff.name}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  staff.id === field.value
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
                  <FormDescription>Who will see the patient?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="patient.connect.id"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Select a patient</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "flex-1 justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value
                            ? patientQuery.data?.find(
                                (staff) => staff.id === field.value,
                              )?.firstName +
                              " " +
                              patientQuery.data?.find(
                                (staff) => staff.id === field.value,
                              )?.lastName
                            : "Select patient"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <Command>
                        <CommandInput
                          placeholder="Search patient..."
                          className="h-9"
                        />
                        <CommandEmpty>No patient found.</CommandEmpty>
                        <CommandGroup>
                          {patientQuery.data?.map((patient) => (
                            <CommandItem
                              value={patient.firstName + " " + patient.lastName}
                              key={patient.firstName + " " + patient.lastName}
                              onSelect={() => {
                                form.setValue("patient.connect.id", patient.id);
                              }}
                            >
                              {patient.firstName + " " + patient.lastName}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  patient.id === field.value
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
                  <FormDescription>Who is the patient?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="appointmentTime"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Select a date</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormDescription>
                    Appointment date must be in the future.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell the doctor something about your visit before you come in"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <Button
                type="button"
                className="flex-1"
                variant="outline"
                onClick={() => {
                  form.reset();
                }}
              >
                Reset
              </Button>
              <Button className="flex-1 bg-blue-600" type="submit">
                Schedule
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
