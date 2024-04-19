import React, { useState } from "react";
import { Node } from "database";
import {
  scaleCoordinate,
  reverseScaleCoordinate,
} from "../utils/scaleCoordinate.ts";
import { trpc } from "@/utils/trpc.ts";
import { useSelectNodes } from "@/utils/useSelectNodes.tsx";
import { EditNodeDialog } from "@/components/EditNodeDialog.tsx";

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

  const { firstNode, setNode, clearNodes } = useSelectNodes();

  const handleCreateEdge = () => {
    if (!hoveredNode) return;
    createEdge.mutate(
      {
        data: {
          startNodeId: firstNode,
          endNodeId: hoveredNode,
        },
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
  };

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

  const handleEditNodeSubmit = (nodeData: Node, oldID: string) => {
    // console.log("Node Data: ", nodeData);
    nodeUpdate.mutate({
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
      },
    });
    setOpenDialog(false);
  };

  const handleRightClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
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
        if (firstNode && hoveredNode && firstNode !== hoveredNode)
          handleCreateEdge();
        return;
      case "Edit":
        handleEditNode();
        return;
      default:
        return;
    }
  };

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.currentTarget;
    target.style.position = "absolute";
    const offsetX = e.clientX - parseFloat(target.style.left || "0");
    const offsetY = e.clientY - parseFloat(target.style.top || "0");
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
      handleDragMove(newX, newY);
    };

    const handleDragEnd = () => {
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", handleDragEnd);
      handleDragFinish(newX, newY);
    };

    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleDragEnd);
  };

  const handleDragMove = (newX: number, newY: number) => {
    utils.node.getAll.setData(undefined, (oldData) => {
      if (oldData) {
        return oldData.map((node) => {
          if (node.id === hoveredNode) return { ...node, x: newX, y: newY };
          return node;
        });
      } else return [];
    });
  };

  const handleDragFinish = (newX: number, newY: number) => {
    if (!hoveredNode) return;
    // console.log(newX, newY);
    nodeUpdate.mutate({
      id: hoveredNode,
      data: { x: Math.floor(newX), y: Math.floor(newY) },
    });
  };

  let filteredNodes = nodes.filter((node) => node.floor === floor);
  if (!filter)
    filteredNodes = filteredNodes.filter((node) => node.type !== "HALL");

  return (
    <div>
      {filteredNodes.map((node, index) => (
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
                ? "8px"
                : node.id === goalNode
                  ? "8px"
                  : node.id === startNode
                    ? "8px"
                    : "5px",
            height:
              node.id === hoveredNode
                ? "8px"
                : node.id === goalNode
                  ? "8px"
                  : node.id === startNode
                    ? "8px"
                    : "5px",
            backgroundColor:
              node.id === goalNode
                ? "red"
                : node.id === startNode
                  ? "#003A96"
                  : "white",
            boxShadow:
              node.id === hoveredNode
                ? "0 0 0 2px cyan"
                : node.id === goalNode
                  ? "0 0 0 2px red"
                  : node.id === startNode
                    ? "0 0 0 2px #003A96"
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
            setDialogOpen={setOpenDialog}
          />
        </div>
      )}
    </div>
  );
}
