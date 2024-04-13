import type { PrismaClient } from "database";

export async function exportNodesToDb(db: PrismaClient): Promise<string> {
  const data = await db.node.findMany();

  let output = "";

  // Write header columns. Opt not to use Object.values in case DB model order changes.
  output += "nodeId,xcords,ycords,building,nodeType,longName,shortName\n";

  data.forEach((d) => {
    output += `${d.id},${d.x},${d.y},${d.floor},${d.building},${d.type},${d.longName},${d.shortName}\n`;
  });

  return output;
}

export async function exportEdgesToDb(db: PrismaClient): Promise<string> {
  const data = await db.edge.findMany();

  let output = "";

  // Write header columns. Opt not to use Object.values in case DB model order changes.
  output += "startNodeId,endNodeId\n";

  data.forEach((d) => {
    output += `${d.startNodeId},${d.endNodeId}\n`;
  });

  return output;
}
