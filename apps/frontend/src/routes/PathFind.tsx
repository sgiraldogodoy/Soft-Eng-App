import { useState } from "react";
import { trpc } from "../utils/trpc.ts";
import { skipToken } from "@tanstack/react-query";
import Map from "../components/Map.tsx";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function PathFind() {
  const [startNode, setStartNode] = useState("");
  const [goalNode, setGoalNode] = useState("");
  const [isChecked, setChecked] = useState(false);

  const pathQuery = isChecked
    ? trpc.pathfinder.findPathAStar
    : trpc.pathfinder.findPathBFS;

  const path = pathQuery.useQuery(
    startNode && goalNode
      ? { startNodeId: startNode, endNodeId: goalNode }
      : skipToken,
  );
  const nodes = path.data;

  // let pathString = "Directions:";
  // if (nodes)
  //   if (nodes.length > 0)
  //     pathString =
  //       "Directions: " + nodes.map((Node) => Node.nodeId).join(" > ");
  //   else pathString = "Directions: No path found.";

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

  return (
    <div className="inputs">
      <h1 className="text-2xl flex items-center justify-center font-bold mb-4 w-5/6">
        Where would you like to go?
      </h1>

      <div className="flex flex-row items-end gap-4 justify-center w-5/6">
        <div className="w-1/2">
          {" "}
          {/* This div takes up 50% of the screen width */}
          <div className="flex flex-row gap-4 items-end">
            <div className="flex flex-col gap-2 flex-1">
              <label className="inline-block mb-4">Starting Room ID:</label>
              <Input
                type="text"
                id="startNode"
                name="startNode"
                value={startNode}
                onChange={(e) => setStartNode(e.target.value)}
                className="border border-gray-300 px-3 py-2 mb-4 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full"
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="inline-block mb-4">
                Room ID You Would Like Navigation To:
              </label>
              <Input
                type="text"
                id="goalNode"
                name="goalNode"
                value={goalNode}
                onChange={(e) => setGoalNode(e.target.value)}
                className="border border-gray-300 px-3 py-2 mb-4 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="w-5/6 flex items-center justify-center">
          <Map
            onNodeClick={handleNodeClickInApp}
            path={nodes}
            startNode={startNode}
          />
        </div>
        <div className="w-1/6 flex flex-col items-start justify-start">
          <label className="inline-block mb-4">Choose Algorithm:</label>
          <div className="flex flex-row gap-4 items-end">
            <label>BFS</label>
            <Switch checked={isChecked} onCheckedChange={setChecked} />
            <label>A*</label>
          </div>
        </div>
      </div>
    </div>
  );
}
