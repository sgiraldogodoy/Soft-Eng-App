import { trpc } from "@/utils/trpc.ts";
import MapForNodeEditing from "@/components/MapForNodeEditing.tsx";
import { Tabs } from "@/components/ui/fancytabs.tsx";

export default function FloorTabs() {
  const nodesQuery = trpc.db.getAllNodes.useQuery();
  const edgeQuery = trpc.db.getAllEdges.useQuery();

  const tabs = [
    {
      title: "Third Floor",
      value: "third floor",
      content: (
        <div className="absolute top-0 bottom-0 w-full flex justify-center">
          <MapForNodeEditing
            nodes={nodesQuery.data} // Pass node data as a prop
            imgURL="/03_thethirdfloor.png"
            floor="3"
            className="object-cover h-full"
            edges={edgeQuery.data}
          />
        </div>
      ),
    },
    {
      title: "Second Floor",
      value: "second floor",
      content: (
        <div className="absolute top-0 bottom-0 w-full flex justify-center">
          <MapForNodeEditing
            nodes={nodesQuery.data} // Pass node data as a prop
            imgURL="/02_thesecondfloor.png"
            floor="2"
            className="object-cover h-full"
            edges={edgeQuery.data}
          />
        </div>
      ),
    },
    {
      title: "First Floor",
      value: "first floor",
      content: (
        <div className="absolute top-0 bottom-0 w-full flex justify-center">
          <MapForNodeEditing
            nodes={nodesQuery.data} // Pass node data as a prop
            imgURL="/01_thefirstfloor.png"
            floor="1"
            className="object-cover h-full"
            edges={edgeQuery.data}
          />
        </div>
      ),
    },
    {
      title: "Lower Level One",
      value: "lower level one",
      content: (
        <div className="absolute top-0 bottom-0 w-full flex justify-center">
          <MapForNodeEditing
            nodes={nodesQuery.data} // Pass node data as a prop
            imgURL="/00_thelowerlevel1.png"
            floor="L1"
            className="object-cover h-full"
            edges={edgeQuery.data}
          />
        </div>
      ),
    },
    {
      title: "Lower Level Two",
      value: "lower level two",
      content: (
        <div className="absolute top-0 bottom-0 w-full flex justify-center">
          <MapForNodeEditing
            nodes={nodesQuery.data} // Pass node data as a prop
            imgURL="/00_thelowerlevel2.png"
            floor="L2"
            className="object-cover h-full"
            edges={edgeQuery.data}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-40">
      <Tabs tabs={tabs} />
    </div>
  );
}
