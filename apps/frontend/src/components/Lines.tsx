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
  dragOffset: { x: number; y: number };
  scale: number;
}

export function Lines({
  nodes,
  path,
  imgWidth,
  imgHeight,
  dragOffset,
  scale,
}: LineProps) {
  if (!path || path.length < 2) return null; // At least two for path

  // Calculate total length of the path to dynamically animate the path
  let totalLength = 0;
  for (let i = 1; i < path.length; i++) {
    const currentNode = nodes.find((n) => n.nodeId === path[i].nodeId);
    const prevNode = nodes.find((n) => n.nodeId === path[i - 1].nodeId);
    if (currentNode && prevNode) {
      totalLength += Math.sqrt(
        Math.pow(currentNode.xcords - prevNode.xcords, 2) +
          Math.pow(currentNode.ycords - prevNode.ycords, 2),
      );
    }
  }

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
          dragOffset.x,
          scale,
        )} ${scaleCoordinate(
          currentNode.ycords,
          imgHeight,
          origImageHeight,
          0,
          dragOffset.y,
          scale,
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
        style={{
          stroke: "red",
          strokeWidth: 2 * scale,
          fill: "none",
          strokeDasharray: 5 * scale,
        }}
      >
        <animate
          attributeName="stroke-dashoffset"
          from="0"
          to={-totalLength * scale}
          dur={`${totalLength / 18}s`} // Speed
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}
