import { useState, useRef, useEffect, useCallback } from "react";
import { Nodes } from "./Nodes.tsx";
import { Node } from "database";
import { Lines } from "./Lines.tsx";

interface MapProps {
  onNodeClick: (clickedNode: string) => void;
  nodes: Node[] | undefined; // Change prop type
  path: Node[] | undefined;
  startNode: string;
  goalNode: string;
}

export default function Map({
  onNodeClick,
  nodes, // Access nodes directly from props
  path,
  startNode,
  goalNode,
}: MapProps) {
  const [imgWidth, setImageWidth] = useState(0); //set image width
  const [imgHeight, setImageHeight] = useState(0); //set image height
  const image = useRef<HTMLImageElement>(null);

  const handleResize = useCallback(() => {
    setImageWidth(image.current!.getBoundingClientRect().width);
    setImageHeight(image.current!.getBoundingClientRect().height);
  }, [image]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  if (!nodes) {
    return <p>No nodes found</p>;
  }

  return (
    <div className="relative">
      <img
        ref={image}
        src="/00_thelowerlevel1.png"
        className="w-full"
        alt="Map"
        onLoad={handleResize}
      />
      <Nodes
        imgWidth={imgWidth}
        imgHeight={imgHeight}
        onNodeClick={onNodeClick}
        nodes={nodes}
        startNode={startNode}
        goalNode={goalNode}
        floor="L1" //implement to be reactive to the page the user is on
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
