import { Prisma, PrismaClient } from "database/.prisma/client";

export async function createEdges(
  edges: Prisma.EdgeCreateManyInput[],
  prisma: PrismaClient,
) {
  await prisma.edge.createMany({
    data: edges,
    skipDuplicates: true,
  });
}

export async function createNodes(
  nodes: Prisma.NodeCreateManyInput[],
  prisma: PrismaClient,
) {
  await prisma.node.createMany({
    data: nodes,
    skipDuplicates: true,
  });
}

export async function createFlowers(
  flowers: Prisma.FlowerCreateManyInput[],
  prisma: PrismaClient,
) {
  await prisma.flower.createMany({
    data: flowers,
    skipDuplicates: true,
  });
}

// populate the database with the nodes and edges
export async function addNodeDatabase(
  nodes: Prisma.NodeCreateManyInput,
  prisma: PrismaClient,
) {
  //check if the node already exists
  const node = await prisma.node.findUnique({
    where: {
      id: nodes.id,
    },
  });
  if (node) {
    console.log(`Node with ID ${nodes.id} already exists`);
    throw new Error("Node already exists");
  }
  //add the node to the database
  await prisma.node.create({
    data: nodes,
  });
  return { message: "node created" };
}

export async function addEdgeDatabase(
  edge: Prisma.EdgeCreateManyInput,
  prisma: PrismaClient,
) {
  //check if the edge already exists
  const edgeExists = await prisma.edge.findUnique({
    where: {
      id: edge.id,
    },
  });
  if (edgeExists) {
    console.log(`Edge with ID ${edge.id} already exists`);
    throw new Error("Edge already exists");
  }
  //add the edge to the database
  await prisma.edge.create({
    data: edge,
  });
  return { message: "edge created" };
}

export async function addFlowerDatabase(
  flower: Prisma.FlowerCreateManyInput,
  prisma: PrismaClient,
) {
  //check if the edge already exists
  const flowerExist = await prisma.flower.findUnique({
    where: {
      id: flower.id,
    },
  });
  if (flowerExist) {
    console.log(`Flower with ID ${flower.id} already exists`);
    throw new Error("Flower already exists");
  }
  //add the flower to the database
  await prisma.flower.create({
    data: flower,
  });
  return { message: `flower request created with id ${flower.id}` };
}
