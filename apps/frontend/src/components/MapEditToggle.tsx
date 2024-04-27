import {
  Eraser,
  CirclePlus,
  MoveHorizontal,
  Move,
  Hand,
  SquareDashedMousePointer,
  Pencil,
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
        variant="outline"
        size={"lg"}
        type="single"
        defaultValue="Move"
      >
        <fieldset className="border border-gray-400/30 p-1 rounded-lg">
          <legend className="text-xs">Move</legend>
          <div className="pr-2  pl-2">
            <Tooltip>
              <TooltipTrigger className="bg-white/90 rounded-lg">
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
          </div>
        </fieldset>

        <fieldset className="border border-gray-400/30 p-1 rounded-lg">
          <legend className="text-xs">Both</legend>
          <div className="pr-2 pl-2">
            <Tooltip>
              <TooltipTrigger className="bg-white/90 rounded-lg">
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
              <TooltipTrigger className="bg-white/90 rounded-lg">
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
              <TooltipTrigger className="bg-white/90 rounded-lg">
                <ToggleGroupItem
                  value="Move"
                  aria-label="Move"
                  onClick={() => onEditSelect("Move")}
                >
                  <Move className="h-4 w-4" />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Edit Position</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </fieldset>

        <fieldset className="border border-gray-400/30 p-1 rounded-lg">
          <legend className="text-xs">Nodes</legend>
          <div className="pr-2 pl-2">
            <Tooltip>
              <TooltipTrigger className="bg-white/90 rounded-lg">
                <ToggleGroupItem
                  value="Edit"
                  aria-label="Edit"
                  onClick={() => onEditSelect("Edit")}
                >
                  <Pencil className="h-4 w-4" />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Edit Node</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger className="bg-white/90 rounded-lg">
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
          </div>
        </fieldset>

        <fieldset className="border border-gray-400/30 p-1 rounded-lg">
          <legend className="text-xs">Edges</legend>
          <div className="pr-2 pl-2">
            <Tooltip>
              <TooltipTrigger className="bg-white/90 rounded-lg">
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
          </div>
        </fieldset>
      </ToggleGroup>
    </TooltipProvider>
  );
}
