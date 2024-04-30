import React, { useState, useRef, useEffect, useCallback } from "react";
import { Nodes } from "./Nodes.tsx";
import type { Node, Edge } from "database";
import { Lines } from "./Lines.tsx";
import { Edges } from "../components/Edges.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import clsx from "clsx";
import {
  reverseScaleCoordinate,
  scaleCoordinate,
} from "@/utils/scaleCoordinate.ts";
import { trpc } from "@/utils/trpc.ts";
import { NewNodeDialog } from "@/components/NewNodeDialog.tsx";
import { ZCreateNodeSchema as nodeSchema } from "common";
import { z } from "zod";

const newNodeSchema = nodeSchema.omit({ id: true });

const origImageWidth = 5000;
const origImageHeight = 3400;

interface MapProps {
  onNodeClick?: (clickedNode: string) => void;
  nodes: Node[] | undefined; // Change prop type
  path?: Node[] | undefined;
  edges?: Edge[] | undefined;
  startNode?: string;
  goalNode?: string;
  imgURL: string;
  floor: string;
  editable?: boolean;
  filter?: boolean;
  typeEdit?: string;
}

export default function Map({
  onNodeClick,
  nodes, // Access nodes directly from props
  path,
  startNode,
  goalNode,
  imgURL,
  floor,
  edges,
  editable,
  filter,
  typeEdit,
}: MapProps) {
  const [imgWidth, setImageWidth] = useState(0); //set image width
  const [imgHeight, setImageHeight] = useState(0); //set image height
  const image = useRef<HTMLImageElement>(null);
  const { isAuthenticated } = useAuth0();
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [startDragOffset, setStartDragOffset] = useState({ x: 0, y: 0 });
  const [selecting, setSelecting] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [endPos, setEndPos] = useState({ x: 0, y: 0 });
  const [selectedMultiNodes, setSelectedNodes] = useState<Node[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const createNode = trpc.node.createOne.useMutation();
  const utils = trpc.useUtils();

  const handleResize = useCallback(() => {
    setImageWidth(image.current!.getBoundingClientRect().width / scale);
    setImageHeight(image.current!.getBoundingClientRect().height / scale);
  }, [image, scale]);

  const [openDialog, setOpenDialog] = useState(false);
  const [newNodeX, setNewNodeX] = useState(0);
  const [newNodeY, setNewNodeY] = useState(0);

  function resetZoom() {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }

  const nodeDown = useCallback(() => {
    // if (dragging) {
    //   console.log("Setting drag to false");
    setDragging(false);
    // }
  }, []);

  useEffect(() => {
    if (typeEdit === "Sele") {
      return;
    }
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === image.current) {
          handleResize(); // Call handleResize for the image element
        }
      });
    });
    window.addEventListener("resize", handleResize);

    if (image.current) {
      resizeObserver.observe(image.current);
    }

    // Zooms the map on mouse scroll
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const scaleAdjustment = e.deltaY > 0 ? 0.95 : 1.05;
      const nextScale = Math.max(1, Math.min(scale * scaleAdjustment, 10));
      setScale(nextScale);

      // keeps the map focussed when zooming
      const limitX: number =
        ((imgWidth * nextScale) / 2 - imgWidth / 2) / nextScale;
      const limitY: number =
        ((imgHeight * nextScale) / 2 - imgHeight / 2) / nextScale;

      const adjustedX: number = Math.min(Math.max(offset.x, -limitX), limitX);
      const adjustedY: number = Math.min(Math.max(offset.y, -limitY), limitY);

      const newOffset = {
        x: adjustedX,
        y: adjustedY,
      };
      setOffset(newOffset);
    };

    // initializes panning when mouse is held down
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) {
        setDragging(true);
        const newOffset = {
          x: e.clientX - offset.x * scale,
          y: e.clientY - offset.y * scale,
        };
        setStartDragOffset(newOffset);

        e.preventDefault();
      }
    };

    // pans map when mouse is dragged while mouse button down
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging) return;
      const dx = (e.clientX - startDragOffset.x) / scale;
      const dy = (e.clientY - startDragOffset.y) / scale;

      // prevents the map from being panned off-screen
      const limitX: number = ((imgWidth * scale) / 2 - imgWidth / 2) / scale;
      const limitY: number = ((imgHeight * scale) / 2 - imgHeight / 2) / scale;

      const adjustedX: number = Math.min(Math.max(dx, -limitX), limitX);
      const adjustedY: number = Math.min(Math.max(dy, -limitY), limitY);

      const newOffset = {
        x: adjustedX,
        y: adjustedY,
      };
      setOffset(newOffset);
      const newStartOffset = {
        x: adjustedX != dx ? e.clientX - offset.x * scale : startDragOffset.x,
        y: adjustedY != dy ? e.clientY - offset.y * scale : startDragOffset.y,
      };
      setStartDragOffset(newStartOffset);
    };

    // ends panning when mouse button released
    const handleMouseUp = () => {
      if (dragging) {
        setDragging(false);
      }
    };

    // assign handlers to manipulate map
    const container = containerRef.current;
    container?.addEventListener("wheel", handleWheel);
    container?.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      container?.removeEventListener("wheel", handleWheel);
      container?.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    dragging,
    handleResize,
    imgHeight,
    imgWidth,
    offset.x,
    offset.y,
    scale,
    startDragOffset.x,
    startDragOffset.y,
    typeEdit,
  ]);

  const handleCreateNodeSubmit = (data: z.infer<typeof newNodeSchema>) => {
    createNode.mutate(
      {
        data,
      },
      {
        onSuccess: () => {
          utils.node.getAll.invalidate();
        },
      },
    );
    setOpenDialog(false);
  };
  const handleCreateNode = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    const offsetX = e.clientX - containerRect.left; // Mouse X coordinate relative to container
    const offsetY = e.clientY - containerRect.top; // Mouse Y coordinate relative to container

    const imageRect = image.current?.getBoundingClientRect();
    if (!imageRect) return;

    const newNodeX = reverseScaleCoordinate(
      offsetX,
      containerRect.width,
      origImageWidth,
      0,
      offset.x,
      scale,
    );
    const newNodeY = reverseScaleCoordinate(
      offsetY,
      containerRect.height,
      origImageHeight,
      0,
      offset.y,
      scale,
    );
    // console.log(newNodeX, newNodeY);
    setNewNodeX(Math.floor(newNodeX));
    setNewNodeY(Math.floor(newNodeY));
    setOpenDialog(true);
  };

  const handleEditClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (nodeDown) nodeDown(); // turn off map panning
    if (!editable) return; // check if on map edit
    switch (typeEdit) {
      case "aNode":
        handleCreateNode(e);
        return;
      case "Sele":
        handleMouseDownSele(e);
        return;
      default:
        return;
    }
  };

  const handleDialogClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation(); // Prevent click event propagation
  };

  if (!nodes) {
    return <p>No nodes found</p>;
  }

  const handleMouseDownSele = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (typeEdit !== "Sele") return;
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;
    const offsetX = e.clientX - containerRect.left;
    const offsetY = e.clientY - containerRect.top;

    if (!selecting) {
      setStartPos({ x: offsetX, y: offsetY });
      setEndPos({ x: offsetX, y: offsetY });
      setSelecting(true);
    } else {
      setSelecting(false);
      handleSelection();
    }
  };

  const handleMouseMoveSele = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (selecting && typeEdit === "Sele") {
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (!containerRect) return;
      const offsetX = e.clientX - containerRect.left;
      const offsetY = e.clientY - containerRect.top;
      setEndPos({ x: offsetX, y: offsetY });
    }
  };

  const handleSelection = () => {
    const selectedNodes = nodes.filter((node) => {
      const nodeX = scaleCoordinate(
        node.x,
        imgWidth,
        origImageWidth,
        0,
        offset.x,
        scale,
      );
      const nodeY = scaleCoordinate(
        node.y,
        imgHeight,
        origImageHeight,
        0,
        offset.y,
        scale,
      );
      return (
        nodeX >= Math.min(startPos.x, endPos.x) &&
        nodeX <= Math.max(startPos.x, endPos.x) &&
        nodeY >= Math.min(startPos.y, endPos.y) &&
        nodeY <= Math.max(startPos.y, endPos.y) &&
        node.floor === floor
      );
    });

    setSelectedNodes(selectedNodes);
  };

  const handleEscape = () => {
    setSelectedNodes([]);
  };

  return (
    <div
      className="relative h-full"
      ref={containerRef}
      id={"mapDiv"}
      style={{
        position: "relative",
        overflow: "hidden",
        cursor: dragging
          ? "grabbing"
          : typeEdit === "aNode"
            ? 'url("/circle-plus.svg") 12 12, auto'
            : typeEdit === "Sele"
              ? 'url("/plus.svg") 12 12, auto'
              : "grab",
        userSelect: "none",
      }}
      onClick={handleEditClick}
      onMouseMove={handleMouseMoveSele}
      onMouseDown={handleMouseDownSele}
      // onKeyDown={handleKeyDown}
    >
      <img
        ref={image}
        src={imgURL}
        alt="${imgURL} image"
        style={{
          transform: `scale(${scale}) translate(${offset.x}px, ${offset.y}px)`,
        }}
        onLoad={() => {
          handleResize();
          resetZoom();
        }}
        className={clsx("inset-0 w-full overflow-hidden", {
          "h-full": isAuthenticated,
          "max-h-screen overflow-auto": !isAuthenticated,
        })}
      />
      {edges && (
        <Edges
          imgWidth={imgWidth}
          imgHeight={imgHeight}
          nodes={nodes}
          edges={edges}
          floor={floor}
          dragOffset={offset}
          scale={scale}
          editable={editable}
          typeEdit={typeEdit}
          onNodeDown={nodeDown}
        />
      )}
      <Nodes
        imgWidth={imgWidth}
        imgHeight={imgHeight}
        onNodeClick={onNodeClick}
        onNodeDown={nodeDown}
        nodes={nodes}
        startNode={startNode}
        goalNode={goalNode}
        floor={floor}
        dragOffset={offset}
        scale={scale}
        editable={editable}
        filter={filter}
        typeEdit={typeEdit}
        path={path}
        selectedNodes={selectedMultiNodes}
        setSelectedNodes={handleEscape}
        map={document.getElementById("mapDiv") as HTMLElement}
      />
      {path && (
        <Lines
          imgWidth={imgWidth}
          imgHeight={imgHeight}
          nodes={nodes}
          path={path}
          dragOffset={offset}
          scale={scale}
          floor={floor}
        />
      )}
      {openDialog && (
        <div onClick={handleDialogClick}>
          <NewNodeDialog
            open={openDialog}
            x={newNodeX}
            y={newNodeY}
            floor={floor}
            onSubmit={handleCreateNodeSubmit}
            setOpenDialog={setOpenDialog}
          />
        </div>
      )}
      {selecting && typeEdit === "Sele" && (
        <div
          className="bg-black/10 absolute border border-black/20"
          style={{
            left: Math.min(startPos.x, endPos.x),
            top: Math.min(startPos.y, endPos.y),
            width: Math.abs(endPos.x - startPos.x),
            height: Math.abs(endPos.y - startPos.y),
          }}
        />
      )}
    </div>
  );
}
