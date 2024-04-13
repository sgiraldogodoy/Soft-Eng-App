import { trpc } from "@/utils/trpc.ts";
import Map from "@/components/Map.tsx";
import FloorSelection from "@/components/FloorSelection.tsx";
import { useCallback, useState } from "react";

export default function FloorTabs() {
  const [imgUrl, setImgUrl] = useState("/02_thesecondfloor.png");
  const [floor, setFloor] = useState("2");

  const handleFloorClick = useCallback(
    (clickedFloor: string, clickedForURL: string) => {
      setImgUrl(clickedForURL);
      setFloor(clickedFloor);
    },
    [setImgUrl, setFloor],
  );
  const nodesQuery = trpc.node.getAll.useQuery();
  const edgeQuery = trpc.db.getAllEdges.useQuery();

  return (
    <div className="relative h-full">
      <Map
        nodes={nodesQuery.data} // Pass node data as a prop
        imgURL={imgUrl}
        floor={floor}
        filter={true}
        editable={true}
        edges={edgeQuery.data}
      />
      <div className="absolute flex items-center gap-[35px] text-xl font-bold bottom-12 right-32">
        <div className="flex flex-col gap-[15px]">
          <h2>3</h2>
          <h2>2</h2>
          <h2>1</h2>
          <h2>L1</h2>
          <h2>L2</h2>
        </div>
        <FloorSelection onFloorClick={handleFloorClick} />
      </div>
    </div>
  );
}
