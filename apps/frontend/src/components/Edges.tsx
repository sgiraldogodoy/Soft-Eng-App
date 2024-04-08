// import React from "react";
// import { Node, Edge } from "database";
// import { scaleCoordinate } from "../utils/scaleCoordinate";
//
// const origImageWidth = 5000;
// const origImageHeight = 3400;
//
// interface LineProps {
//     nodes: Node[];
//     edges: Edge[]
//     imgWidth: number;
//     imgHeight: number;
//     floor: string;
// }
//
// export function Edges({ nodes, edges, imgWidth, imgHeight, floor }: LineProps) {
//     if (!edges || edges.length < 2) return null; // At least two for path
//     //const filteredNode = nodes.filter((node) => node.floor === floor);
//     return (
//         <svg
//             width={imgWidth}
//             height={imgHeight}
//             style={{ position: "absolute", top: 0, left: 0 }}
//         >
//
//         </svg>
//     );
// }
