import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Node } from "database";
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
import { useEffect } from "react";

interface PickRoomForPathFindProps {
  // onSelect: (room: string) => void;
  Rooms: Node[] | undefined;
  onChange: (selectedNodeId: string) => void;
  selectedNode: string;
}

export function PathFindRoomSelection({
  Rooms,
  onChange,
  selectedNode,
}: PickRoomForPathFindProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  useEffect(() => {
    if (selectedNode) {
      setValue(selectedNode); // Set the combobox value to the selected node
    } else {
      setValue(""); // Reset the combobox to "Select Location"
    }
  }, [selectedNode]);

  if (!Rooms) {
    return <p>No rooms found</p>;
  }
  const filteredNodes = Rooms.filter((node) => node.nodeType !== "HALL");
  const frameworksUnSorted = filteredNodes.map((node) => ({
    label: node.longName.trim(),
    value: node.nodeId,
  }));
  const frameworks = frameworksUnSorted.sort((a, b) =>
    a.label.localeCompare(b.label),
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          <div
            style={{
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {value
              ? frameworks.find((framework) => framework.value === value)?.label
              : "Select Location"}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 max-h-96 overflow-y-auto ">
        <Command>
          <CommandInput placeholder="Select Location" />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={() => {
                  setValue(framework.value);
                  setOpen(false);
                  onChange(framework.value);
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
