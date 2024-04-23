import { useState } from "react";

export function useSelectNodes() {
  const [firstNode, setfirstNode] = useState("");
  const [secondNode, setsecondNode] = useState("");

  const setNode = (node: string) => {
    if (firstNode && secondNode) {
      setfirstNode(node);
      setsecondNode("");
    } else if (!firstNode) {
      setfirstNode(node);
    } else if (!secondNode) {
      setsecondNode(node);
    }
  };

  return {
    firstNode,
    secondNode,
    setNode,
    clearNodes: () => {
      setfirstNode("");
      setsecondNode("");
    },
  };
}
