import {useCallback, useState} from "react";
import { trpc } from "../utils/trpc.ts";
import { skipToken } from "@tanstack/react-query";
import Map from "../components/Map.tsx";
import { Settings2, Plus, Layers, Minus } from "lucide-react";
import { PFAutoComplete } from "@/components/pfAutoComplete.tsx";
import FloorSelection from "@/components/FloorSelection.tsx";
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@/components/ui/popover"

export default function NewPathFind() {
  const [startNode, setStartNode] = useState("");
  const [goalNode, setGoalNode] = useState("");
  const [imgUrl, setImgUrl] = useState("/00_thelowerlevel1.png");
  const [floor, setFloor] = useState("L1");
  const nodesQuery = trpc.db.getAllNodes.useQuery();

  if (nodesQuery.isError) {
    console.log("Error in nodesQuery");
  }
  if (nodesQuery.isLoading) {
    console.log("Nodes are loading");
  }

  const pathQuery = trpc.pathfinder.findPath;
  const path = pathQuery.useQuery(
    startNode && goalNode
      ? { startNodeId: startNode, endNodeId: goalNode, algorithm: "A*" }
      : skipToken,
  );
  const pathData = path.data;

  const handleNodeClickInApp = (clickedNode: string) => {
    if (startNode && goalNode) {
      setStartNode(clickedNode);
      setGoalNode("");
    } else if (!startNode) {
      setStartNode(clickedNode);
    } else if (!goalNode) {
      setGoalNode(clickedNode);
    }
  };

    const handleFloorClick = useCallback((clickedFloor: string, clickedForURL: string) => {
        setImgUrl(clickedForURL);
        setFloor(clickedFloor);
    }, [setImgUrl, setFloor]);

  return (
    <div className="relative h-full">
      <Map
        onNodeClick={handleNodeClickInApp}
        nodes={nodesQuery.data}
        path={pathData}
        startNode={startNode}
        goalNode={goalNode}
        imgURL={imgUrl}
        floor={floor}
      />

      <div className="absolute backdrop-blur-[4px] bg-white/30 top-12 left-1/2 transform -translate-x-1/2 rounded-[100px]">
        <PFAutoComplete
          Rooms={nodesQuery.data}
          onChange={(e) => setGoalNode(e)}
          selectedNode={goalNode}
        />
      </div>
      <div className="absolute flex gap-5 bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="flex backdrop-blur-[4px] bg-white/30 gap-5 px-[30px] py-[23px] rounded-[100px]">
          <Layers className="cursor-pointer" />
          <Settings2 className="cursor-pointer" />
        </div>
        <div className="flex backdrop-blur-xl bg-white/30 gap-5 px-[30px] py-[23px] rounded-[100px]">
          <Plus className="cursor-pointer" />
          <Minus className="cursor-pointer" />
        </div>
      </div>
        <div className="absolute flex items-center gap-[35px] text-xl font-bold bottom-12 right-32">
            <div className="flex flex-col gap-[15px]">
                <h2>3</h2>
                <h2>2</h2>
                <h2>1</h2>
                <h2>L2</h2>
                <h2>L1</h2>
            </div>
            <FloorSelection onFloorClick={handleFloorClick}/>
        </div>

    </div>
  );
}
