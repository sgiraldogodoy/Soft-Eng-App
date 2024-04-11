import { useState, useRef, useEffect, useCallback } from "react";
import { Nodes } from "./Nodes.tsx";
import { Node } from "database";
import { Lines } from "./Lines.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import clsx from "clsx";

interface MapProps {
  onNodeClick?: (clickedNode: string) => void;
  nodes: Node[] | undefined; // Change prop type
  path: Node[] | undefined;
  startNode?: string;
  goalNode?: string;
  imgURL: string;
  floor: string;
}

export default function Map({
  onNodeClick,
  nodes, // Access nodes directly from props
  path,
  startNode,
  goalNode,
  imgURL,
  floor,
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

  const handleResize = useCallback(() => {
    setImageWidth(image.current!.getBoundingClientRect().width / scale);
    setImageHeight(image.current!.getBoundingClientRect().height / scale);
  }, [image, scale]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      // Handle resize for each entry because array yeah!
      entries.forEach((entry) => {
        if (entry.target === image.current) {
          handleResize(); // Call handleResize for the image element
        }
      });
    });

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
      container?.removeEventListener("wheel", handleWheel);
      container?.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    handleResize,
    dragging,
    startDragOffset,
    offset.x,
    offset.y,
    imgWidth,
    scale,
    imgHeight,
  ]);

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
      <div className="absolute text-black font-bold text-2xl top-[20px] left-[20px]">
        <p> Level {floor}</p>
      </div>

      <Nodes
        imgWidth={imgWidth}
        imgHeight={imgHeight}
        onNodeClick={onNodeClick}
        nodes={nodes}
        startNode={startNode}
        goalNode={goalNode}
        floor={floor}
        dragOffset={offset}
        scale={scale}
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
    </div>
  );
}
