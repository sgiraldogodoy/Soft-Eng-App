import { useParams } from "wouter";
import { trpc } from "@/utils/trpc";
import { skipToken } from "@tanstack/react-query";
import { TextNavigation } from "@/components/TextNav.tsx";
import { useCallback, useState } from "react";
import Map from "@/components/Map.tsx";

export default function PhoneTextToNav() {
  const pathQuery = trpc.node.findPath;
  const nodesQuery = trpc.node.getAll.useQuery();
  const [imgUrl, setImgUrl] = useState("/02_thesecondfloor.png");
  const [floor, setFloor] = useState("2");

  //?startNodeId=AELEV00S01&endNodeId=CHALL007L1&algorith=A*&wheelchair=true
  //http://localhost:3000/phonenav?startNodeId=AELEV00S01&endNodeId=CHALL007L1&algorith=A*&wheelchair=true
  //http://localhost:3000/phonenav/AELEV00S01/CHALL007L1/A*/true

  const params = useParams();
  console.log(params);
  const startNodeId = params.startNodeId;
  const endNodeId = params.endNodeId;
  const algorithm = params.algorithm;
  const wheelchair = params.wheelchair === "true";

  console.log(startNodeId, endNodeId, wheelchair, algorithm);

  const path = pathQuery.useQuery(
    startNodeId && endNodeId && wheelchair && algorithm
      ? {
          startNodeId: startNodeId,
          endNodeId: endNodeId,
          wheelchair: wheelchair,
          algorithm: algorithm,
        }
      : skipToken,
  );
  const pathData = path.data;

  const handleFloorClick = useCallback(
    (clickedFloor: string, clickedForURL: string) => {
      setImgUrl(clickedForURL);
      setFloor(clickedFloor);
    },
    [setImgUrl, setFloor],
  );

  return (
    <div className="h-screen">
      <div className="h-full w-full">
        <div className="relative">
          <Map
            nodes={nodesQuery.data}
            path={pathData}
            startNode={startNodeId}
            goalNode={endNodeId}
            imgURL={imgUrl}
            floor={floor}
          />
        </div>
        {pathData && pathData.length > 0 && (
          <div className="absolute backdrop-blur-[4px] bg-white/80 rounded-[10px] shadown-inner drop-shadow-md w-full">
            <TextNavigation
              nodes={pathData}
              onFloorClick={handleFloorClick}
              onPhone={true}
            />
          </div>
        )}
      </div>
    </div>
  );
}
