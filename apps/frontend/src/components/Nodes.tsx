import React, { useState } from "react";
import { Node } from "database";

const origImageWidth = 5000;
const origImageHeight = 3400;

/**
 * scaleCoordinate function that scales the coordinate to the image size
 * @param coordinate coordinate on non-edited image
 * @param curSize current size of the image
 * @param origSize original size of image
 * @param offset image offset
 */
const scaleCoordinate = (
  coordinate: number,
  currSize: number,
  origSize: number,
  offset: number,
) => {
  return coordinate * (currSize / origSize) + offset;
};

interface NodesProps {
  onNodeClick: (nodeID: string) => void;
  nodes: Node[];
  imgWidth: number;
  imgHeight: number;
}

const Nodes = ({ onNodeClick, nodes, imgWidth, imgHeight }: NodesProps) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null); //set hovered node
  const [clickedNodeID, setClickedNodeID] = useState<string | null>(null); //set clicked node ID

  /**
   * handleNodeHover function that sets the hovered node
   * @param node the node that is hovered by mouse
   */
  const handleNodeHover = (node: Node) => {
    setHoveredNode(node.nodeId);
  };

  /**
   * handleNodeClick function that sets the clicked node
   * @param node the node that is clicked by mouse
   */
  const handleNodeClick = (node: Node) => {
    setClickedNodeID(node.nodeId);
    onNodeClick(node.nodeId);
  };

  /**
   * handleMouseLeave function that sets the hovered node to null
   */
  const handleMouseLeave = () => {
    setHoveredNode(null);
  };

  return (
    <div>
      {nodes.map((node, index) => (
        //Node Positioning
        <div
          key={index}
          style={{
            position: "absolute",
            left: scaleCoordinate(node.xcords, imgWidth, origImageWidth, 0),
            top: scaleCoordinate(node.ycords, imgHeight, origImageHeight, 0),
            width:
              node.nodeId === hoveredNode
                ? "10px"
                : node.nodeId === clickedNodeID
                  ? "8px"
                  : "5px",
            height:
              node.nodeId === hoveredNode
                ? "10px"
                : node.nodeId === clickedNodeID
                  ? "8px"
                  : "5px",
            backgroundColor:
              node.nodeId === hoveredNode
                ? "cyan"
                : node.nodeId === clickedNodeID
                  ? "red"
                  : "black",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            cursor: "pointer",
          }}
          onMouseEnter={() => handleNodeHover(node)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleNodeClick(node)}
        />
      ))}
      {hoveredNode && (
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            backgroundColor: "cyan",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          Node ID: {hoveredNode}
        </div>
      )}
      {clickedNodeID && (
        <div
          style={{
            position: "absolute",
            top: 50,
            left: 10,
            backgroundColor: "red",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          Node ID: {clickedNodeID}
        </div>
      )}
    </div>
  );
};

export { Nodes };
