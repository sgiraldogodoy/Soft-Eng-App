import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils.ts";
import { Button } from "@/components/ui/button.tsx";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";

interface AvailableComboBoxProps {
  handleUserChange: (value: string) => void;
}

const available = [
  { value: "available", label: "Available" },
  { value: "unavailable", label: "Unavailable" },
];

export function AvailableComboBox({
  handleUserChange,
}: AvailableComboBoxProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

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
            ? available.find((available) => available.value === value)?.label
            : "Select Available..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Available..." />
          <CommandEmpty>No available found.</CommandEmpty>
          <CommandGroup>
            {available.map((available) => (
              <CommandItem
                key={available.value}
                value={available.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  handleUserChange(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === available.value ? "opacity-100" : "opacity-0",
                  )}
                />
                {available.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
