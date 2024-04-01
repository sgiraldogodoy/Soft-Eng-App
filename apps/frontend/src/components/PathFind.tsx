import "./PathFind.css";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ImageWithNodes } from "./ImageNodes.tsx";
import { Node } from "database";
import { trpc } from "../utils/trpc.ts";

/**
 * getPath function that finds the path between two nodes
 * @param startNodeString nodeID string of start node for BFS
 * @param goalNodeString nodeID string of end node for BFS
 */
function getPath(startNodeString: string, goalNodeString: string) {
  //BFS for path
  const path: Node[] = trpc.pathfinder.findPathBFS.useQuery({
    startNodeId: startNodeString,
    endNodeId: goalNodeString,
  }); //give two inputs

  //If no path found, print no path found
  if (path.length === 0) {
    return "No path found.";
  }

  //Else print the path
  return path;
}

const PathComp = () => {
  const [startNode, setStartNode] = useState("");
  const [goalNode, setGoalNode] = useState("");
  const [pathResult, setPathResult] = useState("");
  const [path, setPath] = useState<Node[]>([]); //set nodes

  /**
   * handleFindPath function that finds the path between two nodes
   */
  const handleFindPath = () => {
    const result = getPath(startNode, goalNode);
    if (typeof result !== "string") {
      setPath(result);
      const pathString =
        "Path found: " + result.map((node) => node.nodeId).join(" > ");
      setPathResult(pathString);
    } else {
      setPathResult(result);
    }
  };

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
      <br></br>
      <label>Starting Room ID:</label>
      <input
        type="text"
        id="startNode"
        name="startNode"
        value={startNode}
        onChange={(e) => setStartNode(e.target.value)}
      />
      <br></br>
      <br></br>
      <label>Room ID You Would Like Navigation To:</label>
      <input
        type="text"
        id="goalNode"
        name="goalNode"
        value={goalNode}
        onChange={(e) => setGoalNode(e.target.value)}
      />
      <br></br>
      <br></br>
      <button onClick={handleFindPath}>Find Path</button>
      <br />
      <br />
      <div id="pathResult">{pathResult}</div>
      <ImageWithNodes onNodeClick={handleNodeClickInApp} path={path} />
    </div>
  );
};

//Render the PathComp component then render the ImageWithNodes component in App
ReactDOM.render(<PathComp />, document.getElementById("root"));
