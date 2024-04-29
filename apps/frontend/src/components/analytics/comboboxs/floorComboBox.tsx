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

interface FloorComboBoxProps {
  handleUserChange: (value: string) => void;
}

const floor = [
  { value: "3", label: "Floor 3" },
  { value: "2", label: "Floor 2" },
  { value: "1", label: "Floor 1" },
  { value: "l1", label: "Floor L1" },
  { value: "l2", label: "Floor L2" },
];

export function FloorComboBox({ handleUserChange }: FloorComboBoxProps) {
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
            ? floor.find((floor) => floor.value === value)?.label
            : "Select Floor..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search floor..." />
          <CommandEmpty>No floor found.</CommandEmpty>
          <CommandGroup>
            {floor.map((floor) => (
              <CommandItem
                key={floor.value}
                value={floor.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  handleUserChange(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === floor.label ? "opacity-100" : "opacity-0",
                  )}
                />
                {floor.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
