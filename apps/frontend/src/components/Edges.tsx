import React, { useState } from "react";
import { Node, Edge } from "database";
import { scaleCoordinate } from "../utils/scaleCoordinate";
import { trpc } from "@/utils/trpc";

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
  typeEdit?: string;
  editable?: boolean;
  onNodeDown?: () => void;
}

export function Edges({
  nodes,
  edges,
  onNodeDown,
  imgWidth,
  imgHeight,
  floor,
  dragOffset,
  scale,
  editable,
  typeEdit,
}: LineProps) {
  const [hoveredEdgeID, setHoveredEdge] = useState<string | null>(null); //set hovered node
  const [hoveredStartNode, setHoveredStartNode] = useState<string | null>(null);
  const [hoveredEndNode, setHoveredEndNode] = useState<string | null>(null);

  const utils = trpc.useUtils();
  const deleteEdge = trpc.edge.deleteOne.useMutation();
  const handleEdge = () => {
    if (onNodeDown) onNodeDown();
    if (!editable) return;
    if (typeEdit !== "Eraser") return;
    if (hoveredEdgeID) {
      if (hoveredStartNode && hoveredEndNode) {
        deleteEdge.mutate(
          {
            startNodeId: hoveredStartNode,
            endNodeId: hoveredEndNode,
          },
          {
            onSuccess: () => {
              utils.edge.getAll.invalidate();
            },
          },
        );
        deleteEdge.mutate(
          {
            startNodeId: hoveredEndNode,
            endNodeId: hoveredStartNode,
          },
          {
            onSuccess: () => {
              utils.edge.getAll.invalidate();
            },
          },
        );
      }
    }
  };

  if (!edges || edges.length < 2) return null; // At least two for path
  const filteredNode = nodes.filter((node) => node.floor === floor);
  const filteredNodeNodeId = filteredNode.map((node) => node.id);
  const filteredEdges = edges.filter(
    (edge) =>
      filteredNodeNodeId.includes(edge.startNodeId) &&
      filteredNodeNodeId.includes(edge.endNodeId),
  );

  return (
    <div>
      <svg
        width={imgWidth}
        height={imgHeight}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        {filteredEdges.map((edge, index) => {
          const startNode = filteredNode.find(
            (node) => node.id === edge.startNodeId,
          );
          const endNode = filteredNode.find(
            (node) => node.id === edge.endNodeId,
          );
          if (!startNode || !endNode) {
            return null;
          }
          return (
            <line
              key={index}
              x1={scaleCoordinate(
                startNode.x,
                imgWidth,
                origImageWidth,
                0,
                dragOffset.x,
                scale,
              )}
              y1={scaleCoordinate(
                startNode.y,
                imgHeight,
                origImageHeight,
                0,
                dragOffset.y,
                scale,
              )}
              x2={scaleCoordinate(
                endNode.x,
                imgWidth,
                origImageWidth,
                0,
                dragOffset.x,
                scale,
              )}
              y2={scaleCoordinate(
                endNode.y,
                imgHeight,
                origImageHeight,
                0,
                dragOffset.y,
                scale,
              )}
              onMouseEnter={() => {
                setHoveredEdge(`${edge.startNodeId}-${edge.endNodeId}`);
                setHoveredStartNode(edge.startNodeId);
                setHoveredEndNode(edge.endNodeId);
              }}
              onClick={handleEdge}
              onMouseLeave={() => setHoveredEdge(null)}
              style={{
                position: "absolute",
                stroke: "red",
                strokeWidth: 2 * scale,
                fill: "blue",
                cursor: "pointer",
              }}
            />
          );
        })}
      </svg>
      {hoveredEdgeID && (
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            backgroundColor: "white",
            padding: "5px",
            borderRadius: "5px",
            cursor: editable
              ? typeEdit === "Move"
                ? "move"
                : typeEdit === "Eraser"
                  ? 'url("/eraser.svg"), auto'
                  : "default"
              : "default",
          }}
          key={`edge-${hoveredEdgeID}`}
        >
          Edge ID: {hoveredEdgeID}
        </div>
      )}
    </div>
  );
}
