import React, { useState } from "react";
import { Node } from "database";
import {
  scaleCoordinate,
  reverseScaleCoordinate,
} from "../utils/scaleCoordinate.ts";

const origImageWidth = 5000;
const origImageHeight = 3400;

interface NodesProps {
  onNodeClick?: (nodeID: string) => void;
  onNodeDown?: () => void;
  nodes: Node[];
  imgWidth: number;
  imgHeight: number;
  startNode?: string;
  goalNode?: string;
  floor: string;
  filter?: boolean;
  dragOffset: { x: number; y: number };
  scale: number;
  editable?: boolean;
}

export function Nodes({
  onNodeClick,
  onNodeDown,
  nodes,
  imgWidth,
  imgHeight,
  startNode,
  goalNode,
  floor,
  filter,
  dragOffset,
  scale,
  editable,
}: NodesProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredNodeString, setHoveredNodeString] = useState<string | null>(
    null,
  );

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!editable) return; // check if on map edit
    if (onNodeDown) onNodeDown(); //turn off map panning
    const target = e.currentTarget;
    target.style.position = "absolute";
    const offsetX = e.clientX - parseFloat(target.style.left || "0");
    const offsetY = e.clientY - parseFloat(target.style.top || "0");

    const handleDrag = (e: MouseEvent) => {
      target.style.left = e.clientX - offsetX + "px";
      target.style.top = e.clientY - offsetY + "px";
      console.log(
        reverseScaleCoordinate(
          e.clientX - offsetX,
          imgWidth,
          origImageWidth,
          0,
          dragOffset.x,
          scale,
        ),
        reverseScaleCoordinate(
          e.clientY - offsetY,
          imgHeight,
          origImageHeight,
          0,
          dragOffset.y,
          scale,
        ),
      );
      console.log(e.clientX - offsetX, e.clientY - offsetY);
    };

    const handleDragEnd = () => {
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", handleDragEnd);
    };

    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleDragEnd);
  };

  let filteredNodes = nodes.filter((node) => node.floor === floor);
  if (!filter)
    filteredNodes = filteredNodes.filter((node) => node.nodeType !== "HALL");

  return (
    <div>
      {filteredNodes.map((node, index) => (
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
                ? "0 0 0 2px cyan"
                : node.nodeId === goalNode
                  ? "0 0 0 2px red"
                  : node.nodeId === startNode
                    ? "0 0 0 2px #003A96"
                    : "0 0 0 2px black",
            borderRadius: "100%",
            transform: `translate(-50%, -50%) scale(${scale})`,
            cursor: editable ? "move" : "default",
          }}
          onMouseEnter={() => {
            setHoveredNode(node.nodeId);
            setHoveredNodeString(node.longName);
          }}
          onMouseLeave={() => {
            setHoveredNode(null);
            setHoveredNodeString(null);
          }}
          onMouseDown={handleDragStart}
          onClick={() => {
            if (onNodeClick) onNodeClick(node.nodeId);
            if (onNodeDown) onNodeDown();
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
          Node Name: {hoveredNodeString}
          <br />
          Node ID: {hoveredNode}
        </div>
      )}
    </div>
  );
}
