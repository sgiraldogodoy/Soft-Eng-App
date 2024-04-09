import { AutoComplete, type Option } from "./ui/autocomplete.tsx";
import { useState } from "react";
import { Node } from "database";

interface FrameworkProps {
  Rooms: Node[] | undefined;
  onChange: (selectedNodeId: string) => void;
  selectedNode: string;
}

export function PFAutoComplete({
  Rooms,
  onChange,
  selectedNode,
}: FrameworkProps) {
  const [value, setValue] = useState<Option>();

  if (!Rooms) {
    return <p>No rooms found</p>;
  }

  const unsortedRooms = Rooms.map((node) => ({
    label: node.longName.trim(),
    value: node.nodeId,
  }));
  const rooms = unsortedRooms.sort((a, b) => a.label.localeCompare(b.label));

  return (
    <AutoComplete
      options={rooms}
      emptyMessage="No results."
      placeholder="Where to?"
      onValueChange={setValue}
      value={value}
      onChange={onChange}
      selectedNode={selectedNode}
    />
  );
}
