import { Node } from "database";
import { AccordionTextNav } from "@/components/AccordionTextNav.tsx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TextToSpeech from "@/components/services/TextToSpeech.tsx";

const pixToFeet = 47 / 148;

// const feetToPix = 148/47;

interface TextNavigationProps {
  nodes: Node[];
}

export function TextNavigation({ nodes }: TextNavigationProps) {
  /**
   * Function to convert the pixel value to feet
   * @param pixelValue the pixel value to convert
   * @returns the feet value
   */
  function pixelToFeet(pixelValue: number): number {
    return pixelValue * pixToFeet;
  }

  // function feetToPixel(feetValue: number): number {
  //     return feetValue * feetToPix;
  // }

  function getDistanceFeet(node1: Node, node2: Node): number {
    const x1 = node1.x;
    const y1 = node1.y;
    const x2 = node2.x;
    const y2 = node2.y;

    return pixelToFeet(Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2));
  }

  function getCardinalDirection(node1: Node, node2: Node): string {
    const x1 = node1.x;
    const y1 = node1.y;
    const x2 = node2.x;
    const y2 = node2.y;

    const dx = x2 - x1;
    const dy = y2 - y1;

    if (dx === 0 && dy === 0) {
      return "You are here!";
    }

    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) {
        return "East";
      } else {
        return "West";
      }
    } else {
      if (dy > 0) {
        return "South";
      } else {
        return "North";
      }
    }
  }

  function getStart(node1: Node, node2: Node): string {
    if (node1.floor !== node2.floor) {
      if (node1.type === "STAI")
        return "Take the stairs to floor " + node2.floor;
      else return "Take the elevator to floor " + node2.floor;
    }

    return "Turn till facing " + getCardinalDirection(node1, node2);
  }

  function getLeftOrRight(node1: Node, node2: Node, node3: Node): string {
    const dx1 = node2.x - node1.x;
    const dy1 = node2.y - node1.y;
    const dx2 = node3.x - node2.x;
    const dy2 = node3.y - node2.y;
    const crossProduct = dx1 * dy2 - dy1 * dx2;
    if (crossProduct > 0) {
      return "Right";
    } else {
      return "Left";
    }
  }

  function shouldTurn(node1: Node, node2: Node, node3: Node): boolean {
    const dx1 = node2.x - node1.x;
    const dy1 = node2.y - node1.y;
    const dx2 = node3.x - node2.x;
    const dy2 = node3.y - node2.y;
    const dotProduct = dx1 * dx2 + dy1 * dy2;
    const mag1 = Math.sqrt(dx1 ** 2 + dy1 ** 2);
    const mag2 = Math.sqrt(dx2 ** 2 + dy2 ** 2);
    const angle = Math.acos(dotProduct / (mag1 * mag2)) * (180 / Math.PI);
    return angle > 30;
  }

  // function dirFilter(directions: [string, string][], floor: string): string[] {
  //   const filteredPath: string[] = [];
  //   let prevFloor = "";
  //
  //   for (const [dir, currFloor] of directions) {
  //     if (currFloor === floor) {
  //       filteredPath.push(dir);
  //       prevFloor = currFloor;
  //     } else {
  //       if (prevFloor === floor) {
  //         filteredPath.push("When Back On This Floor:");
  //       }
  //       prevFloor = currFloor;
  //     }
  //   }
  //
  //   return filteredPath;
  // }

  const directions: [string, string][] = [];
  if (nodes.length <= 0) {
    directions.push(["Error: No Path", "ERROR"]);
    return directions;
  }
  if (nodes.length === 1) {
    directions.push(["You are here!", nodes[0].floor]);
    return directions;
  }
  directions.push(["Start at " + nodes[0].longName, nodes[0].floor]);
  directions.push([getStart(nodes[0], nodes[1]), nodes[0].floor]);

  let currentWalkDistance = 0;
  for (let i = 0; i < nodes.length - 1; i++) {
    const node1 = nodes[i];
    const node2 = nodes[i + 1];
    if (i > 0) {
      const node0 = nodes[i - 1];
      if (shouldTurn(node0, node1, node2)) {
        if (currentWalkDistance > 0) {
          directions.push([
            "Walk " +
              currentWalkDistance.toFixed(0) +
              " feet to " +
              node1.longName,
            node1.floor,
          ]);
          currentWalkDistance = 0;
        }
        directions.push([
          "Turn " + getLeftOrRight(node0, node1, node2),
          node1.floor,
        ]);
      }
    }
    if (node1.floor === node2.floor) {
      const distance = getDistanceFeet(node1, node2);
      currentWalkDistance += distance;
    } else {
      if (currentWalkDistance > 0) {
        directions.push([
          "Walk " +
            currentWalkDistance.toFixed(0) +
            " feet to " +
            node1.longName,
          node1.floor,
        ]);
        currentWalkDistance = 0;
      }
      if (node1.type === "STAI") {
        directions.push([
          "Take the stairs to floor " + node2.floor,
          node1.floor,
        ]);
      } else {
        directions.push([
          "Take the elevator to floor " + node2.floor,
          node1.floor,
        ]);
      }
    }
  }
  if (currentWalkDistance > 0) {
    directions.push([
      "Walk " +
        currentWalkDistance.toFixed(0) +
        " feet to " +
        nodes[nodes.length - 1].longName,
      nodes[nodes.length - 1].floor,
    ]);
    currentWalkDistance = 0;
  }
  directions.push([
    "You have arrived at " + nodes[nodes.length - 1].longName,
    nodes[nodes.length - 1].floor,
  ]);

  // const dirFloor1 = dirFilter(directions, "1");
  // const dirFloor2 = dirFilter(directions, "2");
  // const dirFloor3 = dirFilter(directions, "3");
  // const dirFloorL1 = dirFilter(directions, "L1");
  // const dirFloorL2 = dirFilter(directions, "L2");

  function dirFilter(directions: [string, string][]): [string, string][][] {
    const dirFloor: [string, string][][] = [];
    let currentFloor: [string, string][] = [];
    let prevFloor: string = directions[0][1];

    for (let i = 0; i < directions.length; i++) {
      const currentDir = directions[i];

      if (prevFloor === currentDir[1]) {
        currentFloor.push(currentDir);
      } else {
        dirFloor.push(currentFloor);
        currentFloor = [];
        currentFloor.push(currentDir);
        prevFloor = currentDir[1];
      }
    }
    if (currentFloor.length > 0) {
      dirFloor.push(currentFloor);
    }

    return dirFloor;
  }

  // creating direction string for use with TTS
  const directionsString = directions.map(([dir]) => dir).join(", ");
  const dirFloor = dirFilter(directions);
  //console.log(directions);

  return (
    <div>
      <Accordion
        type="single"
        collapsible
        className="w-full max-h-[80vh] w-[30vw] pb-0.5"
      >
        {dirFloor.map((dir, index) => {
          return (
            <AccordionItem
              value={"Floor " + dir[0][1] + "-" + index}
              key={index}
            >
              <AccordionTrigger className=" pl-2">
                Audio Directions
              </AccordionTrigger>
              <AccordionContent>
                <TextToSpeech text={directionsString} />
              </AccordionContent>
              <AccordionTrigger className=" pl-2">
                Directions For Floor {dir[0][1]}
              </AccordionTrigger>
              <AccordionContent className="max-h-[55vh] overflow-y-auto pl-2">
                <AccordionTextNav directions={dir} />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
