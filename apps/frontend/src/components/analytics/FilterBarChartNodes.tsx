import { useState } from "react";
import { trpc } from "@/utils/trpc";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FloorComboBox } from "./comboboxs/floorComboBox.tsx";
import { AvailableComboBox } from "./comboboxs/availableComboBox.tsx";

import { Node } from "database";

interface FilterBarChartSRProps {
  selected: boolean;
}

export default function FilterBarChartSR({ selected }: FilterBarChartSRProps) {
  const [floor, setFloor] = useState("");
  const [available, setAvailable] = useState("");
  const nodesQuery = trpc.node.getAll.useQuery();
  let nodeData = nodesQuery.data;

  //const blueColors = ['#005a8d', '#147bcd', '#3c8dbc', '#5bc0de', '#a6d8f0']; // Different shades of blue

  if (floor || available) {
    if (floor) {
      nodeData = nodeData?.filter(
        (node: Node) => node.floor === floor.toUpperCase(),
      );
    }
    if (available) {
      if (available === "available")
        nodeData = nodeData?.filter((node: Node) => node.available);
      else nodeData = nodeData?.filter((node: Node) => !node.available);
    }
  }

  let data = [
    {
      name: "Hall Nodes",
      L2: nodeData?.filter((n: Node) => n.type === "HALL" && n.floor === "L2")
        .length,
      L1: nodeData?.filter((n: Node) => n.type === "HALL" && n.floor === "L1")
        .length,
      "1": nodeData?.filter((n: Node) => n.type === "HALL" && n.floor === "1")
        .length,
      "2": nodeData?.filter((n: Node) => n.type === "HALL" && n.floor === "2")
        .length,
      "3": nodeData?.filter((n: Node) => n.type === "HALL" && n.floor === "3")
        .length,
    },
    {
      name: "Elevator Nodes",
      L2: nodeData?.filter((n: Node) => n.type === "ELEV" && n.floor === "L2")
        .length,
      L1: nodeData?.filter((n: Node) => n.type === "ELEV" && n.floor === "L1")
        .length,
      "1": nodeData?.filter((n: Node) => n.type === "ELEV" && n.floor === "1")
        .length,
      "2": nodeData?.filter((n: Node) => n.type === "ELEV" && n.floor === "2")
        .length,
      "3": nodeData?.filter((n: Node) => n.type === "ELEV" && n.floor === "3")
        .length,
    },
    {
      name: "Restroom Nodes",
      L2: nodeData?.filter((n: Node) => n.type === "REST" && n.floor === "L2")
        .length,
      L1: nodeData?.filter((n: Node) => n.type === "REST" && n.floor === "L1")
        .length,
      "1": nodeData?.filter((n: Node) => n.type === "REST" && n.floor === "1")
        .length,
      "2": nodeData?.filter((n: Node) => n.type === "REST" && n.floor === "2")
        .length,
      "3": nodeData?.filter((n: Node) => n.type === "REST" && n.floor === "3")
        .length,
    },
    {
      name: "Stair Nodes",
      L2: nodeData?.filter((n: Node) => n.type === "STAI" && n.floor === "L2")
        .length,
      L1: nodeData?.filter((n: Node) => n.type === "STAI" && n.floor === "L1")
        .length,
      "1": nodeData?.filter((n: Node) => n.type === "STAI" && n.floor === "1")
        .length,
      "2": nodeData?.filter((n: Node) => n.type === "STAI" && n.floor === "2")
        .length,
      "3": nodeData?.filter((n: Node) => n.type === "STAI" && n.floor === "3")
        .length,
    },
    {
      name: "Department Nodes",
      L2: nodeData?.filter((n: Node) => n.type === "DEPT" && n.floor === "L2")
        .length,
      L1: nodeData?.filter((n: Node) => n.type === "DEPT" && n.floor === "L1")
        .length,
      "1": nodeData?.filter((n: Node) => n.type === "DEPT" && n.floor === "1")
        .length,
      "2": nodeData?.filter((n: Node) => n.type === "DEPT" && n.floor === "2")
        .length,
      "3": nodeData?.filter((n: Node) => n.type === "DEPT" && n.floor === "3")
        .length,
    },
    {
      name: "Lab Nodes",
      L2: nodeData?.filter((n: Node) => n.type === "LABS" && n.floor === "L2")
        .length,
      L1: nodeData?.filter((n: Node) => n.type === "LABS" && n.floor === "L1")
        .length,
      "1": nodeData?.filter((n: Node) => n.type === "LABS" && n.floor === "1")
        .length,
      "2": nodeData?.filter((n: Node) => n.type === "LABS" && n.floor === "2")
        .length,
      "3": nodeData?.filter((n: Node) => n.type === "LABS" && n.floor === "3")
        .length,
    },
    {
      name: "Info Nodes",
      L2: nodeData?.filter((n: Node) => n.type === "INFO" && n.floor === "L2")
        .length,
      L1: nodeData?.filter((n: Node) => n.type === "INFO" && n.floor === "L1")
        .length,
      "1": nodeData?.filter((n: Node) => n.type === "INFO" && n.floor === "1")
        .length,
      "2": nodeData?.filter((n: Node) => n.type === "INFO" && n.floor === "2")
        .length,
      "3": nodeData?.filter((n: Node) => n.type === "INFO" && n.floor === "3")
        .length,
    },
    {
      name: "Conference Nodes",
      L2: nodeData?.filter((n: Node) => n.type === "CONF" && n.floor === "L2")
        .length,
      L1: nodeData?.filter((n: Node) => n.type === "CONF" && n.floor === "L1")
        .length,
      "1": nodeData?.filter((n: Node) => n.type === "CONF" && n.floor === "1")
        .length,
      "2": nodeData?.filter((n: Node) => n.type === "CONF" && n.floor === "2")
        .length,
      "3": nodeData?.filter((n: Node) => n.type === "CONF" && n.floor === "3")
        .length,
    },
    {
      name: "Exit Nodes",
      L2: nodeData?.filter((n: Node) => n.type === "EXIT" && n.floor === "L2")
        .length,
      L1: nodeData?.filter((n: Node) => n.type === "EXIT" && n.floor === "L1")
        .length,
      "1": nodeData?.filter((n: Node) => n.type === "EXIT" && n.floor === "1")
        .length,
      "2": nodeData?.filter((n: Node) => n.type === "EXIT" && n.floor === "2")
        .length,
      "3": nodeData?.filter((n: Node) => n.type === "EXIT" && n.floor === "3")
        .length,
    },
    {
      name: "Retail Nodes",
      L2: nodeData?.filter((n: Node) => n.type === "RETL" && n.floor === "L2")
        .length,
      L1: nodeData?.filter((n: Node) => n.type === "RETL" && n.floor === "L1")
        .length,
      "1": nodeData?.filter((n: Node) => n.type === "RETL" && n.floor === "1")
        .length,
      "2": nodeData?.filter((n: Node) => n.type === "RETL" && n.floor === "2")
        .length,
      "3": nodeData?.filter((n: Node) => n.type === "RETL" && n.floor === "3")
        .length,
    },
    {
      name: "Service Nodes",
      L2: nodeData?.filter((n: Node) => n.type === "SERV" && n.floor === "L2")
        .length,
      L1: nodeData?.filter((n: Node) => n.type === "SERV" && n.floor === "L1")
        .length,
      "1": nodeData?.filter((n: Node) => n.type === "SERV" && n.floor === "1")
        .length,
      "2": nodeData?.filter((n: Node) => n.type === "SERV" && n.floor === "2")
        .length,
      "3": nodeData?.filter((n: Node) => n.type === "SERV" && n.floor === "3")
        .length,
    },
  ];

  data = data.filter(
    (d) =>
      d.L2 !== 0 || d.L1 !== 0 || d["1"] !== 0 || d["2"] !== 0 || d["3"] !== 0,
  );

  //130 140 148
  return (
    <>
      {selected && (
        <div className="flex flex-row items-center justify-center gap-3">
          <FloorComboBox
            handleUserChange={(value: string) => setFloor(value)}
          />
          <AvailableComboBox
            handleUserChange={(value: string) => setAvailable(value)}
          />
        </div>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="L2" stackId="a" fill="#005a8d" />
          <Bar dataKey="L1" stackId="a" fill="#147bcd" />
          <Bar dataKey="1" stackId="a" fill="#3c8dbc" />
          <Bar dataKey="2" stackId="a" fill="#5bc0de" />
          <Bar dataKey="3" stackId="a" fill="#a6d8f0" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
