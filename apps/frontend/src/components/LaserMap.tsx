import "./test.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { scaleCoordinate } from "@/utils/scaleCoordinate.ts";
import { trpc } from "@/utils/trpc.ts";
import { Node } from "database";
import Laser from "@/components/Laser.tsx";

export default function LaserMap() {
  const [imgWidth, setImageWidth] = useState(0); //set image width
  const [imgHeight, setImageHeight] = useState(0); //set image height
  const origImageWidth = 5400;
  const origImageHeight = 3000;
  const image = useRef<HTMLImageElement>(null);
  const scale = 1;
  const offset = { x: 0, y: 0 };
  //const containerRef = useRef<HTMLDivElement>(null);
  const imgURL = "/02_thesecondfloor.png";

  const nodesQuery = trpc.node.getAll.useQuery() || [];

  const [startNode, setStartNode] = useState<Node | null>(null);
  const [endNode, setEndNode] = useState<Node | null>(null);

  const [lasers, setLasers] = useState<Array<{ id: number; path: string }>>([]);
  const [counter, setCounter] = useState(0);

  const path = trpc.node.findPath.useQuery(
    {
      startNodeId: startNode ? startNode.id : "BINFO00202",
      endNodeId: endNode ? endNode.id : "ACONF00102",
      algorithm: "A*",
    },
    {
      enabled: !!startNode && !!endNode,
    },
  );

  const generatePath = useCallback(
    (nodes: Node[]) => {
      const pathData = path.data;
      if (pathData == undefined) {
        return "";
      }

      const transitions: Node[][] = pathData.reduce(
        (acc: Node[][], current, index, array) => {
          if (index < array.length - 1) {
            const transition = [current, array[index + 1]];
            acc.push(transition);
          }
          return acc;
        },
        [],
      );

      for (let i = 1; i < pathData.length; i++) {
        const currentNode = nodes?.find((n) => n.id === pathData[i].id);
        const prevNode = nodes?.find((n) => n.id === pathData[i - 1].id);
        if (currentNode && prevNode) {
          // totalLength += Math.sqrt(
          //   Math.pow(currentNode.x - prevNode.x, 2) +
          //     Math.pow(currentNode.y - prevNode.y, 2),
          // );
        }
      }

      const pathStrings = transitions.map((transition) => {
        const [currentNode, nextNode] = transition;
        return `${scaleCoordinate(
          currentNode.x,
          imgWidth,
          origImageWidth,
          0,
          offset.x,
          scale,
        )} ${scaleCoordinate(
          currentNode.y,
          imgHeight,
          origImageHeight,
          0,
          offset.y,
          scale,
        )} L ${scaleCoordinate(
          nextNode.x,
          imgWidth,
          origImageWidth,
          0,
          offset.x,
          scale,
        )} ${scaleCoordinate(
          nextNode.y,
          imgHeight,
          origImageHeight,
          0,
          offset.y,
          scale,
        )}`;
      });
      return "M" + pathStrings.join(" L");
    },
    [imgHeight, imgWidth, offset.x, offset.y, path],
  );

  useEffect(() => {
    const nodes = nodesQuery.data || [];
    let filteredNodes = nodes.filter((node) => node.floor === "2");
    filteredNodes = filteredNodes.filter((node) => node.type !== "HALL");
    const length = filteredNodes ? filteredNodes.length : 0;

    const interval = setInterval(() => {
      setStartNode(filteredNodes[Math.floor(Math.random() * (length + 1))]);
      setEndNode(filteredNodes[Math.floor(Math.random() * (length + 1))]);
      if (startNode && endNode) {
        const newLaser = {
          id: counter,
          path: generatePath(nodes),
        };
        setCounter(counter + 1);
        setLasers((lasers) => [...lasers, newLaser]);
      }
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [lasers, counter, endNode, generatePath, nodesQuery.data, startNode]);

  const handleResize = useCallback(() => {
    setImageWidth(image.current!.getBoundingClientRect().width / scale);
    setImageHeight(image.current!.getBoundingClientRect().height / scale);
  }, [image, scale]);

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
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize, imgHeight, imgWidth]);

  const removeLaser = useCallback((id: number) => {
    setLasers((lasers) => lasers.filter((laser) => laser.id !== id));
  }, []);

  return (
    <div
      style={{
        overflow: "hidden",
        userSelect: "none",
      }}
      className="absolute object-cover w-full h-full grayscale opacity-35"
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
      {lasers.map((laser) => (
        <Laser
          key={laser.id}
          id={laser.id}
          path={laser.path}
          death={() => removeLaser(laser.id)}
          imgWidth={imgWidth}
          imgHeight={imgHeight}
        />
      ))}
    </div>
  );
}
