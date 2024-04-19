import { Prisma } from "database";
import { node as nodeSchema } from "common";
import { z } from "zod";

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
    const type = typeString as z.infer<typeof nodeSchema.shape.type>;
    const x = Number(xString);
    const y = Number(yString);
    if (
      !id ||
      !x ||
      !y ||
      !floor ||
      !building ||
      !type ||
      !longName ||
      !shortName
    ) {
      continue;
    }
    nodes.push({
      id,
      x,
      y,
      building,
      floor,
      type,
      longName,
      shortName,
    });
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
