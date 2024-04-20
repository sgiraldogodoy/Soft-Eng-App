import { PrismaClient, Edge, NodeType, Prisma } from "../.prisma/client";
import readline from "readline";
import fs from "fs";
import NodeCreateManyInput = Prisma.NodeCreateManyInput;

const prisma = new PrismaClient();

async function main() {
  const nodes: NodeCreateManyInput[] = [];

  // Parse nodes CSV
  const nodeStream = readline.createInterface({
    input: fs.createReadStream("prisma/nodes.csv"),
    terminal: false,
  });

  let i = 0;
  for await (const line of nodeStream) {
    if (i == 0) {
      i++;
      continue;
    }
    const [
      id,
      xcordsString,
      ycordsString,
      floor,
      building,
      typeString,
      longName,
      shortName,
    ] = line.split(",");
    const type = typeString as NodeType;
    const x = Number(xcordsString);
    const y = Number(ycordsString);
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

  // Save to database
  await prisma.node.createMany({ data: nodes, skipDuplicates: true });

  const edges: Edge[] = [];

  // Parse edges CSV
  const edgeStream = readline.createInterface({
    input: fs.createReadStream("prisma/edges.csv"),
    terminal: false,
  });

  i = 0;
  for await (const line of edgeStream) {
    if (i == 0) {
      i++;
      continue;
    }
    const [, startNodeId, endNodeId] = line.split(",");
    edges.push({ startNodeId, endNodeId });
    edges.push({
      startNodeId: endNodeId,
      endNodeId: startNodeId,
    });
  }

  await prisma.edge.createMany({ data: edges, skipDuplicates: true });

  await prisma.flower.deleteMany();
  for (let i = 0; i < 50; i++) {
    await prisma.flower.create({
      data: {
        flower: "Pretty Flower",
        service: {
          create: {
            nodeId: "ACONF00102",
            type: "flower",
            login: "Ace",
            priority: "HIGH",
            status: "UNASSIGNED",
            note: "Note",
          },
        },
        recipientName: "Flower",
      },
    });
  }
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
