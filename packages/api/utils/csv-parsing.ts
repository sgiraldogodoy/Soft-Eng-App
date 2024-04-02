import { Prisma, PrismaClient } from "database";
import {
  validateNodeType,
  validateNodeBuilding,
  validateNodeElevatorLetter,
  validateNodeFloor,
  validateNodeLongName,
  validateNodeRoomNumber,
  validateNodeShortName,
  validateNodeXcords,
  validateNodeYcords,
  validateEdgeId,
} from "./validators.ts";

type Node = Prisma.NodeCreateManyInput;
type Edge = Prisma.EdgeCreateManyInput;

export async function parseCSVNode(csv: string) {
  const nodes: Node[] = [];

  const lines = csv.split(/\r?\n/);
  // Parse nodes CSV

  let i = 0;
  for await (const line of lines) {
    if (i == 0) {
      i++;
      continue;
    }
    const [
      nodeIdCSV,
      xcordsStringCSV,
      ycordsStringCSV,
      floorCSV,
      buildingCSV,
      nodeTypeCSV,
      longNameCSV,
      shortNameCSV,
    ] = line.split(",");
    let nodeIdTest = "";
    const number = nodeIdCSV.slice(5, 8);

    try {
      const nodeType = validateNodeType(nodeTypeCSV);
      const building = validateNodeBuilding(buildingCSV);
      const floor = validateNodeFloor(floorCSV);
      if (nodeType === "ELEV") {
        const elevatorLetter = validateNodeElevatorLetter(number.slice(2, 3));
        nodeIdTest = `${nodeType}${elevatorLetter}${floor}`;
        if (nodeIdTest !== nodeIdCSV.slice(1)) {
          throw new Error("Node ID does not match the node type and floor");
        }
      } else {
        const room = validateNodeRoomNumber(number);
        nodeIdTest = `${nodeType}${room}${floor}`;
        if (nodeIdTest !== nodeIdCSV.slice(1)) {
          throw new Error("Node ID does not match the node type and floor");
        }
      }
      const nodeId = nodeIdCSV;
      const xcords = validateNodeXcords(xcordsStringCSV);
      const ycords = validateNodeYcords(ycordsStringCSV);
      const longName = validateNodeLongName(longNameCSV);
      const shortName = validateNodeShortName(shortNameCSV);
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
    } catch (e) {
      console.error(e);
    }
    console.log("processing Node: " + line);
  }

  // Save to database
  return nodes;
}

export async function parseCSVEdge(csv: string, prisma: PrismaClient) {
  const edges: Edge[] = [];

  // Parse edges CSV
  const lines = csv.split(/\r?\n/);

  let i = 0;
  for await (const line of lines) {
    if (i == 0) {
      i++;
      continue;
    }
    const [startNodeId, endNodeId] = line.split(",");
    try {
      const edgeId = await validateEdgeId(
        `${startNodeId}-${endNodeId}`,
        prisma,
      );

      edges.push({ edgeId, startNodeId, endNodeId });

      const reverseId = `${endNodeId}-${startNodeId}`;
      edges.push({
        edgeId: reverseId,
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
