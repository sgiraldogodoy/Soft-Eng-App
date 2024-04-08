import { useState, useRef, useEffect, useCallback } from "react";
import { Nodes } from "./Nodes.tsx";
import { Node } from "database";
import { Lines } from "./Lines.tsx";

interface MapProps {
  onNodeClick?: (clickedNode: string) => void;
  nodes: Node[] | undefined; // Change prop type
  path?: Node[] | undefined;
  startNode?: string;
  goalNode?: string;
  imgURL: string;
  floor: string;
  className?: string;
}

export default function Map({
  onNodeClick,
  nodes, // Access nodes directly from props
  path,
  startNode,
  goalNode,
  imgURL,
  floor,
  className,
}: MapProps) {
  const [imgWidth, setImageWidth] = useState(0); //set image width
  const [imgHeight, setImageHeight] = useState(0); //set image height
  const image = useRef<HTMLImageElement>(null);

  const handleResize = useCallback(() => {
    setImageWidth(image.current!.getBoundingClientRect().width);
    setImageHeight(image.current!.getBoundingClientRect().height);
  }, [image]);

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

    return () => {
      resizeObserver.disconnect();
    };
  }, [handleResize]);

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
    <div className="relative">
      <img
        ref={image}
        src={imgURL}
        alt="${imgURL} image"
        onLoad={handleResize}
        className={className}
      />
      <Nodes
        imgWidth={imgWidth}
        imgHeight={imgHeight}
        onNodeClick={onNodeClick}
        nodes={nodes}
        startNode={startNode}
        goalNode={goalNode}
        floor={floor}
      />
      {path && (
        <Lines
          imgWidth={imgWidth}
          imgHeight={imgHeight}
          nodes={nodes}
          path={path}
        />
      )}
    </div>
  );
}
