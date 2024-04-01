import { trpc } from "../utils/trpc.ts";
import React from "react";
import imgUrl from "../../public/00_thelowerlevel1.png";
//import {PathFind} from "../components/PathFind.tsx";
import { Nodes } from "../components/Nodes.tsx";

const doNothing = () => () => {
  return;
};

export default function Map() {
  const nodes = trpc.pathfinder.getNodes.useQuery();
  //const [pathOptions, setPathOptions] = useState<Partial<{startNodeId: string; endNodeId: string}>>({});

  if (nodes.isLoading) {
    return <p>Loading...</p>;
  }

  if (nodes.isError) {
    return <p>Error: {nodes.error.message}</p>;
  }

  if (!nodes.data) {
    return <p>No nodes found</p>;
  }

  return (
    <div>
      <div className="relative">
        <img src={imgUrl} />
        <Nodes onNodeClick={doNothing()} nodes={nodes.data} />
      </div>
    </div>
  );
}
