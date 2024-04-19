import {
  Eraser,
  CirclePlus,
  MoveHorizontal,
  Move,
  Hand,
  SquareDashedMousePointer,
  Settings,
} from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
  Tooltip,
} from "@/components/ui/tooltip";

interface MapEditTabProps {
  onEditSelect: (clickedEdit: string) => void;
}

export function MapEditTab({ onEditSelect }: MapEditTabProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <ToggleGroup
        variant="outlinefilled"
        size={"lg"}
        type="single"
        defaultValue="Hand"
      >
        <Tooltip>
          <TooltipTrigger>
            <ToggleGroupItem
              value="Pan"
              aria-label="Pan"
              onClick={() => onEditSelect("Pan")}
            >
              <Hand className="h-4 w-4" />
            </ToggleGroupItem>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Pan</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <ToggleGroupItem
              value="Sele"
              aria-label="Sele"
              onClick={() => onEditSelect("Sele")}
            >
              <SquareDashedMousePointer className="h-4 w-4" />
            </ToggleGroupItem>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Multi-Select</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <ToggleGroupItem
              value="Edit"
              aria-label="Edit"
              onClick={() => onEditSelect("Edit")}
            >
              <Settings className="h-4 w-4" />
            </ToggleGroupItem>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Edit Node</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <ToggleGroupItem
              value="Eraser"
              aria-label="Eraser"
              onClick={() => onEditSelect("Eraser")}
            >
              <Eraser className="h-4 w-4" />
            </ToggleGroupItem>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Eraser</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <ToggleGroupItem
              value="Move"
              aria-label="Move"
              onClick={() => onEditSelect("Move")}
            >
              <Move className="h-4 w-4" />
            </ToggleGroupItem>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Move Node</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <ToggleGroupItem
              value="aNode"
              aria-label="Add Node"
              onClick={() => onEditSelect("aNode")}
            >
              <CirclePlus className="h-4 w-4" />
            </ToggleGroupItem>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Add Node</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <ToggleGroupItem
              value="aEdge"
              aria-label="Add Edge"
              onClick={() => onEditSelect("aEdge")}
            >
              <MoveHorizontal className="h-4 w-4" />
            </ToggleGroupItem>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Add Edge</p>
          </TooltipContent>
        </Tooltip>
      </ToggleGroup>
    </TooltipProvider>
  );
}
