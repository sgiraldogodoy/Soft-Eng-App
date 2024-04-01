import type { Prisma } from "database";

type Node = Prisma.NodeCreateManyInput;
type Edge = Prisma.EdgeCreateManyInput;

export async function parseCSVNode(csv: string) {
  const nodes: Node[] = [];

  const lines = csv.split("\n");
  // Parse nodes CSV

  let i = 0;
  for await (const line of lines) {
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

export async function parseCSVEdge(csv: string) {
  const edges: Edge[] = [];

  // Parse edges CSV
  const lines = csv.split("\n");

  let i = 0;
  for await (const line of lines) {
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
  }

  return edges;
}
