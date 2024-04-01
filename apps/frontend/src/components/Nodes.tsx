import { useState, useEffect, useRef } from "react";
import { trpc } from "../utils/trpc.ts";
import { Node } from "database";

const origImageWidth = 5000;
const origImageHeight = 3400;

const scaleCoordinate = (
    coordinate: number,
    curSize: number,
    origSize: number,
    offset: number,
) => {
    //console.log((coordinate * 100 / (imageSize * 0.8) , coordinate/imageSize * 100);
    return coordinate * (curSize / origSize) + offset;
};

interface ImageWithNodesProps {
    onNodeClick: (nodeID: string) => void;
}

const NodeLoader({nodes}) =>  {
    const [imageWidth, setImageWidth] = useState(0); //set image width
    const [imageHeight, setImageHeight] = useState(0); //set image height
    const [hoveredNode, setHoveredNode] = useState<string | null>(null); //set hovered node
    const [clickedNodeID, setClickedNodeID] = useState<string | null>(null); //set clicked node ID

    const image = useRef<HTMLImageElement>(null);
    const arrayNodeQuery = trpc.pathfinder.getNodes.useQuery();

    useEffect(() => {
        if (!image.current) return;

        setImageWidth(image.current.height);
        setImageHeight(image.current.width);
    }, [image]);

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
        <div style={{ position: "relative", display: "inline-block" }}>
              {arrayNodeQuery.data?.map((node, index) => (
                    // Node Positioning
                    <div
                        key={index}
                        style={{
                            position: "absolute",
                            left: scaleCoordinate(node.xcords, imageWidth, origImageWidth, 0),
                            top: scaleCoordinate(
                                node.ycords,
                                imageHeight,
                                origImageHeight,
                                0,
                            ),
                            width:
                                node.nodeId === hoveredNode
                                    ? "10px"
                                    : node.nodeId === clickedNodeID
                                        ? "8px"
                                        : "5px", //dot size if hovering make bigger
                            height:
                                node.nodeId === hoveredNode
                                    ? "10px"
                                    : node.nodeId === clickedNodeID
                                        ? "8px"
                                        : "5px", //dot size if hovering make bigger
                            backgroundColor:
                                node.nodeId === hoveredNode
                                    ? "cyan"
                                    : node.nodeId === clickedNodeID
                                        ? "red"
                                        : "black", // Conditional color based on hover and click
                            borderRadius: "50%",
                            transform: "translate(-50%, -50%)",
                            cursor: "pointer",
                        }}
                        onMouseEnter={() => handleNodeHover(node)}
                        onMouseLeave={handleMouseLeave} //- undoes the highlight but left on so person could see the nodeID
                        onClick={() => handleNodeClick(node)} // handles node click
                    />
                ))}
                {
                    //if hoveredNode is not null, display the nodeID
                    hoveredNode && (
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
                    )
                }
                {
                    //if clickedNodeID is not null, display the nodeID
                    clickedNodeID && (
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
                    )
                }
        </div>
    );
};

export {Nodes};
