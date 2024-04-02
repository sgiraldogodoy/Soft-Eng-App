import React, { useState } from "react";
import { Node } from "database";
import { scaleCoordinate } from "../utils/scaleCoordinate.ts";

const origImageWidth = 5000;
const origImageHeight = 3400;

interface NodesProps {
  onNodeClick: (nodeID: string) => void;
  nodes: Node[];
  imgWidth: number;
  imgHeight: number;
}

const Nodes = ({ onNodeClick, nodes, imgWidth, imgHeight }: NodesProps) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null); //set hovered node
  const [clickedNodeID, setClickedNodeID] = useState<string | null>(null); //set clicked node ID

  return (
    <div>
      {nodes.map((node, index) => (
        //Node Positioning
        <div
          key={index}
          style={{
            position: "absolute",
            left: scaleCoordinate(node.xcords, imgWidth, origImageWidth, 0),
            top: scaleCoordinate(node.ycords, imgHeight, origImageHeight, 0),
            width:
              node.nodeId === hoveredNode
                ? "10px"
                : node.nodeId === clickedNodeID
                  ? "8px"
                  : "5px",
            height:
              node.nodeId === hoveredNode
                ? "10px"
                : node.nodeId === clickedNodeID
                  ? "8px"
                  : "5px",
            backgroundColor:
              node.nodeId === hoveredNode
                ? "cyan"
                : node.nodeId === clickedNodeID
                  ? "red"
                  : "black",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            cursor: "pointer",
          }}
          onMouseEnter={() => setHoveredNode(node.nodeId)}
          onMouseLeave={() => setHoveredNode(null)}
          onClick={() => {
            setClickedNodeID(node.nodeId);
            onNodeClick(node.nodeId);
          }}
        />
      ))}
      {hoveredNode && (
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            backgroundColor: "cyan",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          Node ID: {hoveredNode}
        </div>
      )}
      {clickedNodeID && (
        <div
          style={{
            position: "absolute",
            top: 50,
            left: 10,
            backgroundColor: "red",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          Node ID: {clickedNodeID}
        </div>
      )}
    </div>
  );
};

export { Nodes };
