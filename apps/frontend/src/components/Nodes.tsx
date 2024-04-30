import React, { useEffect, useState } from "react";
import type { Node, Prisma } from "database";
import {
  scaleCoordinate,
  reverseScaleCoordinate,
} from "../utils/scaleCoordinate.ts";
import { trpc } from "@/utils/trpc.ts";
import { useSelectNodes } from "@/utils/useSelectNodes.tsx";
import { EditNodeDialog } from "@/components/EditNodeDialog.tsx";
type NodeCreateInput = Prisma.NodeCreateInput;

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
  typeEdit?: string;
  selectedNodes?: Node[];
  setSelectedNodes?: () => void;
  path?: Node[];
  map: HTMLElement;
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
  typeEdit,
  selectedNodes,
  setSelectedNodes,
  path,
  map,
}: NodesProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredNodeString, setHoveredNodeString] = useState<string | null>(
    null,
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [nodeToEdit, setNodeToEdit] = useState<Node | null>(null);

  const utils = trpc.useUtils();
  const nodeUpdate = trpc.node.updateOne.useMutation();
  const deleteNode = trpc.node.deleteOne.useMutation();
  const createEdge = trpc.edge.createOne.useMutation();
  const deleteManyNodes = trpc.node.deleteMany.useMutation();

  const { firstNode, setNode, clearNodes } = useSelectNodes();

  const handleCreateEdge = () => {
    if (!hoveredNode) return;
    createEdge.mutate(
      {
        startNodeId: firstNode,
        endNodeId: hoveredNode,
      },
      {
        onSuccess: () => {
          utils.edge.getAll.invalidate();
        },
      },
    );
    clearNodes();
    return;
  };

  const handleDelete = () => {
    if (hoveredNode) {
      const nodeHovered = nodes.find((node) => node.id === hoveredNode);
      if (
        selectedNodes &&
        selectedNodes.length > 0 &&
        nodeHovered &&
        selectedNodes.includes(nodeHovered)
      ) {
        deleteManyNodes.mutate(
          {
            ids: selectedNodes.map((node) => node.id),
          },
          {
            onSuccess: () => {
              utils.node.getAll.invalidate();
            },
          },
        );
      } else {
        deleteNode.mutate(
          {
            id: hoveredNode,
          },
          {
            onSuccess: () => {
              utils.node.getAll.invalidate();
            },
          },
        );
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (selectedNodes && selectedNodes.length > 0) {
          deleteManyNodes.mutate(
            {
              ids: selectedNodes.map((node) => node.id),
            },
            {
              onSuccess: () => {
                utils.node.getAll.invalidate();
              },
            },
          );
        } else if (hoveredNode) {
          deleteNode.mutate(
            {
              id: hoveredNode,
            },
            {
              onSuccess: () => {
                utils.node.getAll.invalidate();
              },
            },
          );
        }
      } else if (e.key === "Escape" && setSelectedNodes) setSelectedNodes();
    };

    document.body.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleEditNode = () => {
    if (hoveredNode) {
      const editNode = nodes.find((node) => node.id === hoveredNode);
      if (editNode) {
        setNodeToEdit(editNode);
        setOpenDialog(true);
      }
    }
  };

  const handleEditNodeDelete = (nodeData: Node) => {
    deleteNode.mutate(
      {
        id: nodeData.id,
      },
      {
        onSuccess: () => {
          utils.node.getAll.invalidate();
        },
      },
    );
    setOpenDialog(false);
  };

  const handleEditNodeSubmit = (nodeData: NodeCreateInput, oldID: string) => {
    // console.log("Node Data: ", nodeData);
    nodeUpdate.mutate(
      {
        id: oldID,
        data: {
          id: nodeData.id,
          x: nodeData.x,
          y: nodeData.y,
          floor: nodeData.floor,
          building: nodeData.building,
          type: nodeData.type,
          longName: nodeData.longName,
          shortName: nodeData.shortName,
          available: nodeData.available,
        },
      },
      {
        onSuccess: () => {
          utils.node.getAll.invalidate();
        },
      },
    );
    setOpenDialog(false);
  };

  const handleRightClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (typeEdit === "aNode") return;
    e.preventDefault();
    if (onNodeDown) onNodeDown();
    if (!editable) return;
    if (hoveredNode) {
      setNode(hoveredNode);
    }
    handleEditNode();
  };

  const handleEditClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (onNodeDown) onNodeDown(); // turn off map panning
    if (!editable) return; // check if on map edit
    if (hoveredNode) {
      setNode(hoveredNode);
    }
    if (e.button === 2) return;
    // console.log("Type Edit: ", typeEdit);
    switch (typeEdit) {
      case "Move":
        handleDragStart(e);
        return;
      case "Eraser":
        handleDelete();
        return;
      case "aEdge":
        if (firstNode && hoveredNode && firstNode !== hoveredNode) {
          handleCreateEdge();
        }
        if (setSelectedNodes) {
          setSelectedNodes();
        }
        return;
      case "Edit":
        handleEditNode();
        if (setSelectedNodes) {
          setSelectedNodes();
        }
        return;
      default:
        return;
    }
  };

  const handleMultiMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.currentTarget;
    target.style.position = "absolute";
    const startX = e.clientX;
    const startY = e.clientY;
    const offSetX = e.clientX - parseFloat(target.style.left || "0");
    const offSetY = e.clientY - parseFloat(target.style.top || "0");
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
          handleDragMove(newX, newY, node.id);
        }
        nodeData[node.id] = { x: newX, y: newY };
      });
    };

    const handleDragEnd = () => {
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", handleDragEnd);
      if (setSelectedNodes) setSelectedNodes();
      Object.entries(nodeData).forEach(([nodeId, { x, y }]) => {
        handleDragFinish(x, y, nodeId);
      });
    };

    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleDragEnd);
  };

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!hoveredNode) return;
    if (
      selectedNodes &&
      selectedNodes.length > 0 &&
      selectedNodes.some((node) => node.id === hoveredNode)
    ) {
      handleMultiMove(e);
      return;
    }
    const target = e.currentTarget;
    target.style.position = "absolute";
    const offsetX = e.clientX - parseFloat(target.style.left || "0");
    const offsetY = e.clientY - parseFloat(target.style.top || "0");
    console.log(offsetX, offsetY);
    let newX = 0;
    let newY = 0;

    const handleDrag = (e: MouseEvent) => {
      target.style.left = e.clientX - offsetX + "px";
      target.style.top = e.clientY - offsetY + "px";
      newX = reverseScaleCoordinate(
        e.clientX - offsetX,
        imgWidth,
        origImageWidth,
        0,
        dragOffset.x,
        scale,
      );
      newY = reverseScaleCoordinate(
        e.clientY - offsetY,
        imgHeight,
        origImageHeight,
        0,
        dragOffset.y,
        scale,
      );
      handleDragMove(newX, newY, hoveredNode);
      handlePan(e);
    };

    const handleDragEnd = () => {
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", handleDragEnd);
      handleDragFinish(newX, newY, hoveredNode);
    };

    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleDragEnd);
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

  const handlePan = (e: MouseEvent) => {
    const rect = map.getBoundingClientRect();
    const marginX = rect.width * 0.2;
    const marginY = rect.height * 0.2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    if (mouseX <= rect.left + marginX) {
      dragOffset.x += 10 * ((marginX - (mouseX - rect.left)) / marginX);
    } else if (mouseX >= rect.right - marginX) {
      dragOffset.x -= 10 * ((marginX - (rect.right - mouseX)) / marginX);
    }
    if (mouseY <= rect.top + marginY) {
      dragOffset.y += 10 * ((marginY - (mouseY - rect.top)) / marginY);
    } else if (mouseY >= rect.bottom - marginY) {
      dragOffset.y -= 10 * ((marginY - (rect.bottom - mouseY)) / marginY);
    }
  };

  let filteredNodes = nodes.filter((node) => node.floor === floor);
  if (!filter)
    filteredNodes = filteredNodes.filter((node) => node.type !== "HALL");
  if (path && path.length > 0) {
    filteredNodes = filteredNodes.filter(
      (node) =>
        !path.some((p) => p.id === node.id) ||
        node.id === goalNode ||
        node.id === startNode,
    );
  }

  return (
    <div>
      {filteredNodes.map((node, index) => (
        <div
          key={index}
          id={node.id}
          // tabIndex={0}
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
                ? "8px"
                : node.id === goalNode
                  ? "8px"
                  : node.id === startNode
                    ? "8px"
                    : selectedNodes && selectedNodes.includes(node)
                      ? "8px"
                      : "5px",
            height:
              node.id === hoveredNode
                ? "8px"
                : node.id === goalNode
                  ? "8px"
                  : node.id === startNode
                    ? "8px"
                    : selectedNodes && selectedNodes.includes(node)
                      ? "8px"
                      : "5px",
            backgroundColor:
              node.id === goalNode
                ? "red"
                : node.id === startNode
                  ? "#003A96"
                  : selectedNodes && selectedNodes.includes(node)
                    ? "darkgray"
                    : "white",
            boxShadow:
              node.id === hoveredNode
                ? "0 0 0 2px cyan"
                : node.id === goalNode
                  ? "0 0 0 2px red"
                  : node.id === startNode
                    ? "0 0 0 2px #003A96"
                    : selectedNodes && selectedNodes.includes(node)
                      ? "0 0 0 2px black"
                      : "0 0 0 2px black",
            borderRadius: "100%",
            transform: `translate(-50%, -50%) scale(${scale})`,
            cursor: editable
              ? typeEdit === "Move"
                ? "move"
                : typeEdit === "Eraser"
                  ? 'url("/eraser.svg") 12 12, auto'
                  : "default"
              : "default",
          }}
          onMouseEnter={() => {
            setHoveredNode(node.id);
            setHoveredNodeString(node.longName);
          }}
          onMouseLeave={() => {
            setHoveredNode(null);
            setHoveredNodeString(null);
          }}
          onContextMenu={handleRightClick}
          onMouseDown={handleEditClick}
          // onKeyDown={handleDeleteKey}
          onClick={() => {
            if (onNodeClick) onNodeClick(node.id);
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
      {openDialog && nodeToEdit && (
        <div>
          <EditNodeDialog
            open={openDialog}
            node={nodeToEdit}
            handleDelete={handleEditNodeDelete}
            onSubmit={handleEditNodeSubmit}
            setOpenDialog={setOpenDialog}
          />
        </div>
      )}
    </div>
  );
}
