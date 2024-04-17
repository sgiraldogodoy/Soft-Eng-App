import "./test.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { scaleCoordinate } from "@/utils/scaleCoordinate.ts";
import { trpc } from "@/utils/trpc.ts";
import { Node } from "database";
import { motion } from "framer-motion";

export default function Laser() {
  const [imgWidth, setImageWidth] = useState(0); //set image width
  const [imgHeight, setImageHeight] = useState(0); //set image height
  const origImageWidth = 5400;
  const origImageHeight = 3000;
  const image = useRef<HTMLImageElement>(null);
  const scale = 1;
  const offset = { x: 0, y: 0 };
  //const containerRef = useRef<HTMLDivElement>(null);
  const imgURL = "/02_thesecondfloor.png";

  const nodesQuery = trpc.node.getAll.useQuery();
  const nodes = nodesQuery?.data;

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

  const pathQuery = trpc.node.findPath;
  const pathMake = pathQuery.useQuery({
    startNodeId: "BINFO00202",
    endNodeId: "ACONF00102",
    algorithm: "A*",
  });
  const path = pathMake.data;

  if (path == undefined) {
    return null;
  }

  const transitions: Node[][] = path.reduce(
    (acc: Node[][], current, index, array) => {
      if (index < array.length - 1) {
        const transition = [current, array[index + 1]];
        acc.push(transition);
      }
      return acc;
    },
    [],
  );

  for (let i = 1; i < path.length; i++) {
    const currentNode = nodes?.find((n) => n.id === path[i].id);
    const prevNode = nodes?.find((n) => n.id === path[i - 1].id);
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

  const finalPathString = "M" + pathStrings.join(" L");
  console.log(finalPathString);

  return (
    <div
      style={{
        position: "absolute",
        overflow: "hidden",
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
      <svg
        width={imgWidth}
        height={imgHeight}
        style={{ position: "absolute", top: 0, left: 0 }}
        className="pointer-events-none"
      >
        <g mask={"url(#laserMask)"}>
          <path
            d={finalPathString}
            style={{
              stroke: "blue",
              fill: "none",
            }}
            strokeWidth="2"
          />
        </g>

        <mask id={"laserMask"}>
          <motion.path
            d={finalPathString}
            style={{
              stroke: "white",
              fill: "none",
            }}
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              pathLength: {
                delay: 1,
                type: "tween",
                duration: 3,
                bounce: 0,
                repeat: Infinity,
              },
            }}
          />
          <motion.path
            d={finalPathString}
            style={{
              stroke: "black",
              fill: "none",
            }}
            strokeWidth="2.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              pathLength: {
                delay: 1.2,
                type: "tween",
                duration: 3,
                bounce: 0,
                repeat: Infinity,
              },
            }}
          />
        </mask>
      </svg>
    </div>
  );
}
