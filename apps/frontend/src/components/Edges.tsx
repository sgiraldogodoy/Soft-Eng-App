import React, { useEffect, useState } from "react";
import { Node, Edge } from "database";
import {
  reverseScaleCoordinate,
  scaleCoordinate,
} from "../utils/scaleCoordinate";
import { trpc } from "@/utils/trpc";

const origImageWidth = 5000;
const origImageHeight = 3400;

interface EdgesProps {
  nodes: Node[];
  edges: Edge[];
  imgWidth: number;
  imgHeight: number;
  floor: string;
  dragOffset: { x: number; y: number };
  scale: number;
  typeEdit?: string;
  editable?: boolean;
  onNodeDown: () => void;
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
}: EdgesProps) {
  const [hoveredEdgeID, setHoveredEdge] = useState<string | null>(null); //set hovered node
  const [hoveredStartNode, setHoveredStartNode] = useState<string | null>(null);
  const [hoveredEndNode, setHoveredEndNode] = useState<string | null>(null);
  const [selectedNodes, setSelectedNodes] = useState<Node[] | null>(null);

  const utils = trpc.useUtils();
  const deleteEdge = trpc.edge.deleteOne.useMutation();
  const nodeUpdate = trpc.node.updateOne.useMutation();

  const handleEdge2NodeMove = (
    e: React.MouseEvent<SVGLineElement, MouseEvent>,
  ) => {
    const target = e.currentTarget;
    target.style.position = "absolute";
    const startX = e.clientX;
    const startY = e.clientY;

    const rect = target.getBoundingClientRect();

    const offSetX = e.clientX - rect.left;
    const offSetY = e.clientY - rect.top;
    console.log(offSetX, offSetY);
    const nodeData: { [key: string]: { x: number; y: number } } = {};
    const selectedNodesPositions: { [key: string]: { x: number; y: number } } =
      {};
    if (!selectedNodes) return;
    selectedNodes.forEach((node) => {
      const nodeElement = document.getElementById(node.id);
      if (nodeElement) {
        const rect = nodeElement.getBoundingClientRect();

        selectedNodesPositions[node.id] = {
          x: rect.left,
          y: rect.top,
        };

        nodeData[node.id] = {
          x: rect.left,
          y: rect.top,
        };
      }
    });

    const handleDrag = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      selectedNodes.forEach((node) => {
        const nodePosition = selectedNodesPositions[node.id];
        const newX = reverseScaleCoordinate(
          nodePosition.x + deltaX - offSetX,
          imgWidth,
          origImageWidth,
          0,
          dragOffset.x,
          scale,
        );
        const newY = reverseScaleCoordinate(
          nodePosition.y + deltaY - offSetY,
          imgHeight,
          origImageHeight,
          0,
          dragOffset.y,
          scale,
        );
        const nodeElement = document.getElementById(node.id);
        if (nodeElement) {
          nodeElement.style.left = nodePosition.x + deltaX - offSetX + "px";
          nodeElement.style.top = nodePosition.y + deltaY - offSetY + "px";
          // console.log(newX, newY);
          handleDragMove(newX, newY, node.id);
        }

        nodeData[node.id] = { x: newX, y: newY };
      });
    };

    const handleDragEnd = () => {
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", handleDragEnd);
      if (setSelectedNodes) setSelectedNodes(null);
      Object.entries(nodeData).forEach(([nodeId, { x, y }]) => {
        handleDragFinish(x, y, nodeId);
      });
    };

    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleDragEnd);
  };

  const handleDragStart = (e: React.MouseEvent<SVGLineElement, MouseEvent>) => {
    if (!hoveredEdgeID) return;
    if (selectedNodes && selectedNodes.length > 0) {
      handleEdge2NodeMove(e);
      return;
    }
  };

  const handleDragMove = (newX: number, newY: number, nodeId: string) => {
    utils.node.getAll.setData(undefined, (oldData) => {
      if (oldData) {
        return oldData.map((node) => {
          if (node.id === nodeId) return { ...node, x: newX, y: newY };
          return node;
        });
      } else return [];
    });
  };

  const handleDragFinish = (newX: number, newY: number, nodeId: string) => {
    if (!nodeId) return;
    // console.log(newX, newY);
    nodeUpdate.mutate({
      id: nodeId,
      data: { x: Math.floor(newX), y: Math.floor(newY) },
    });
  };

  const handleEdge = (e: React.MouseEvent<SVGLineElement, MouseEvent>) => {
    onNodeDown();
    if (!editable) return;
    if (typeEdit === "Move") {
      handleDragStart(e);
      return;
    }
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
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete") {
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
          }
        }
      }
    };

    document.body.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  });

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
                const selectedNodes = nodes.filter(
                  (node) =>
                    node.id === edge.startNodeId || node.id === edge.endNodeId,
                );
                setSelectedNodes(selectedNodes);
              }}
              onMouseDown={handleEdge}
              onMouseLeave={() => {
                setHoveredEdge(null);
                setSelectedNodes(null);
              }}
              style={{
                position: "absolute",
                stroke: "red",
                strokeWidth: 2 * scale,
                fill: "blue",
                cursor:
                  typeEdit === "Eraser"
                    ? "url('/eraser.svg') 12 18, auto"
                    : typeEdit === "Move"
                      ? "move"
                      : "pointer",
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
            cursor: 'url("/eraser.svg"), auto',
          }}
          key={`edge-${hoveredEdgeID}`}
        >
          Edge ID: {hoveredEdgeID}
        </div>
      )}
    </div>
  );
}
