import React, { useState } from "react";
import { Node, Edge } from "database";
import { scaleCoordinate } from "../utils/scaleCoordinate";

const origImageWidth = 5000;
const origImageHeight = 3400;

interface LineProps {
  nodes: Node[];
  edges: Edge[];
  imgWidth: number;
  imgHeight: number;
  floor: string;
  dragOffset: { x: number; y: number };
  scale: number;
}

export function Edges({
  nodes,
  edges,
  imgWidth,
  imgHeight,
  floor,
  dragOffset,
  scale,
}: LineProps) {
  const [hoveredEdgeID, setHoveredEdge] = useState<string | null>(null); //set hovered node

  if (!edges || edges.length < 2) return null; // At least two for path
  const filteredNode = nodes.filter((node) => node.floor === floor);
  const filteredNodeNodeId = filteredNode.map((node) => node.nodeId);
  const filteredEdges = edges.filter(
    (edge) =>
      filteredNodeNodeId.includes(edge.startNodeId) &&
      filteredNodeNodeId.includes(edge.endNodeId),
  );
  //Draw the lines by going through the filteredEdges to find two nodeIds and then draw a line between them
  // Construct the path string
  // const path = filteredEdges
  //   .map((edge) => {
  //     const startNode = filteredNode.find(
  //       (node) => node.nodeId === edge.startNodeId,
  //     );
  //     const endNode = filteredNode.find(
  //       (node) => node.nodeId === edge.endNodeId,
  //     );
  //
  //     if (!startNode || !endNode) {
  //       return "";
  //     }
  //     // Construct the path string directly from edge coordinates
  //     return `M${scaleCoordinate(startNode.xcords, imgWidth, origImageWidth, 0, dragOffset.x, scale)},${scaleCoordinate(startNode.ycords, imgHeight, origImageHeight, 0, dragOffset.y, scale)}
  //       L${scaleCoordinate(endNode.xcords, imgWidth, origImageWidth, 0, dragOffset.x, scale)},${scaleCoordinate(endNode.ycords, imgHeight, origImageHeight, 0, dragOffset.y, scale)}`;
  //   })
  //   .join(" ");

  return (
    <div>
      <svg
        width={imgWidth}
        height={imgHeight}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        {filteredEdges.map((edge, index) => {
          const startNode = filteredNode.find(
            (node) => node.nodeId === edge.startNodeId,
          );
          const endNode = filteredNode.find(
            (node) => node.nodeId === edge.endNodeId,
          );

          if (!startNode || !endNode) {
            return null; // or any other placeholder JSX if needed
          }

          return (
            <line
              key={index}
              x1={scaleCoordinate(
                startNode.xcords,
                imgWidth,
                origImageWidth,
                0,
                dragOffset.x,
                scale,
              )}
              y1={scaleCoordinate(
                startNode.ycords,
                imgHeight,
                origImageHeight,
                0,
                dragOffset.y,
                scale,
              )}
              x2={scaleCoordinate(
                endNode.xcords,
                imgWidth,
                origImageWidth,
                0,
                dragOffset.x,
                scale,
              )}
              y2={scaleCoordinate(
                endNode.ycords,
                imgHeight,
                origImageHeight,
                0,
                dragOffset.y,
                scale,
              )}
              onMouseEnter={() => setHoveredEdge(edge.edgeId)}
              onMouseLeave={() => setHoveredEdge(null)}
              style={{
                position: "absolute",
                stroke: "red",
                strokeWidth: 2 * scale,
                fill: "blue",
                cursor: "pointer",
              }}
            />
          );
        })}
      </svg>
      {hoveredEdgeID && (
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            backgroundColor: "white",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          Edge ID: {hoveredEdgeID}
        </div>
      )}
    </div>
  );
}

// {filteredNodes.map((node, index) => (
//     //Node Positioning
//     <div
//         key={index}
//         style={{
//             position: "absolute",
//             left: scaleCoordinate(
//                 node.xcords,
//                 imgWidth,
//                 origImageWidth,
//                 0,
//                 dragOffset.x,
//                 scale,
//             ),
//             top: scaleCoordinate(
//                 node.ycords,
//                 imgHeight,
//                 origImageHeight,
//                 0,
//                 dragOffset.y,
//                 scale,
//             ),
//             width:
//                 node.nodeId === hoveredNode
//                     ? "8px"
//                     : node.nodeId === goalNode
//                         ? "8px"
//                         : node.nodeId === startNode
//                             ? "8px"
//                             : "5px",
//             height:
//                 node.nodeId === hoveredNode
//                     ? "8px"
//                     : node.nodeId === goalNode
//                         ? "8px"
//                         : node.nodeId === startNode
//                             ? "8px"
//                             : "5px",
//             backgroundColor:
//                 node.nodeId === goalNode
//                     ? "red"
//                     : node.nodeId === startNode
//                         ? "#003A96"
//                         : "white",
//             boxShadow:
//                 node.nodeId === hoveredNode
//                     ? "0 0 0 2px cyan" // Ring effect with cyan color when hovered
//                     : node.nodeId === goalNode
//                         ? "0 0 0 2px red" // red when goal node
//                         : node.nodeId === startNode
//                             ? "0 0 0 2px #003A96" // blue when start
//                             : "0 0 0 2px black", // Default black ring
//             borderRadius: "100%",
//             transform: `translate(-50%, -50%) scale(${scale})`,
//             cursor: "pointer",
//         }}
//         onMouseEnter={() => {setHoveredNode(node.nodeId); setHoveredNodeString(node.longName);}}
//         onMouseLeave={() => {setHoveredNode(null); setHoveredNodeString(null);}}
//         onMouseDown={() => {
//             if (onNodeDown) onNodeDown();
//         }}
//         onClick={() => {
//             if (onNodeClick) onNodeClick(node.nodeId);
//         }}
//     />
// ))}

//
// {filteredEdges.map((edge, index) =>
//     (
//
//     )
//
//     const startNode = filteredNode.find(
//         (node) => node.nodeId === edge.startNodeId,
//     );
//     const endNode = filteredNode.find(
//         (node) => node.nodeId === edge.endNodeId,
//     );
//     if(!startNode || !endNode) {
//         return "";
//     }
//
//     onMouseEnter={() => setHoveredEdge(edge.edgeId)}
//     onMouseLeave={() => setHoveredEdge(null)}
//
// }
//
//
//
// <svg
//     width={imgWidth}
//     height={imgHeight}
//     style={{ position: "absolute", top: 0, left: 0 }}
// >
//     <path
//         d={path}
//         style={{
//             stroke: "red",
//             strokeWidth: 2 * scale,
//             fill: "none",
//         }}
//     ></path>
//
// </svg>
