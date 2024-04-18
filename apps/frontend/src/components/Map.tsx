import { useState, useRef, useEffect, useCallback } from "react";
import { Nodes } from "./Nodes.tsx";
import { Node, Edge } from "database";
import { Lines } from "./Lines.tsx";
import { Edges } from "../components/Edges.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import clsx from "clsx";
import { reverseScaleCoordinate } from "@/utils/scaleCoordinate.ts";
import { trpc } from "@/utils/trpc.ts";
import { NewNodeDialog } from "@/components/newNodeDialog.tsx";

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
  const [scale, setScale] = useState(1.2);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [startDragOffset, setStartDragOffset] = useState({ x: 0, y: 0 });
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

  const nodeDown = useCallback(() => {
    if (dragging) {
      setDragging(false);
    }
  }, [dragging]);

  useEffect(() => {
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

  const handleCreateNodeSubmit = (data: Node) => {
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

  return (
    <div
      className="relative h-full"
      ref={containerRef}
      style={{
        position: "relative",
        overflow: "hidden",
        cursor: dragging ? "grabbing" : "grab",
        userSelect: "none",
      }}
      onClick={handleEditClick}
    >
      <img
        ref={image}
        src={imgURL}
        alt="${imgURL} image"
        style={{
          transform: `scale(${scale}) translate(${offset.x}px, ${offset.y}px)`,
        }}
        onLoad={handleResize}
        className={clsx("inset-0 w-full overflow-hidden", {
          "h-full": isAuthenticated,
          "max-h-screen overflow-auto": !isAuthenticated,
        })}
      />
      <div className="absolute text-black font-bold text-2xl bottom-[20px] right-20">
        <p> Level {floor}</p>
      </div>
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
            setDialogOpen={setOpenDialog}
          />
        </div>
      )}
    </div>
  );
}
