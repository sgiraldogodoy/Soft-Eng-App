import React from "react";
import { Node } from "database";
import { scaleCoordinate } from "../utils/scaleCoordinate";

const origImageWidth = 5000;
const origImageHeight = 3400;

interface LineProps {
  path: Node[];
  nodes: Node[];
  imgWidth: number;
  imgHeight: number;
}

export function Lines({ nodes, path, imgWidth, imgHeight }: LineProps) {
  if (!path || path.length < 2) return null; // Path must have at least two nodes to draw lines

  // Construct the path string
  const pathString = path
    .map((node, index) => {
      const currentNode = nodes.find((n) => n.nodeId === node.nodeId);
      if (currentNode) {
        return `${index === 0 ? "M" : "L"} ${scaleCoordinate(
          currentNode.xcords,
          imgWidth,
          origImageWidth,
          0,
        )} ${scaleCoordinate(
          currentNode.ycords,
          imgHeight,
          origImageHeight,
          0,
        )}`;
      }
      return "";
    })
    .join(" ");

  return (
    <svg
      width={imgWidth}
      height={imgHeight}
      style={{ position: "absolute", top: 0, left: 0 }}
      className="pointer-events-none"
    >
      <path
        d={pathString}
        style={{ stroke: "red", strokeWidth: 2, fill: "none" }}
      />
    </svg>
  );
}
