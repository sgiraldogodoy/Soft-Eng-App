import fs from "fs";
import readline from "readline";
import type { Prisma } from "database";

type Node = Prisma.NodeCreateManyInput;
type Edge = Prisma.EdgeCreateManyInput;

export async function parseCSVNode(path: string) {
  const nodes: Node[] = [];

  // Parse nodes CSV
  const nodeStream = readline.createInterface({
    input: fs.createReadStream(path),
    output: process.stdout,
    terminal: false,
  });

  let i = 0;
  for await (const line of nodeStream) {
    if (i == 0) {
      i++;
      continue;
    }
    const [
      nodeId,
      xcordsString,
      ycordsString,
      floor,
      building,
      nodeType,
      longName,
      shortName,
    ] = line.split(",");
    const xcords = Number(xcordsString);
    const ycords = Number(ycordsString);
    nodes.push({
      nodeId,
      xcords,
      ycords,
      building,
      floor,
      nodeType,
      longName,
      shortName,
    });
    console.log("processing Node: " + line);
  }

  // Save to database
  return nodes;
}

export async function parseCSVEdge(path: string) {
  const edges: Edge[] = [];

  // Parse edges CSV
  const edgeStream = readline.createInterface({
    input: fs.createReadStream(path),
    output: process.stdout,
    terminal: false,
  });

  let i = 0;
  for await (const line of edgeStream) {
    if (i == 0) {
      i++;
      continue;
    }
    const [startNodeId, endNodeId] = line.split(",");
    const edgeId = `${startNodeId}-${endNodeId}`;
    edges.push({ edgeId, startNodeId, endNodeId });
    const reverseId = `${endNodeId}-${startNodeId}`;
    edges.push({
      edgeId: reverseId,
      startNodeId: endNodeId,
      endNodeId: startNodeId,
    });
    console.log("processing Edge: " + line);
  }

  return edges;
}
