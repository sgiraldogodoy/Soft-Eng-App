import { useState } from "react";
import StatisticsCard from "../components/analytics/StatisticsCard.tsx";

export default function Analytics() {
  const [fullScreen, setFullScreen] = useState<
    "G1" | "G2" | "G3" | "G4" | null
  >(null);

  const handleClick = (graph: string) => {
    if (fullScreen === null) {
      setFullScreen(graph as "G1" | "G2" | "G3" | "G4");
    }
  };

  const handleClose = () => {
    setFullScreen(null);
  };

  console.log(fullScreen);

  return (
    <div className="h-full overflow-auto relative">
      {fullScreen === null && (
        <div className="grid grid-cols-2 grid-rows-2 h-full">
          <div
            className="grid-item flex justify-center"
            onClick={() => {
              handleClick("G1");
            }}
          >
            <StatisticsCard
              selected={false}
              typeStatistics="Service Request Pie Chart"
            />
          </div>
          <div
            className="grid-item flex justify-center"
            onClick={() => {
              handleClick("G2");
            }}
          >
            <StatisticsCard
              selected={false}
              typeStatistics="Filter Request Bar Chart"
            />
          </div>
          <div
            className="grid-item"
            onClick={() => {
              handleClick("G3");
            }}
          >
            3
          </div>
          <div
            className="grid-item"
            onClick={() => {
              handleClick("G4");
            }}
          >
            4
          </div>
        </div>
      )}
      {fullScreen === "G1" && (
        <div className="h-full w-full overflow-auto">
          <StatisticsCard
            selected={true}
            close={handleClose}
            typeStatistics="Service Request Pie Chart"
          />
        </div>
      )}
      {fullScreen === "G2" && (
        <div className="h-full w-full overflow-auto">
          <StatisticsCard
            selected={true}
            close={handleClose}
            typeStatistics="Filter Request Bar Chart"
          />
        </div>
      )}
      {fullScreen === "G3" && (
        <div
          className="h-full w-full"
          onClick={() => {
            setFullScreen(null);
          }}
        >
          3
        </div>
      )}
      {fullScreen === "G4" && (
        <div
          className="h-full w-full"
          onClick={() => {
            setFullScreen(null);
          }}
        >
          4
        </div>
      )}
    </div>
  );
}
