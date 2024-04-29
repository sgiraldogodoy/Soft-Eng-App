import React, { useState } from "react";
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

interface NodeComboBoxProps {
  frameworks: { label: string; value: string }[];
  onValueChange?: (value: string) => void;
}

export function NodeCombobox({ frameworks, onValueChange }: NodeComboBoxProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  //console.log(value, frameworks.find((framework) => framework.value.toLowerCase() === value)?.label);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <div className="flex items-center justify-between w-full overflow-hidden">
            <div className="overflow-hidden truncate">
              {value
                ? frameworks.find(
                    (framework) => framework.value.toLowerCase() === value,
                  )?.label
                : "Select Node..."}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-max-[80%] p-0 overflow-y-auto max-h-[40vh]">
        <Command>
          <CommandInput placeholder="Search nodes..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                  onValueChange?.(currentValue === value ? "" : currentValue);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0",
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
