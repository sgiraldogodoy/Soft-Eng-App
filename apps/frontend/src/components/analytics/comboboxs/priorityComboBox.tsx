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

interface PriorityComboBoxProps {
  handleUserChange: (value: string) => void;
}

const priority = [
  { value: "emergency", label: "Emergency" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

export function PriorityComboBox({ handleUserChange }: PriorityComboBoxProps) {
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
            ? priority.find((priority) => priority.value === value)?.label
            : "Select Priority..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Priority..." />
          <CommandEmpty>No priority found.</CommandEmpty>
          <CommandGroup>
            {priority.map((priority) => (
              <CommandItem
                key={priority.value}
                value={priority.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  handleUserChange(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === priority.value ? "opacity-100" : "opacity-0",
                  )}
                />
                {priority.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
