
import React, { useState, useEffect, useRef } from "react";
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
    curSize: number,
    origSize: number,
    offset: number,
) => {
    return coordinate * (curSize / origSize) + offset;
};

interface LineProps{
    path: Node[];
    nodes: Node[];
}

const Lines = ({nodes, path}: LineProps) => {

    const [imageWidth, setImageWidth] = useState(0); //set image width
    const [imageHeight, setImageHeight] = useState(0); //set image height
    const image = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (!image.current) return;

        setImageWidth(image.current.height);
        setImageHeight(image.current.width);
    }, [image]);

    if (!path || path.length < 2) return null; // Path must have at least two nodes to draw lines
    return (
        <svg
            width={imageWidth}
            height={imageHeight}
            style={{ position: 'absolute', top: 0, left: 0 }}
        >
            {path.map((node, index) => {
                if (index < path.length - 1) {
                    const currentNode = nodes.find(n => n.nodeId === node.nodeId);
                    const nextNode = nodes.find(n => n.nodeId === path[index + 1].nodeId);
                    if (currentNode && nextNode) {
                        return (

                            // Line Positioning
                            <line
                                key={index}
                                x1={scaleCoordinate(currentNode.xcords, imageWidth, origImageWidth, 0)}
                                x2={scaleCoordinate(nextNode.xcords, imageWidth, origImageWidth, 0)}
                                y1={scaleCoordinate(currentNode.ycords, imageHeight, origImageHeight, 0)}
                                y2={scaleCoordinate(nextNode.ycords, imageHeight, origImageHeight, 0)}
                                style={{ stroke: 'red', strokeWidth: 2 }}
                            />
                        );
                    }
                }
                return null;
            })}
        </svg>
    );
};
