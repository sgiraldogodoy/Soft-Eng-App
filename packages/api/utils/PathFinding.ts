import PriorityQueue from "priorityqueuejs";
import type { Node } from "database";
import type { PrismaClient } from "database";

const arbHeuristic: number = 5;

export interface PathFinding {
  run(
    root: string,
    goal: string,
    db: PrismaClient,
    dij?: boolean,
  ): Promise<Node[]>;
}

export class breadthFirstSearch implements PathFinding {
  /**
   * breadthFirstSearch function that returns a path between two nodes
   * @param root the start node
   * @param goal the end node
   * @param db the database
   * @returns the path between the two nodes
   */
  async run(root: string, goal: string, db: PrismaClient): Promise<Node[]> {
    const visited: string[] = [];

    const nodeArray = await db.node.findMany({
      include: {
        outgoing: {
          include: {
            endNode: true,
          },
        },
      },
    });

    type NodeWithOutgoing = typeof nodeArray extends Array<infer T> ? T : never;

    const nodeRecord: Record<string, NodeWithOutgoing> = nodeArray.reduce(
      (acc, node) => {
        return {
          ...acc,
          [node.id]: node,
        };
      },
      {},
    );

    const queue: { currNode: NodeWithOutgoing; path: Node[] }[] = [];

    const startNode = nodeRecord[root];
    const goalNode = nodeRecord[goal];

    queue.push({ currNode: startNode, path: [startNode] });
    while (queue.length > 0) {
      const { currNode, path } = queue.shift()!;
      if (currNode.id == goalNode.id) {
        return path;
      }

      for (const outgoingEdge of currNode.outgoing) {
        const neighbor = nodeRecord[outgoingEdge.endNode.id];

        if (!visited.includes(neighbor.id)) {
          visited.push(neighbor.id);
          queue.push({ currNode: neighbor, path: [...path, neighbor] });
        }
      }
    }

    return [];
  }
}

/**
 * aStar function that returns a path between two nodes using the A* algorithm
 * @param root start node
 * @param goal goal node
 * @param db the database
 */
export class aStar implements PathFinding {
  async run(
    root: string,
    goal: string,
    db: PrismaClient,
    dij?: boolean,
  ): Promise<Node[]> {
    const visited: string[] = [];
    const nodeArray = await db.node.findMany({
      include: {
        outgoing: {
          include: {
            endNode: true,
          },
        },
      },
    });

    type NodeWithOutgoing = typeof nodeArray extends Array<infer T> ? T : never;
    const priorityQueue = new PriorityQueue<
      NodeWithOutgoing & { path: Node[]; cost: number; priority: number }
    >((a, b) => b.priority - a.priority);
    const nodeRecord: Record<string, NodeWithOutgoing> = nodeArray.reduce(
      (acc, node) => {
        return {
          ...acc,
          [node.id]: node,
        };
      },
      {},
    );

    const startNode = nodeRecord[root];
    const goalNode = nodeRecord[goal];

    priorityQueue.enq({
      ...startNode,
      path: [startNode],
      cost: 0,
      priority: 0,
    });
    visited.push(startNode.id);
    while (!priorityQueue.isEmpty()) {
      const currNode = priorityQueue.deq(); //grab highest priority (lowest Dist)
      const path = currNode.path;
      const cost = currNode.cost;
      if (currNode.id === goalNode.id) {
        //console.log(cost);
        return path;
      }

      for (const outgoingEdge of currNode.outgoing) {
        const neighbor = nodeRecord[outgoingEdge.endNode.id];
        if (!visited.includes(neighbor.id)) {
          visited.push(neighbor.id);
          const pyth = this.pythDist(currNode, neighbor);
          let newPriority = 0;
          if (dij) {
            newPriority = cost + pyth;
          } else {
            newPriority =
              cost +
              pyth +
              this.floorChange(currNode, neighbor) +
              this.pythDist(neighbor, goalNode) +
              this.floorDist(neighbor, goalNode);
            // this.manHatt(neighbor, goalNode);
          }
          priorityQueue.enq({
            ...neighbor,
            path: [...path, neighbor],
            cost: cost + pyth,
            priority: newPriority,
          });
        }
      }
    }

    return [];
  }

