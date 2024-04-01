import { PrismaClient, Node, Edge } from "../.prisma/client";
import readline from "readline";
import fs from "fs";

const prisma = new PrismaClient();

async function main() {
  const nodes: Node[] = [];

  // Parse nodes CSV
  const nodeStream = readline.createInterface({
    input: fs.createReadStream("prisma/L1Nodes.csv"),
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
  }

  // Save to database
  await prisma.node.createMany({ data: nodes, skipDuplicates: true });

  const edges: Edge[] = [];

  // Parse edges CSV
  const edgeStream = readline.createInterface({
    input: fs.createReadStream("prisma/L1Edges.csv"),
    terminal: false,
  });

  i = 0;
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
  }

  await prisma.edge.createMany({ data: edges, skipDuplicates: true });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
