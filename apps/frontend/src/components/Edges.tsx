import React from "react";
import { Node, Edge } from "database";
import { scaleCoordinate } from "../utils/scaleCoordinate";

const origImageWidth = 5000;
const origImageHeight = 3400;

interface LineProps {
  nodes: Node[];
  edges: Edge[];
  imgWidth: number;
  imgHeight: number;
  floor: string;
  dragOffset: { x: number; y: number };
  scale: number;
}

export function Edges({
  nodes,
  edges,
  imgWidth,
  imgHeight,
  floor,
  dragOffset,
  scale,
}: LineProps) {
  if (!edges || edges.length < 2) return null; // At least two for path
  const filteredNode = nodes.filter((node) => node.floor === floor);
  const filteredNodeNodeId = filteredNode.map((node) => node.id);
  const filteredEdges = edges.filter(
    (edge) =>
      filteredNodeNodeId.includes(edge.startNodeId) &&
      filteredNodeNodeId.includes(edge.endNodeId),
  );
  //Draw the lines by going through the filteredEdges to find two nodeIds and then draw a line between them
  // Construct the path string
  const path = filteredEdges
    .map((edge) => {
      const startNode = filteredNode.find(
        (node) => node.id === edge.startNodeId,
      );
      const endNode = filteredNode.find((node) => node.id === edge.endNodeId);

      if (!startNode || !endNode) {
        return "";
      }
      // Construct the path string directly from edge coordinates
      return `M${scaleCoordinate(startNode.x, imgWidth, origImageWidth, 0, dragOffset.x, scale)},${scaleCoordinate(startNode.y, imgHeight, origImageHeight, 0, dragOffset.y, scale)} 
        L${scaleCoordinate(endNode.x, imgWidth, origImageWidth, 0, dragOffset.x, scale)},${scaleCoordinate(endNode.y, imgHeight, origImageHeight, 0, dragOffset.y, scale)}`;
    })
    .join(" ");

  return (
    <svg
      width={imgWidth}
      height={imgHeight}
      style={{ position: "absolute", top: 0, left: 0 }}
    >
      <path
        d={path}
        style={{
          stroke: "red",
          strokeWidth: 2 * scale,
          fill: "none",
        }}
      ></path>
    </svg>
  );
}
