import React, { useMemo } from "react";
import { Node } from "database";
import { scaleCoordinate } from "../utils/scaleCoordinate";
import { ArrowDown, Flag } from "lucide-react";

const origImageWidth = 5000;
const origImageHeight = 3400;

interface LineProps {
  path: Node[];
  nodes: Node[];
  imgWidth: number;
  imgHeight: number;
  dragOffset: { x: number; y: number };
  scale: number;
  floor: string;
}

const floorColors = [
  "#7E22CE",
  "#7E22CE",
  "#7E22CE",
  "#7E22CE",
  "#7E22CE",
  "#7E22CE",
];

// Function to get the color based on floor index can change later if we want all set to purples
const getFloorColor = (floorIndex: string) => {
  let num = 0;
  if (floorIndex === "L2") num = 0;
  else if (floorIndex === "L1") num = 1;
  else if (floorIndex === "1") num = 2;
  else if (floorIndex === "2") num = 3;
  else num = 4;
  return floorColors[num];
};

export function Lines({
  nodes,
  path,
  imgWidth,
  imgHeight,
  floor,
  scale,
  dragOffset,
}: LineProps) {
  const pathColor = useMemo(() => {
    return getFloorColor(floor);
  }, [floor]); // Get the color for the active floor

  if (!path || path.length < 2) return null; // At least two for path

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

  // Calculate total length of the path to dynamically animate the path
  let totalLength = 0;
  for (let i = 1; i < path.length; i++) {
    const currentNode = nodes.find((n) => n.id === path[i].id);
    const prevNode = nodes.find((n) => n.id === path[i - 1].id);
    if (currentNode && prevNode) {
      totalLength += Math.sqrt(
        Math.pow(currentNode.x - prevNode.x, 2) +
          Math.pow(currentNode.y - prevNode.y, 2),
      );
    }
  }

  // Construct the path string
  const pathStrings = transitions.map((transition) => {
    const [currentNode, nextNode] = transition;
    const nextFloorIndex = nextNode.floor; // set floor index to current node floor
    // Check if current floor is the active floor
    if (nextFloorIndex === floor && currentNode.floor === floor) {
      return `M ${scaleCoordinate(
        currentNode.x,
        imgWidth,
        origImageWidth,
        0,
        dragOffset.x,
        scale,
      )} ${scaleCoordinate(
        currentNode.y,
        imgHeight,
        origImageHeight,
        0,
        dragOffset.y,
        scale,
      )} L ${scaleCoordinate(
        nextNode.x,
        imgWidth,
        origImageWidth,
        0,
        dragOffset.x,
        scale,
      )} ${scaleCoordinate(
        nextNode.y,
        imgHeight,
        origImageHeight,
        0,
        dragOffset.y,
        scale,
      )}`;
    }
    return ""; // Return empty string for paths not on active floor :D
  });

  // Join strings together
  const finalPathString = pathStrings.join(" ");

  const elevatorPoints: Node[] = transitions.flatMap((transition) => {
    return transition[0].floor !== transition[1].floor ? transition : [];
  });

  return (
    <>
      <svg
        width={imgWidth}
        height={imgHeight}
        style={{ position: "absolute", top: 0, left: 0 }}
        className="pointer-events-none"
      >
        <path
          d={finalPathString}
          style={{
            stroke: pathColor,
            strokeWidth: 2 * scale,
            fill: "none",
            strokeDasharray: 5 * scale,
          }}
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to={-totalLength * scale}
            dur={`${totalLength / 18}s`} // Speed
            repeatCount="indefinite"
          />
        </path>
      </svg>
      {elevatorPoints.map((point, index) => {
        if (point.floor !== floor) return null; // Skip if not on active floor
        if (point.id === path[path.length - 1].id) return null; // Skip if last point
        // Scale the coordinates
        const scaledX = scaleCoordinate(
          point.x,
          imgWidth,
          origImageWidth,
          0,
          dragOffset.x,
          scale,
        );
        const scaledY = scaleCoordinate(
          point.y,
          imgHeight,
          origImageHeight,
          0,
          dragOffset.y,
          scale,
        );

        return (
          <div>
            <svg
              key={index}
              width={20 * scale} // Adjust size as needed
              height={20 * scale}
              style={{
                color: "#7E22CE",
                position: "absolute",
                top: scaledY - 22 * scale, // Adjust position to center the point
                left: scaledX - 9.8 * scale,
              }}
              className="animate-bounce"
            >
              <ArrowDown size={20 * scale} />
              {/*<Circle r="10" fill="green" className="animate-ping"/>*/}
            </svg>
            <svg
              width={20 * scale} // Adjust size as needed
              height={20 * scale}
              style={{
                color: "#7E22CE",
                position: "absolute",
                top: scaledY - 10 * scale, // Adjust position to center the point
                left: scaledX - 10 * scale,
              }}
              className="animate-ping"
            >
              <circle
                cx={10 * scale}
                cy={10 * scale}
                r={4 * scale}
                fill="#7E22CE"
              />
            </svg>
          </div>
        );
      })}
      {path.length > 0 && path[path.length - 1].floor === floor && (
        <svg
          width={20 * scale}
          height={20 * scale}
          style={{
            color: "#FF0000",
            position: "absolute",
            top:
              scaleCoordinate(
                path[path.length - 1].y,
                imgHeight,
                origImageHeight,
                0,
                dragOffset.y,
                scale,
              ) -
              22 * scale,
            left:
              scaleCoordinate(
                path[path.length - 1].x,
                imgWidth,
                origImageWidth,
                0,
                dragOffset.x,
                scale,
              ) -
              3.5 * scale,
          }}
          className="animate-bounce"
        >
          <Flag size={20 * scale} />
        </svg>
      )}
    </>
  );
}
