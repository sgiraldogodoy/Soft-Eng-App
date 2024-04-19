import { AutoComplete, type Option } from "./ui/autocomplete.tsx";
import { useState } from "react";
import { Node } from "database";

interface FrameworkProps {
  Rooms: Node[] | undefined;
  onChange: (selectedNodeId: string) => void;
  selectedNode: string;
  placeholder: string;
}

export function EndNodeAutocomlete({
  Rooms,
  onChange,
  selectedNode,
  placeholder,
}: FrameworkProps) {
  const [value, setValue] = useState<Option>();

  if (!Rooms) {
    return <p>No rooms found</p>;
  }

  const longName = Rooms.find((node) => node.id === selectedNode)?.longName;

  const removedHall = Rooms.filter((node) => !(node.type === "HALL"));

  const unsortedRooms = removedHall.map((node) => ({
    label: node.longName.trim(),
    value: node.id,
  }));
  const rooms = unsortedRooms.sort((a, b) => a.label.localeCompare(b.label));

  return (
    <AutoComplete
      options={rooms}
      emptyMessage="No results."
      placeholder={placeholder}
      onValueChange={setValue}
      value={value}
      onChange={onChange}
      selectedNode={longName}
    />
  );
}
