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
import { CalendarIcon, CheckIcon } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar.tsx";

type TCreateAppointmentSchema = z.infer<typeof ZCreateAppointmentSchema>;

interface ScheduleAppointmentDialogueProps {
  // onSubmit: (data: TCreateAppointmentSchema) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function ScheduleAppointmentDialogue({
  open,
  setOpen,
}: ScheduleAppointmentDialogueProps) {
  // const utils = trpc.useUtils();
  // const createAppointmentMutation = trpc.appointment.createOne.useMutation();
  // const [, setLocation] = useLocation();

  const [staffId, setStaffId] = useState<string | null>(null);
  const unfilteredStaffQuery = trpc.staff.getAll.useQuery();
  const unsortedStaffQuery = unfilteredStaffQuery.data
    ? unfilteredStaffQuery.data
    : [];
  const staffQuery = unsortedStaffQuery.sort(function (a, b) {
    const staffA = a.name.toUpperCase();
    const staffB = b.name.toUpperCase();
    return staffA < staffB ? -1 : staffA > staffB ? 1 : 0;
  });

  const form = useForm<TCreateAppointmentSchema>({
    resolver: zodResolver(ZCreateAppointmentSchema),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Schedule an appointment</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            // onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col justify-between items-stretch gap-4"
          >
            <FormField
              control={form.control}
              name="staff"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Select a doctor</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value
                            ? staffQuery.find((staff) => staff.id === staffId)
                                ?.name
                            : "Select staff"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search doctor..."
                          className="h-9"
                        />
                        <CommandEmpty>No doctors found.</CommandEmpty>
                        <CommandGroup>
                          {staffQuery.map((staff) => (
                            <CommandItem
                              value={staff.name}
                              key={staff.name}
                              onSelect={() => {
                                setStaffId(
                                  staff.id === staffId ? null : staff.id,
                                );
                                console.log(staffId);
                                console.log(field.value);
                              }}
                            >
                              {staff.name}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  staff.name === staffId
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
                    This is the doctor you will see on the day of your
                    appointment.
                  </FormDescription>
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
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 bg-white rounded-lg"
                      side="bottom"
                      align="center"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
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
