import { trpc } from "@/utils/trpc";
import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface UserComboBoxProps {
  handleUserChange: (value: string) => void;
}

export function UserComboBox({ handleUserChange }: UserComboBoxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const unfilteredStaffQuery = trpc.staff.getAll.useQuery();
  if (unfilteredStaffQuery.isLoading) {
    return <div>Loading...</div>;
  }
  const unsortedStaffQuery = unfilteredStaffQuery.data
    ? unfilteredStaffQuery.data
    : [];
  const staffQuery = unsortedStaffQuery.sort(function (a, b) {
    const staffA = a.name.toUpperCase();
    const staffB = b.name.toUpperCase();
    return staffA < staffB ? -1 : staffA > staffB ? 1 : 0;
  });

  const staff = staffQuery.map((staff) => ({
    value: staff.id,
    label: staff.name,
  }));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? staff.find((staff) => staff.value === value)?.label
            : "Select Staff..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search staff..." />
          <CommandEmpty>No staff found.</CommandEmpty>
          <CommandGroup>
            {staff.map((staff) => (
              <CommandItem
                key={staff.value}
                value={staff.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  handleUserChange(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === staff.value ? "opacity-100" : "opacity-0",
                  )}
                />
                {staff.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
