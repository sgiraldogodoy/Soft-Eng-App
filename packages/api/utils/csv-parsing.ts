import { Prisma } from "database";
import { ZCreateNodeSchema as nodeSchema } from "common";

type Node = Prisma.NodeCreateManyInput;
type Edge = Prisma.EdgeCreateManyInput;

export async function parseCSVNode(csv: string) {
  const nodes: Node[] = [];

  // Parse nodes CSV
  const nodeStream = csv.split(/\r?\n/);

  let i = 0;
  for await (const line of nodeStream) {
    if (i == 0) {
      i++;
      continue;
    }
    const [
      id,
      xString,
      yString,
      floor,
      building,
      typeString,
      longName,
      shortName,
    ] = line.split(",");

    const node = nodeSchema.safeParse({
      id,
      x: Number(xString),
      y: Number(yString),
      building,
      floor,
      type: typeString,
      longName,
      shortName,
    });

    if (!node.success) {
      console.error(node.error);
      continue;
    }

    nodes.push(node.data);
  }
  return nodes;
}

export async function parseCSVEdge(csv: string) {
  const edges: Edge[] = [];

  // Parse edges CSV
  const lines = csv.split(/\r?\n/);

  let i = 0;
  for await (const line of lines) {
    if (i == 0) {
      i++;
      continue;
    }
    if (line.split(",").some((x) => !x)) {
      continue;
    }
    const [, startNodeId, endNodeId] = line.split(",");
    try {
      edges.push({ startNodeId, endNodeId });
      edges.push({
        startNodeId: endNodeId,
        endNodeId: startNodeId,
      });
    } catch (e) {
      console.error(e);
    }
  }

  console.log(edges);

  return edges;
}