  /**
   * pythDist function: calculates the distance between two nodes using the Pythagorean Theorem
   * @param currNode start node
   * @param goal end node
   */
  private pythDist(currNode: Node, goal: Node): number {
    return Math.sqrt(
      Math.pow(currNode.x - goal.x, 2) + Math.pow(currNode.y - goal.y, 2),
    );
  }

  private floorChange(currNode: Node, neighbor: Node): number {
    if (neighbor.type === "ELEV" && currNode.floor !== neighbor.floor)
      return 3000;
    else if (neighbor.type === "STAI" && currNode.floor !== neighbor.floor)
      return 6000;
    else return 0;
  }

  /**
   * floorDist function: calculates the distance between two nodes in terms of floors
   * @param currNode start node
   * @param goal end node
   */
  private floorDist(currNode: Node, goal: Node): number {
    const currNodeFloor: string = currNode.floor;
    const goalNodeFloor: string = goal.floor;
    return (
      arbHeuristic *
      Math.abs(this.floorToInt(currNodeFloor) - this.floorToInt(goalNodeFloor))
    );
  }

  private floorToInt(floor: string): number {
    if (floor === "L1") return -1;
    else if (floor === "L2") return -2;
    return parseInt(floor);
  }

  /**
   * manHatt function: calculates the Manhattan Distance (Stepping)
   * @param currNode start node
   * @param goal end node
   */
  private manHatt(currNode: Node, goal: Node): number {
    return Math.abs(currNode.x - goal.x) + Math.abs(currNode.y - goal.y);
  }
}

export class depthFirstSearch implements PathFinding {
  /**
   * breadthFirstSearch function that returns a path between two nodes
   * @param root the start node
   * @param goal the end node
   * @param db the database
   * @param dij boolean to determine if the path should be calculated using Dijkstra's algorithm
   * @returns the path between the two nodes
   */
  async run(root: string, goal: string, db: PrismaClient): Promise<Node[]> {
    const visited: string[] = [];

    const nodeArray = await db.node.findMany({
      include: {
        outgoing: {
          include: {
            endNode: true,
          },
        },
      },
    });

    type NodeWithOutgoing = typeof nodeArray extends Array<infer T> ? T : never;

    const nodeRecord: Record<string, NodeWithOutgoing> = nodeArray.reduce(
      (acc, node) => {
        return {
          ...acc,
          [node.id]: node,
        };
      },
      {},
    );

    const queue: { currNode: NodeWithOutgoing; path: Node[] }[] = [];

    const startNode = nodeRecord[root];
    const goalNode = nodeRecord[goal];

    queue.push({ currNode: startNode, path: [startNode] });
    while (queue.length > 0) {
      const { currNode, path } = queue.pop()!;
      if (currNode.id == goalNode.id) {
        return path;
      }

      for (const outgoingEdge of currNode.outgoing) {
        const neighbor = nodeRecord[outgoingEdge.endNode.id];

        if (!visited.includes(neighbor.id)) {
          visited.push(neighbor.id);
          queue.push({ currNode: neighbor, path: [...path, neighbor] });
        }
      }
    }

    return [];
  }
}

export class Context {
  private pathFindingAlg: PathFinding | undefined;

  get getPathFindingAlg(): PathFinding | undefined {
    return this.pathFindingAlg;
  }

  set setPathFindingAlg(newPathFindingAlg: PathFinding) {
    this.pathFindingAlg = newPathFindingAlg;
  }

  constructor() {
    //Dont need to do anything here
  }

  setFindPathAlg(newPathFindingAlg: PathFinding): string {
    this.pathFindingAlg = newPathFindingAlg;
    return "";
  }

  async run(
    root: string,
    goal: string,
    db: PrismaClient,
    dij?: boolean,
  ): Promise<Node[]> {
    if (this.pathFindingAlg) {
      if (dij) {
        return this.pathFindingAlg.run(root, goal, db, dij);
      } else {
        return this.pathFindingAlg.run(root, goal, db);
      }
    }
    return [];
  }
}
