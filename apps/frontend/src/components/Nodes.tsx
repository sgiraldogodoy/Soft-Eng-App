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
                ? "10px"
                : node.nodeId === goalNode
                  ? "10px"
                  : node.nodeId === startNode
                    ? "10px"
                    : "7px",
            height:
              node.nodeId === hoveredNode
                ? "10px"
                : node.nodeId === goalNode
                  ? "10px"
                  : node.nodeId === startNode
                    ? "10px"
                    : "7px",
            backgroundColor:
              node.nodeId === hoveredNode
                ? "cyan"
                : node.nodeId === goalNode
                  ? "red"
                  : node.nodeId === startNode
                    ? "blue"
                    : "black",
            borderRadius: "50%",
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
            top: 10,
            left: 10,
            backgroundColor: "white",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          Hovered ID: {hoveredNode}
        </div>
      )}
      {startNode && (
        <div
          style={{
            position: "absolute",
            top: 50,
            left: 10,
            backgroundColor: "white",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          Start ID: {startNode}
        </div>
      )}
      {goalNode && (
        <div
          style={{
            position: "absolute",
            top: 90,
            left: 10,
            backgroundColor: "white",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          Goal ID: {goalNode}
        </div>
      )}
    </div>
  );
}
