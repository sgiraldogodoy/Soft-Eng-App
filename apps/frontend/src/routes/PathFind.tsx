import { useCallback, useState } from "react";
import { trpc } from "../utils/trpc.ts";
import { skipToken } from "@tanstack/react-query";
import Map from "../components/Map.tsx";
import { Settings2 } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { ArrowLeft } from "lucide-react";
import { EndNodeAutocomlete } from "@/components/EndNodeAutocomlete.tsx";
import FloorSelection from "@/components/FloorSelection.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import PathfindSettings from "@/components/PathfindSettings.tsx";
import { Button } from "@/components/ui/button.tsx";
import { TextNavigation } from "@/components/TextNav.tsx";

import { Link } from "wouter";
import { LoadingSpinner } from "@/components/ui/loader.tsx";

type Floor = "L1" | "L2" | "1" | "2" | "3";
const FLOOR_URLS: Record<Floor, string> = {
  L2: "/00_thelowerlevel2.png",
  L1: "/00_thelowerlevel1.png",
  "1": "/01_thefirstfloor.png",
  "2": "/02_thesecondfloor.png",
  "3": "/03_thethirdfloor.png",
};

export default function PathFind() {
  const [startNode, setStartNode] = useState("BINFO00202");
  const [goalNode, setGoalNode] = useState("");
  const [imgUrl, setImgUrl] = useState("/02_thesecondfloor.png");
  const [floor, setFloor] = useState("2");
  const [algorithm, setAlgorithm] = useState("A*");
  const [wheelchair, setWheelchair] = useState(true);
  const { isAuthenticated } = useAuth0();
  const nodesQuery = trpc.node.getAll.useQuery();

  if (nodesQuery.isError) {
    console.log("Error in nodesQuery");
  }

  const pathQuery = trpc.node.findPath;
  const path = pathQuery.useQuery(
    startNode && goalNode
      ? {
          startNodeId: startNode,
          endNodeId: goalNode,
          wheelchair: wheelchair,
          algorithm: algorithm,
        }
      : skipToken,
  );
  const pathData = path.data;

  const handleNodeClickInApp = (clickedNode: string) => {
    if (startNode && goalNode) {
      setStartNode(clickedNode);
      setGoalNode("");
    } else if (!startNode) {
      setStartNode(clickedNode);
    } else if (!goalNode) {
      setGoalNode(clickedNode);
      // }
    }
  };

  const handleWheelChair = () => {
    setWheelchair(!wheelchair);
  };

  const handleFloorClick = useCallback(
    (clickedFloor: string, clickedForURL: string) => {
      setImgUrl(clickedForURL);
      setFloor(clickedFloor);
    },
    [setImgUrl, setFloor],
  );

  const handleStartNode = useCallback(
    (startNode: string) => {
      setStartNode(startNode);
      const nodesData = nodesQuery?.data;
      if (nodesData) {
        const startNodeFloor = nodesData.find(
          (node) => node.id === startNode,
        )?.floor;
        if (startNodeFloor) {
          setFloor(startNodeFloor);
          setImgUrl(FLOOR_URLS[startNodeFloor as Floor]);
        }
      }
    },
    [setStartNode, setFloor, setImgUrl, nodesQuery],
  );

  if (nodesQuery.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="relative h-full">
      <Map
        onNodeClick={handleNodeClickInApp}
        nodes={nodesQuery.data}
        path={pathData}
        startNode={startNode}
        goalNode={goalNode}
        imgURL={imgUrl}
        floor={floor}
      />

      {!isAuthenticated && (
        <div className="absolute top-0 right-0 mt-4 mr-4">
          <Button
            asChild
            size="icon"
            className="backdrop-blur-[4px] bg-white/90 shadow-inner drop-shadow-md"
            variant="ghost"
          >
            <Link to="/">
              <ArrowLeft color="#000000" />
            </Link>
          </Button>
        </div>
      )}
      <div className="absolute top-12 w-full flex justify-center gap-4">
        <div className="backdrop-blur-[4px] bg-white/90 rounded-[100px] shadow-inner drop-shadow-md">
          <EndNodeAutocomlete
            Rooms={nodesQuery.data}
            onChange={(e) => setStartNode(e)}
            selectedNode={startNode}
            placeholder="Start Location"
          />
        </div>

        <div className="backdrop-blur-[4px] bg-white/90 rounded-[100px] shadow-inner drop-shadow-md">
          <EndNodeAutocomlete
            Rooms={nodesQuery.data}
            onChange={(e) => setGoalNode(e)}
            selectedNode={goalNode}
            placeholder="Where to?"
          />
        </div>
      </div>

      <div className="absolute flex gap-5 bottom-6 left-1/2 transform -translate-x-1/2">
        {isAuthenticated && (
          <div className="flex backdrop-blur-[4px] bg-white/80 gap-5 px-[30px] py-[23px] rounded-[100px] shadow-inner drop-shadow-md">
            <Popover>
              <PopoverTrigger asChild>
                <Settings2 className="cursor-pointer" />
              </PopoverTrigger>
              <PopoverContent className="w-80" sideOffset={32}>
                <PathfindSettings
                  onWheelchair={handleWheelChair}
                  onAlgorithmSelect={setAlgorithm}
                  algorithm={algorithm}
                  Rooms={nodesQuery.data}
                  onStartNodeSelect={(e) => handleStartNode(e)}
                  startNode={startNode}
                />
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
      <div className="absolute flex items-center gap-[2px] text-xl font-bold bottom-10 right-8">
        <FloorSelection onFloorClick={handleFloorClick} />
      </div>
      {pathData && pathData.length > 0 && (
        <div className="absolute bottom-2 left-2 backdrop-blur-[4px] bg-white/80 rounded-[10px] shadown-inner drop-shadow-md">
          <TextNavigation nodes={pathData} />
        </div>
      )}
      <div className="absolute bottom-2 left-2 bg-white h-fit w-fit rounded-[5px] grid grid-cols-2 m-2">
        <h1 className="font-bold text-nowrap col-span-2 pt-2 ps-2">Map Key:</h1>
        <img
          src="./mapkeyicons/restroom.png"
          alt="restroom"
          className="object-scale-down h-7 w-7 ps-2"
        />
        <p className="pe-2">Restrooms</p>
        <img
          src="./mapkeyicons/elevator.png"
          alt="elevator"
          className="object-scale-down h-7 w-7 ps-2"
        />
        <p className="">Elevator</p>
        <img
          src="./mapkeyicons/ATM.png"
          alt="ATM"
          className="object-scale-down h-7 w-7 ps-2"
        />
        <p className="">ATM</p>
        <img
          src="./mapkeyicons/cafe.png"
          alt="cafe"
          className="object-scale-down h-7 w-7 ps-2"
        />
        <p className="">Cafe</p>
        <img
          src="./mapkeyicons/emergency.png"
          alt="emergency"
          className="object-scale-down h-7 w-7 ps-2"
        />
        <p className="">Emergency</p>
        <img
          src="./mapkeyicons/giftshop.png"
          alt="giftshop"
          className="object-scale-down h-7 w-7 ps-2"
        />
        <p className="">Gift Shop</p>
        <img
          src="./mapkeyicons/information.png"
          alt="information"
          className="object-scale-down h-7 w-7 ps-2"
        />
        <p className="">Information</p>
        <img
          src="./mapkeyicons/parking.png"
          alt="parking"
          className="object-scale-down h-7 w-7 ps-2"
        />
        <p className="">Parking</p>
        <img
          src="./mapkeyicons/pharmacy.png"
          alt="pharmacy"
          className="object-scale-down h-7 w-7 ps-2"
        />
        <p className="">Pharmacy</p>
        <img
          src="./mapkeyicons/valet.png"
          alt="valet"
          className="object-scale-down h-7 w-7 ps-2"
        />
        <p className="">Valet</p>
      </div>
    </div>
  );
}
