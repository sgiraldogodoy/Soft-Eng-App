import type { PrismaClient } from "database";
import { open } from "node:fs/promises";
import type { WriteStream } from "node:fs";

export async function exportNodes(pathToCsv: string, prisma: PrismaClient) {
  const data = await prisma.node.findMany();

  const [writer, close] = await writeHelper(pathToCsv);

  // Write header columns. Opt not to use Object.values in case DB model order changes.
  writer.write("nodeId,xcords,ycords,building,nodeType,longName,shortName\n");

  data.forEach((d) => {
    writer.write(
      `${d.nodeId},${d.xcords},${d.ycords},${d.floor},${d.building},${d.nodeType},${d.longName},${d.shortName}\n`,
    );
  });

  return await close();
}

export async function exportEdges(pathToCsv: string, prisma: PrismaClient) {
  const data = await prisma.edge.findMany();

  const [writer, close] = await writeHelper(pathToCsv);

  // Write header columns. Opt not to use Object.values in case DB model order changes.
  writer.write("startNodeId,endNodeId\n");

  data.forEach((d) => {
    writer.write(`${d.startNodeId},${d.endNodeId}\n`);
  });

  return await close();
}

async function writeHelper(
  pathToFile: string,
): Promise<[WriteStream, () => Promise<void>]> {
  const fd = await open(pathToFile, "w+");

  return [fd.createWriteStream({ encoding: "utf8" }), () => fd.close()];
}
