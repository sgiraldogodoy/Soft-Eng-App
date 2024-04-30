import React from "react";
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";
import { trpc } from "@/utils/trpc";
import { Node } from "database";
import { FloorComboBox } from "@/components/analytics/comboboxs/floorComboBox.tsx";

interface PieChartNodesProps {
  selected: boolean;
}
export default function PieChartNodes({ selected }: PieChartNodesProps) {
  const [floor, setFloor] = React.useState("");
  const nodesQuery = trpc.node.getAll.useQuery();
  let nodesData = nodesQuery?.data;
  let numNodes = nodesData?.length;

  if (floor != "") {
    nodesData = nodesData?.filter(
      (node: Node) => node.floor === floor.toUpperCase(),
    );
    numNodes = nodesData?.length;
  }

  const COLORS = ["#008000", "#8B0000"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const data = [
    {
      name: "Available Node",
      value: nodesData?.filter((node: Node) => node.available).length,
    },
    {
      name: "Unavailable Node",
      value: nodesData?.filter((node: Node) => !node.available).length,
    },
  ];

  console.log(data);

  // data = data.filter((d) => d.value && d.value > 0);

  const legendItems = data.map((entry, index) => (
    <li
      key={index}
      style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}
    >
      <div
        style={{
          width: "12px",
          height: "12px",
          backgroundColor: COLORS[index % COLORS.length],
          marginRight: "5px",
        }}
      />
      <span>{entry.name}</span>
    </li>
  ));

  //130 140 148
  return (
    <>
      {selected && (
        <div className="flex flex-row items-center justify-center gap-3">
          <FloorComboBox
            handleUserChange={(value: string) => setFloor(value)}
          />
        </div>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={selected ? 400 : 148}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-6 right-6">
        <ul className="list-none p-0">{legendItems}</ul>
        <ul className="list-none p-0">Number of Nodes {numNodes}</ul>
      </div>
    </>
  );
}
