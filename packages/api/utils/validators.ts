import { PrismaClient } from "database/.prisma/client";

export function validateNodeType(nodeType: string) {
  const types = [
    "HALL",
    "ELEV",
    "REST",
    "STAI",
    "DEPT",
    "LABS",
    "INFO",
    "CONF",
    "EXIT",
    "RETL",
    "SERV",
  ];
  if (!types.includes(nodeType)) {
    throw new Error("Invalid node type. Please enter a valid node type.");
  }

  return nodeType;
}

export function validateNodeBuilding(building: string) {
  if (building === "") {
    throw new Error(
      "Invalid building name. Please enter a valid building name.",
    );
  }

  return building;
}

export function validateNodeFloor(floorString: string) {
  /*const types = ["L2", "L1", "01", "02", "03"];
  if (!types.includes(floorString)) {
    throw new Error("Invalid floor number. Please enter a valid floor number.");
  }*/

  return floorString;
}

export function validateNodeRoomNumber(roomString: string) {
  const room = Number(roomString);
  //check room is whole number between 1 and 999
  if (isNaN(room) || room < 1 || room > 999 || !Number.isInteger(room)) {
    throw new Error("Invalid room number. Please enter a valid room number.");
  }
  //add leading zeros to room number if necessary and return a 3 digit string

  return room.toString().padStart(3, "0");
}

export function validateNodeElevatorLetter(elevatorLetter: string) {
  //check elevator letter is a single letter
  if (elevatorLetter.length !== 1 || !elevatorLetter.match(/[a-zA-Z]/)) {
    throw new Error(
      "Invalid elevator letter. Please enter a valid elevator letter.",
    );
  }

  return "00" + elevatorLetter.toUpperCase();
}

export function validateNodeXcords(xcordsString: string) {
  const xcords = Number(xcordsString);
  //check x-coordinate is a number
  if (isNaN(xcords)) {
    throw new Error("Invalid x-coordinate. Please enter a valid x-coordinate.");
  }

  return xcords;
}

export function validateNodeYcords(ycordsString: string) {
  const ycords = Number(ycordsString);
  //check y-coordinate is a number
  if (isNaN(ycords)) {
    throw new Error("Invalid y-coordinate. Please enter a valid y-coordinate.");
  }

  return ycords;
}

export function validateNodeLongName(longName: string) {
  //check long name is not empty
  if (longName === "") {
    throw new Error("Invalid long name. Please enter a valid long name.");
  }

  return longName;
}

export function validateNodeShortName(shortName: string) {
  //check short name is not empty
  if (shortName === "") {
    throw new Error("Invalid short name. Please enter a valid short name.");
  }

  return shortName;
}

export async function validateEdgeId(edgeId: string, prisma: PrismaClient) {
  //check edgeId is not empty
  if (edgeId === "") {
    throw new Error(`Empty edge ID ${edgeId}. Please enter a valid edge ID.`);
  }
  const startNode = edgeId.trim().split("_")[0];
  const endNode = edgeId.trim().split("_")[1];
  if (startNode === endNode) {
    throw new Error(
      `Invalid edge ${edgeId}. Start node and end node cannot be the same.`,
    );
  }
  if (
    startNode === (await validateEdgeStartNode(startNode, prisma)) &&
    endNode === (await validateEdgeEndNode(endNode, prisma))
  ) {
    return edgeId;
  }
  throw new Error(
    `Invalid edge ${edgeId}. Start node or end node do not exist.`,
  );
}
export async function validateEdgeStartNode(
  startNode: string,
  prisma: PrismaClient,
) {
  //check start node is an existing node in the database
  const node = await prisma.node.findUnique({
    where: {
      nodeId: startNode,
    },
  });
  if (!node) {
    throw new Error(
      "Invalid start node. Node does not exist. Please create a node with that Id first.",
    );
  }

  return startNode;
}

export async function validateEdgeEndNode(
  endNode: string,
  prisma: PrismaClient,
) {
  //check end node is an existing node in the database
  const node = await prisma.node.findUnique({
    where: {
      nodeId: endNode,
    },
  });
  if (!node) {
    throw new Error(
      "Invalid end node. Node does not exist. Please create a node with that Id first.",
    );
  }

  return endNode;
}

export async function validateNode(nodeId: string, prisma: PrismaClient) {
  //check if the node already exists
  const node = await prisma.node.findUnique({
    where: {
      nodeId: nodeId,
    },
  });
  return !!node;
}

export async function validateEdge(edgeId: string, prisma: PrismaClient) {
  //check if the edge already exists
  const edge = await prisma.edge.findUnique({
    where: {
      edgeId: edgeId,
    },
  });
  return !!edge;
}

export async function validateFlower(flowerId: string, prisma: PrismaClient) {
  //check if the flower already exists
  const flower = await prisma.flowerRequest.findUnique({
    where: {
      id: flowerId,
    },
  });
  return !!flower;
}
