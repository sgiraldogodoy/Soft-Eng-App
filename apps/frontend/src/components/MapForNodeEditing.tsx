import { useState, useRef, useEffect, useCallback } from "react";
import { Nodes } from "./Nodes.tsx";
import { Node, Edge } from "database";
import { Edges } from "../components/Edges.tsx";

interface MapProps {
  nodes: Node[] | undefined; // Change prop type
  edges: Edge[] | undefined;
  imgURL: string;
  floor: string;
  className: string;
}

export default function MapForNodeEditing({
  nodes, // Access nodes directly from props
  imgURL,
  floor,
  className,
  edges,
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
    window.addEventListener("resize", handleResize);

    if (image.current) {
      resizeObserver.observe(image.current);
    }

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  // useEffect(() => {
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, [handleResize]);

  if (!nodes || !edges) {
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
        nodes={nodes}
        floor={floor}
        filter={true}
      />
      <Edges
        imgWidth={imgWidth}
        imgHeight={imgHeight}
        nodes={nodes}
        edges={edges}
        floor={floor}
      />
    </div>
  );
}
