import { useState, useRef, useEffect, useCallback } from "react";
import { Nodes } from "./Nodes.tsx";
import { Node } from "database";
import { Lines } from "./Lines.tsx";

interface MapProps {
  onNodeClick?: (clickedNode: string) => void;
  nodes: Node[] | undefined; // Change prop type
  path: Node[] | undefined;
  startNode: string;
  goalNode: string;
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

  const [scale, setScale] = useState(1);
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

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const scaleAdjustment = e.deltaY > 0 ? 0.95 : 1.05;
      setScale((prevScale) =>
        Math.max(1, Math.min(prevScale * scaleAdjustment, 10)),
      );
    };

    //const panScaleAdjustment = (1 / scale); Trying to make pan slower at high zoom; doesn't work rn
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) {
        setDragging(true);
        const newOffset = {
          x: e.clientX - offset.x,
          y: e.clientY - offset.y,
        };
        setStartDragOffset(newOffset);

        e.preventDefault();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startDragOffset.x;
      const dy = e.clientY - startDragOffset.y;

      const limitX: number = ((imgWidth * scale) / 2 - imgWidth / 2) / scale;
      const limitY: number = ((imgHeight * scale) / 2 - imgHeight / 2) / scale;

      const adjustedX: number = Math.min(Math.max(dx, -limitX), limitX);
      const adjustedY: number = Math.min(Math.max(dy, -limitY), limitY);

      const newOffset = {
        x: adjustedX,
        y: adjustedY,
      };
      setOffset(newOffset);
    };

    const handleMouseUp = () => {
      if (dragging) {
        setDragging(false);
      }
    };

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

  // useEffect(() => {
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, [handleResize]);

  if (!nodes) {
    return <p>No nodes found</p>;
  }

  return (
    <div
      className="relative"
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
      />
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
        />
      )}
    </div>
  );
}
