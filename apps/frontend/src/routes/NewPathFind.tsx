import { useState } from "react";
import { trpc } from "../utils/trpc.ts";
import { skipToken } from "@tanstack/react-query";
import Map from "../components/Map.tsx";
import { Settings2, Layers, Plus, Minus } from "lucide-react";
import { PFAutoComplete } from "@/components/pfAutoComplete.tsx";
// // import { Input } from "@/components/ui/input";
// import { Switch } from "@/components/ui/switch";
// import { SquareArrowLeft } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Link } from "wouter";
// import { useAuth0 } from "@auth0/auth0-react";
// import { PathFindRoomSelection } from "@/components/PickRoomForPathFind.tsx";

export default function NewPathFind() {
  const [startNode, setStartNode] = useState("");
  const [goalNode, setGoalNode] = useState("");
  // const { isAuthenticated } = useAuth0();
  const imgUrl = "/00_thelowerlevel1.png";
  const nodesQuery = trpc.db.getAllNodes.useQuery();

  if (nodesQuery.isError) {
    console.log("Error in nodesQuery");
  }
  if (nodesQuery.isLoading) {
    console.log("Nodes are loading");
  }

  const pathQuery = trpc.pathfinder.findPath;
  const path = pathQuery.useQuery(
    startNode && goalNode
      ? { startNodeId: startNode, endNodeId: goalNode, algorithm: "A*" }
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
    }
  };

  return (
    <div className="relative h-full">
      <Map
        onNodeClick={handleNodeClickInApp}
        nodes={nodesQuery.data}
        path={pathData}
        startNode={startNode}
        goalNode={goalNode}
        imgURL={imgUrl}
        floor={"L1"}
      />

      <div className="absolute backdrop-blur-[4px] bg-white/30 top-12 left-1/2 transform -translate-x-1/2 rounded-[100px]">
        <PFAutoComplete
          Rooms={nodesQuery.data}
          onChange={(e) => setGoalNode(e)}
          selectedNode={goalNode}
        />
      </div>
      <div className="absolute flex gap-5 bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="flex backdrop-blur-[4px] bg-white/30 gap-5 px-[30px] py-[23px] rounded-[100px]">
          <Layers className="cursor-pointer" />
          <Settings2 className="cursor-pointer" />
        </div>
        <div className="flex backdrop-blur-xl bg-white/30 gap-5 px-[30px] py-[23px] rounded-[100px]">
          <Plus className="cursor-pointer" />
          <Minus className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

// const [startNode, setStartNode] = useState("");
// const [goalNode, setGoalNode] = useState("");
// const [isChecked, setChecked] = useState(false);
// const { isAuthenticated } = useAuth0();
// const imgURL = "/00_thelowerlevel1.png";
// const floor = "L1";
// const whichAlg = isChecked ? "BFS" : "A*";
//
// // Node query
// const nodesQuery = trpc.db.getAllNodes.useQuery();
//
// // Path query
// const pathQuery = trpc.pathfinder.findPath;
// const path = pathQuery.useQuery(
//     startNode && goalNode
//         ? { startNodeId: startNode, endNodeId: goalNode, algorithm: whichAlg }
//         : skipToken,
// );
// const pathData = path.data;
//
// const handleNodeClickInApp = (clickedNode: string) => {
//     if (startNode && goalNode) {
//         setStartNode(clickedNode);
//         setGoalNode("");
//     } else if (!startNode) {
//         setStartNode(clickedNode);
//     } else if (!goalNode) {
//         setGoalNode(clickedNode);
//     }
// };
//
// return (
//     <div className="max-h-screen overflow-hidden">
//         <h1 className="mt-4 text-2xl flex items-center justify-center font-bold mb-4">
//             Where would you like to go?
//             {!isAuthenticated && (
//                 <div className="absolute top-0 right-0 mt-4 mr-4">
//                     <Link to="/">
//                         <Button>
//                             <SquareArrowLeft size={20} />
//                         </Button>
//                     </Link>
//                 </div>
//             )}
//         </h1>
//
//         <div className="flex flex-row items-center gap-4 justify-center">
//             <div className="w-1/2">
//                 {/* This div takes up 50% of the screen width */}
//                 <div className="flex flex-row gap-4 items-end">
//                     <div className="flex flex-col gap-2 flex-1 mb-4">
//                         <label className="inline-block mb-4">Start Location:</label>
//                         <PathFindRoomSelection
//                             Rooms={nodesQuery.data}
//                             onChange={(e) => setStartNode(e)}
//                             selectedNode={startNode}
//                         />
//                     </div>
//                     {/*<PickRoomForPathFind Rooms={nodesQuery.data} />*/}
//                     <div className="flex flex-col gap-2 flex-1 mb-4">
//                         <label className="inline-block mb-4">Target Location:</label>
//                         <PathFindRoomSelection
//                             Rooms={nodesQuery.data}
//                             onChange={(e) => setGoalNode(e)}
//                             selectedNode={goalNode}
//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>
//         <div className="flex gap-2">
//             <div className="w-full flex items-center justify-center">
//                 <Map
//                     onNodeClick={handleNodeClickInApp}
//                     nodes={nodesQuery.data} // Pass node data as a prop
//                     path={pathData} // Pass path data as a prop
//                     startNode={startNode}
//                     goalNode={goalNode}
//                     imgURL={imgURL}
//                     floor={floor}
//                 />
//             </div>
//         </div>
//     </div>
// );
