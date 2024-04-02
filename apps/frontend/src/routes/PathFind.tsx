import { useState } from "react";
import { trpc } from "../utils/trpc.ts";
import { skipToken } from "@tanstack/react-query";
import Map from "../components/Map.tsx";
//import {Nodes} from "../components/Nodes.tsx";

export default function PathFind() {
  const [startNode, setStartNode] = useState("");
  const [goalNode, setGoalNode] = useState("");

  const path = trpc.pathfinder.findPathBFS.useQuery(
    startNode && goalNode
      ? { startNodeId: startNode, endNodeId: goalNode }
      : skipToken,
  );
  const nodes = path.data;
  let pathString = "";
  if (nodes)
    pathString = "Path found: " + nodes.map((Node) => Node.nodeId).join(" > ");

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
      <h1>Where would you like to go?</h1>
      <label>Starting Room ID:</label>
      <input
        type="text"
        id="startNode"
        name="startNode"
        value={startNode}
        onChange={(e) => setStartNode(e.target.value)}
      />
      <label>Room ID You Would Like Navigation To:</label>
      <input
        type="text"
        id="goalNode"
        name="goalNode"
        value={goalNode}
        onChange={(e) => setGoalNode(e.target.value)}
      />
      <div id="pathResult">{pathString}</div>

      <Map onNodeClick={handleNodeClickInApp} path={nodes} />
    </div>
  );
}
