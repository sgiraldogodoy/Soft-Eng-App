import React, { useMemo } from "react";
import { Node } from "database";
import { scaleCoordinate } from "../utils/scaleCoordinate";
import { ArrowDown } from "lucide-react";

const origImageWidth = 5000;
const origImageHeight = 3400;

interface LineProps {
  path: Node[];
  nodes: Node[];
  imgWidth: number;
  imgHeight: number;
  floor: string;
}

const floorColors = [
  "#8260f6",
  "#8260f6",
  "#8260f6",
  "#8260f6",
  "#8260f6",
  "#8260f6",
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

export function Lines({ nodes, path, imgWidth, imgHeight, floor }: LineProps) {
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
    const currentNode = nodes.find((n) => n.nodeId === path[i].nodeId);
    const prevNode = nodes.find((n) => n.nodeId === path[i - 1].nodeId);
    if (currentNode && prevNode) {
      totalLength += Math.sqrt(
        Math.pow(currentNode.xcords - prevNode.xcords, 2) +
          Math.pow(currentNode.ycords - prevNode.ycords, 2),
      );
    }
  }

  //
  // // Construct the path string
  // const pathString = path
  //     .map((node, index) => {
  //         const currentNode = nodes.find((n) => n.nodeId === node.nodeId);
  //         if (currentNode) {
  //             return `${index === 0 ? "M" : "L"} ${scaleCoordinate(
  //                 currentNode.xcords,
  //                 imgWidth,
  //                 origImageWidth,
  //                 0,
  //             )} ${scaleCoordinate(
  //                 currentNode.ycords,
  //                 imgHeight,
  //                 origImageHeight,
  //                 0,
  //             )}`;
  //         }
  //         return "";
  //     })
  //     .join(" ");
  // Define different colors for different floors

  // Generate PathStrings using transitions
  const pathStrings = transitions.map((transition) => {
    const [currentNode, nextNode] = transition;
    const currentFloorIndex = currentNode.floor; // set floor index to current node floor
    // Check if current floor is the active floor
    if (currentFloorIndex === floor) {
      return `M ${scaleCoordinate(
        currentNode.xcords,
        imgWidth,
        origImageWidth,
        0,
      )} ${scaleCoordinate(
        currentNode.ycords,
        imgHeight,
        origImageHeight,
        0,
      )} L ${scaleCoordinate(
        nextNode.xcords,
        imgWidth,
        origImageWidth,
        0,
      )} ${scaleCoordinate(nextNode.ycords, imgHeight, origImageHeight, 0)}`;
    }
    return ""; // Return empty string for paths not on active floor :D
  });

  // Join strings together
  const finalPathString = pathStrings.join(" ");

  // style path color, only one for now can change in code above if need

  // const elevatorPoints = path.filter((node, index, array) => {
  //     // Check if the current node is an elevator and on the desired floor
  //     if (node.nodeType === "ELEV" && node.floor === floor) {
  //         // Check if it's not the first node and the previous node had a different floor
  //         if (index > 0 && array[index - 1].floor !== node.floor || (index === 0 && array.length > 1 && array[index + 1].floor !== node.floor) ||
  //             (index > 0 && array[index + 1].floor !== node.floor)) {
  //             return true; // Include this elevator point since theres a floor change
  //         }
  //     }
  //     return false; // Exclude this node
  // });
  //const elevatorPoints: Node[] = useMemo( () => { return transitions.flatMap((transition) => {return transition[0].floor !== transition[1].floor ? transition : [];}); }, [transitions]);
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
            strokeWidth: 2,
            fill: "none",
            strokeDasharray: "5,5",
          }}
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to={-totalLength}
            dur={`${totalLength / 18}s`} // Speed
            repeatCount="indefinite"
          />
        </path>
      </svg>
      {elevatorPoints.map((point, index) => {
        if (point.floor !== floor) return null; // Skip if not on active floor
        // Scale the coordinates
        const scaledX = scaleCoordinate(
          point.xcords,
          imgWidth,
          origImageWidth,
          0,
        );
        const scaledY = scaleCoordinate(
          point.ycords,
          imgHeight,
          origImageHeight,
          0,
        );

        return (
          <svg
            key={index}
            width="20" // Adjust size as needed
            height="20"
            style={{
              position: "absolute",
              top: scaledY - 22, // Adjust position to center the point
              left: scaledX - 12,
            }}
            className="animate-bounce animation-ping"
          >
            {/* Circle representing elevator point */}
            <ArrowDown />
            {/*<Circle r="10" fill="green" className="animate-ping"/>*/}
          </svg>
        );
      })}
    </>
  );
}
