import { Prisma } from "database";
/*import {
  /!*validateNodeType,
  validateNodeBuilding,
  validateNodeElevatorLetter,
  validateNodeFloor,
  validateNodeLongName,
  validateNodeRoomNumber,
  validateNodeShortName,
  validateNodeXcords,
  validateNodeYcords,
  validateEdgeId,*!/
} from "./validators.ts";*/
/*import readline from "readline";
import fs from "fs";*/

type Node = Prisma.NodeCreateManyInput;
type Edge = Prisma.EdgeCreateManyInput;

export async function parseCSVNode(csv: string) {
  /*const nodes: Node[] = [];

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
      /!*const nodeType = validateNodeType(nodeTypeCSV);
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
      const shortName = validateNodeShortName(shortNameCSV);*!/
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
  return nodes;*/

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
    if (
      !nodeId ||
      !xcords ||
      !ycords ||
      !floor ||
      !building ||
      !nodeType ||
      !longName ||
      !shortName
    ) {
      continue;
    }
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
      //await validateEdgeId(edgeId, prisma);

      const edgeId = `${startNodeId}_${endNodeId}`;

      edges.push({ edgeId, startNodeId, endNodeId });

      const reverseId = `${endNodeId}_${startNodeId}`;
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
