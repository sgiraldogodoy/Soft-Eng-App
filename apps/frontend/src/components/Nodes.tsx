import React, { useState } from "react";
import { Node } from "database";
import { scaleCoordinate } from "../utils/scaleCoordinate.ts";

const origImageWidth = 5000;
const origImageHeight = 3400;

interface NodesProps {
  onNodeClick?: (nodeID: string) => void;
  nodes: Node[];
  imgWidth: number;
  imgHeight: number;
  startNode?: string;
  goalNode?: string;
  floor: string;
  filter?: boolean;
  dragOffset: { x: number; y: number };
  scale: number;
}

export function Nodes({
  onNodeClick,
  nodes,
  imgWidth,
  imgHeight,
  startNode,
  goalNode,
  floor,
  filter,
  dragOffset,
  scale,
}: NodesProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null); //set hovered node
  const hoveredNodeString = nodes.find(
    (node) => node.nodeId === hoveredNode,
  )?.longName;
  let filteredNodes = nodes.filter((node) => node.floor === floor);
  if (!filter)
    filteredNodes = filteredNodes.filter((node) => node.nodeType !== "HALL");

  return (
    <div>
      {filteredNodes.map((node, index) => (
        //Node Positioning
        <div
          key={index}
          style={{
            position: "absolute",
            left: scaleCoordinate(
              node.xcords,
              imgWidth,
              origImageWidth,
              0,
              dragOffset.x,
              scale,
            ),
            top: scaleCoordinate(
              node.ycords,
              imgHeight,
              origImageHeight,
              0,
              dragOffset.y,
              scale,
            ),
            width:
              node.nodeId === hoveredNode
                ? "8px"
                : node.nodeId === goalNode
                  ? "8px"
                  : node.nodeId === startNode
                    ? "8px"
                    : "5px",
            height:
              node.nodeId === hoveredNode
                ? "8px"
                : node.nodeId === goalNode
                  ? "8px"
                  : node.nodeId === startNode
                    ? "8px"
                    : "5px",
            backgroundColor:
              node.nodeId === goalNode
                ? "red"
                : node.nodeId === startNode
                  ? "#003A96"
                  : "white",
            boxShadow:
              node.nodeId === hoveredNode
                ? "0 0 0 2px cyan" // Ring effect with cyan color when hovered
                : node.nodeId === goalNode
                  ? "0 0 0 2px red" // red when goal node
                  : node.nodeId === startNode
                    ? "0 0 0 2px #003A96" // blue when start
                    : "0 0 0 2px black", // Default black ring
            borderRadius: "100%",
            transform: `translate(-50%, -50%) scale(${scale})`,
            cursor: "pointer",
          }}
          onMouseEnter={() => setHoveredNode(node.nodeId)}
          onMouseLeave={() => setHoveredNode(null)}
          onClick={() => {
            if (onNodeClick) onNodeClick(node.nodeId);
          }}
        />
      ))}
      {hoveredNode && (
        <div
          style={{
            position: "absolute",
            top: 70,
            left: 10,
            backgroundColor: "white",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          Hovered ID: {hoveredNodeString}
        </div>
      )}
    </div>
  );
}
