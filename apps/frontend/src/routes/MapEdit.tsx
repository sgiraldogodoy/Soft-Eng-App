import { trpc } from "@/utils/trpc.ts";
import Map from "@/components/Map.tsx";
import FloorSelection from "@/components/FloorSelection.tsx";
import { useCallback, useState } from "react";
import { MapEditTab } from "@/components/MapEditToggle.tsx";
import { LoadingSpinner } from "@/components/ui/loader.tsx";

export default function MapEdit() {
  const [imgUrl, setImgUrl] = useState("/02_thesecondfloor.png");
  const [floor, setFloor] = useState("2");
  const [typeedit, setTypeEdit] = useState("Move");

  const handleEditselect = useCallback(
    (editType: string) => {
      setTypeEdit(editType);
      // console.log(editType);
    },
    [setTypeEdit],
  );

  const handleFloorClick = useCallback(
    (clickedFloor: string, clickedForURL: string) => {
      setImgUrl(clickedForURL);
      setFloor(clickedFloor);
    },
    [setImgUrl, setFloor],
  );
  const nodesQuery = trpc.node.getAll.useQuery();
  const edgeQuery = trpc.edge.getAll.useQuery();

  if (nodesQuery.isLoading || edgeQuery.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="relative h-full">
      <Map
        nodes={nodesQuery.data} // Pass node data as a prop
        imgURL={imgUrl}
        floor={floor}
        filter={true}
        editable={true}
        edges={edgeQuery.data}
        typeEdit={typeedit}
      />
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-4">
        <MapEditTab onEditSelect={handleEditselect} />
      </div>
      <div className="absolute flex items-center gap-[2px] text-xl font-bold bottom-10 right-8">
        <FloorSelection onFloorClick={handleFloorClick} />
      </div>
    </div>
  );
}
