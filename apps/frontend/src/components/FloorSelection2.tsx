import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";

interface FloorSelectionProps {
  onFloorClick: (clickedFloor: string, clickedForURL: string) => void;
}

export default function FloorSelection2({ onFloorClick }: FloorSelectionProps) {
  const [selectedFloor, setSelectedFloor] = useState("Floor 2");

  return (
    <div className="bg-white/90 backdrop-blur-md p-3 rounded-[15px]">
      <ToggleGroup
        size={"default"}
        type="single"
        orientation="vertical"
        className="flex flex-col"
        variant="outlinefilledfloor"
        value={selectedFloor}
        onValueChange={(value: string) => {
          if (!value) return;
          setSelectedFloor(value);
          switch (value) {
            case "Floor 3":
              onFloorClick("3", "/03_thethirdfloor.png");
              break;
            case "Floor 2":
              onFloorClick("2", "/02_thesecondfloor.png");
              break;
            case "Floor 1":
              onFloorClick("1", "/01_thefirstfloor.png");
              break;
            case "Floor L1":
              onFloorClick("L1", "/00_thelowerlevel1.png");
              break;
            case "Floor L2":
              onFloorClick("L2", "/00_thelowerlevel2.png");
              break;
            default:
              break;
          }
        }}
      >
        <ToggleGroupItem value="Floor 3" className="w-10 h-10">
          <span className="text-2xl">3</span>
        </ToggleGroupItem>
        <ToggleGroupItem value="Floor 2" className="w-10 h-10">
          <span className="text-2xl">2</span>
        </ToggleGroupItem>
        <ToggleGroupItem value="Floor 1" className="w-10 h-10">
          <span className="text-2xl">1</span>
        </ToggleGroupItem>
        <ToggleGroupItem value="Floor L1" className="w-10 h-10">
          <span className="text-2xl">L1</span>
        </ToggleGroupItem>
        <ToggleGroupItem value="Floor L2" className="w-10 h-10">
          <span className="text-2xl">L2</span>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
