import { trpc } from "../utils/trpc.ts";
import { useState, useRef, useEffect, useCallback } from "react";
import { Nodes } from "./Nodes.tsx";
import { Node } from "database";
import { Lines } from "./Lines.tsx";

interface MapProps {
  onNodeClick: (clickedNode: string) => void;
  path: Node[] | undefined;
  startNode: string;
}

export default function Map({ onNodeClick, path, startNode }: MapProps) {
  const [imgWidth, setImageWidth] = useState(0); //set image width
  const [imgHeight, setImageHeight] = useState(0); //set image height
  const nodes = trpc.pathfinder.getNodes.useQuery();
  const image = useRef<HTMLImageElement>(null);

  const handleResize = useCallback(() => {
    setImageWidth(image.current!.getBoundingClientRect().width);
    setImageHeight(image.current!.getBoundingClientRect().height);
  }, [image]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, [image, handleResize]);

  if (nodes.isLoading) {
    return <p>Loading...</p>;
  }

  if (nodes.isError) {
    return <p>Error: {nodes.error.message}</p>;
  }

  if (!nodes.data) {
    return <p>No nodes found</p>;
  }

  return (
    <div className="relative">
      <img
        ref={image}
        src="00_thelowerlevel1.png"
        className="w-full"
        alt="Map"
        onLoad={handleResize}
      />
      <Nodes
        imgWidth={imgWidth}
        imgHeight={imgHeight}
        onNodeClick={onNodeClick}
        nodes={nodes.data}
        startNode={startNode}
      />
      {path && (
        <Lines
          imgWidth={imgWidth}
          imgHeight={imgHeight}
          nodes={nodes.data}
          path={path}
        />
      )}
    </div>
  );
}
