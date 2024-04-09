import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Node } from "database";
// import PathFindRoomSelection from "@/components/PickRoomForPathFind.tsx";

type PathfindSettingsProps = {
  Rooms: Node[] | undefined;
  onAlgorithmSelect: (clickedAlgorithm: string) => void;
  algorithm: string;
  startNode: string;
  onStartNodeSelect: (selectedNode: string) => void;
};

export default function PathfindSettings({
  Rooms,
  algorithm,
  onAlgorithmSelect,
  startNode,
  onStartNodeSelect,
}: PathfindSettingsProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (startNode) {
      setValue(startNode); // Set the combobox value to the selected node
    } else {
      setValue(""); // Reset the combobox to "Select Location"
    }
  }, [startNode]);

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
    <div className="flex flex-col justify-start gap-8">
      <div className="flex flex-col gap-3">
        <p>Select your preferred algorithm:</p>
        <Select onValueChange={onAlgorithmSelect} value={algorithm}>
          <SelectTrigger>
            <SelectValue placeholder="Select an algorithm" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="A*">A*</SelectItem>
            <SelectItem value="BFS">Breadth First Search</SelectItem>
            <SelectItem value="DFS">Depth First Search</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-3">
        <p>Set a default starting node:</p>
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
                  ? frameworks.find((framework) => framework.value === value)
                      ?.label
                  : "Select Location"}
              </div>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0 max-h-96 overflow-y-auto ">
            <Command>
              <CommandInput placeholder="Select Location" />
              <CommandEmpty>No location found.</CommandEmpty>
              <CommandGroup>
                {frameworks.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={() => {
                      setValue(framework.value);
                      setOpen(false);
                      onStartNodeSelect(framework.value);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4 flex-shrink-0",
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
      </div>
    </div>
  );
}
