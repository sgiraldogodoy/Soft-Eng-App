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
    (node) => node.id === hoveredNode,
  )?.longName;
  let filteredNodes = nodes.filter((node) => node.floor === floor);
  if (!filter)
    filteredNodes = filteredNodes.filter((node) => node.type !== "HALL");

  return (
    <div>
      {filteredNodes.map((node, index) => (
        //Node Positioning
        <div
          key={index}
          style={{
            position: "absolute",
            left: scaleCoordinate(
              node.x,
              imgWidth,
              origImageWidth,
              0,
              dragOffset.x,
              scale,
            ),
            top: scaleCoordinate(
              node.y,
              imgHeight,
              origImageHeight,
              0,
              dragOffset.y,
              scale,
            ),
            width:
              node.id === hoveredNode
                ? "10px"
                : node.id === goalNode
                  ? "10px"
                  : node.id === startNode
                    ? "10px"
                    : "7px",
            height:
              node.id === hoveredNode
                ? "10px"
                : node.id === goalNode
                  ? "10px"
                  : node.id === startNode
                    ? "10px"
                    : "7px",
            backgroundColor:
              node.id === hoveredNode
                ? "cyan"
                : node.id === goalNode
                  ? "red"
                  : node.id === startNode
                    ? "blue"
                    : "black",
            borderRadius: "50%",
            transform: `translate(-50%, -50%) scale(${scale})`,
            cursor: "pointer",
          }}
          onMouseEnter={() => setHoveredNode(node.id)}
          onMouseLeave={() => setHoveredNode(null)}
          onClick={() => {
            if (onNodeClick) onNodeClick(node.id);
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
