import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface FloorSelectionProps {
  onFloorClick: (clickedFloor: string, clickedForURL: string) => void;
}

export default function FloorSelection2({ onFloorClick }: FloorSelectionProps) {
  return (
    <>
      <div className="bg-white/90 backdrop-blur-md p-4 rounded-[20px]">
        <ToggleGroup
          size={"lg"}
          type="single"
          orientation="vertical"
          className="flex flex-col"
          variant="outlinefilledfloor"
        >
          <ToggleGroupItem
            value="Floor 3"
            onClick={() => onFloorClick("3", "/03_thethirdfloor.png")}
            className="w-14 h-14"
          >
            <span className="text-3xl">3</span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="Floor 2"
            onClick={() => onFloorClick("2", "/02_thesecondfloor.png")}
            className="w-14 h-14"
          >
            <span className="text-3xl">2</span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="Floor 1"
            onClick={() => onFloorClick("3", "/01_thefirstfloor.png")}
            className="w-14 h-14"
          >
            <span className="text-3xl">1</span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="Floor L1"
            onClick={() => onFloorClick("L1", "/00_thelowerlevel1.png")}
            className="w-14 h-14"
          >
            <span className="text-3xl">L1</span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="Floor L2"
            onClick={() => onFloorClick("L2", "/00_thelowerlevel2.png")}
            className="w-14 h-14"
          >
            <span className="text-3xl">L2</span>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </>
  );
}
