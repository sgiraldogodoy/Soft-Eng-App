import { Eraser, CirclePlus, MoveHorizontal, Move } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface MapEditTabProps {
  onEditSelect: (clickedEdit: string) => void;
}

export function MapEditTab({ onEditSelect }: MapEditTabProps) {
  return (
    <ToggleGroup
      variant="outlinefilled"
      size={"lg"}
      type="single"
      defaultValue="Move"
    >
      <ToggleGroupItem
        value="Eraser"
        aria-label="Erase"
        onClick={() => onEditSelect("Eraser")}
      >
        <Eraser className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="Move"
        aria-label="Move"
        onClick={() => onEditSelect("Move")}
      >
        <Move className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="aNode"
        aria-label="Add Node"
        onClick={() => onEditSelect("aNode")}
      >
        <CirclePlus className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="aEdge"
        aria-label="Add Edge"
        onClick={() => onEditSelect("aEdge")}
      >
        <MoveHorizontal className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
