import React from "react";
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";
import { trpc } from "@/utils/trpc";

interface PieChartSRProps {
  selected: boolean;
}

export default function PieChartSR({ selected }: PieChartSRProps) {
  const servicesQuery = trpc.service.getAll.useQuery();
  const allRequest = servicesQuery.data;
  const AVRequest = allRequest?.filter((r) => r.av);
  const FlowerRequest = allRequest?.filter((r) => r.flower);
  const GiftRequest = allRequest?.filter((r) => r.gift);
  const InterpreterRequest = allRequest?.filter((r) => r.interpreter);
  const ITRequest = allRequest?.filter((r) => r.it);
  const MaintenanceRequest = allRequest?.filter((r) => r.maintenance);
  const ReligiousRequest = allRequest?.filter((r) => r.religious);
  const RoomRequest = allRequest?.filter((r) => r.room);
  const SanitationRequest = allRequest?.filter((r) => r.sanitation);
  const SecurityRequest = allRequest?.filter((r) => r.security);
  const TransportRequest = allRequest?.filter((r) => r.transport);
  const VisitorRequest = allRequest?.filter((r) => r.visitor);
  const FoodRequest = allRequest?.filter((r) => r.food);
  const EquipmentRequest = allRequest?.filter((r) => r.equipment);

  const COLORS = [
    "#FF5733",
    "#3366FF",
    "#33FF57",
    "#FF33E9",
    "#33FFEC",
    "#FF33C2",
    "#3366CC",
    "#33FF99",
    "#FF3355",
    "#33CCFF",
    "#FF5733",
    "#33FF66",
    "#FF33A8",
    "#3366FF",
    "#DE87E5",
    "#8B00E6",
  ];
  const STATUSCOLORS = ["#808080", "#007FFF", "#FFA500", "#008000"];

  function handleColor(name: string): string {
    if (name.includes("Unassigned")) return STATUSCOLORS[0];
    else if (name.includes("Assigned")) return STATUSCOLORS[1];
    else if (name.includes("Progress")) return STATUSCOLORS[2];
    else return STATUSCOLORS[3];
  }

  let data01 = [
    { name: "AV Request", value: AVRequest?.length },
    { name: "Flower Request", value: FlowerRequest?.length },
    { name: "Gift Request", value: GiftRequest?.length },
    { name: "Interpreter Request", value: InterpreterRequest?.length },
    { name: "IT Request", value: ITRequest?.length },
    { name: "Maintenance Request", value: MaintenanceRequest?.length },
    { name: "Religious Request", value: ReligiousRequest?.length },
    { name: "Room Request", value: RoomRequest?.length },
    { name: "Sanitation Request", value: SanitationRequest?.length },
    { name: "Security Request", value: SecurityRequest?.length },
    { name: "Transport Request", value: TransportRequest?.length },
    { name: "Visitor Request", value: VisitorRequest?.length },
    { name: "Food Request", value: FoodRequest?.length },
    { name: "Equipment Request", value: EquipmentRequest?.length },
  ];
  let data02 = [
    {
      name: "AV Request Unassigned",
      value: AVRequest?.filter((r) => r.status === "UNASSIGNED").length,
    },
    {
      name: "AV Request Assigned",
      value: AVRequest?.filter((r) => r.status === "ASSIGNED").length,
    },
    {
      name: "AV Request In Progress",
      value: AVRequest?.filter((r) => r.status === "IN_PROGRESS").length,
    },
    {
      name: "AV Request Completed",
      value: AVRequest?.filter((r) => r.status === "COMPLETED").length,
    },
    {
      name: "Flower Request Unassigned",
      value: FlowerRequest?.filter((r) => r.status === "UNASSIGNED").length,
    },
    {
      name: "Flower Request Assigned",
      value: FlowerRequest?.filter((r) => r.status === "ASSIGNED").length,
    },
    {
      name: "Flower Request In Progress",
      value: FlowerRequest?.filter((r) => r.status === "IN_PROGRESS").length,
    },
    {
      name: "Flower Request Completed",
      value: FlowerRequest?.filter((r) => r.status === "COMPLETED").length,
    },
    {
      name: "Gift Request Unassigned",
      value: GiftRequest?.filter((r) => r.status === "UNASSIGNED").length,
    },
    {
      name: "Gift Request Assigned",
      value: GiftRequest?.filter((r) => r.status === "ASSIGNED").length,
    },
    {
      name: "Gift Request In Progress",
      value: GiftRequest?.filter((r) => r.status === "IN_PROGRESS").length,
    },
    {
      name: "Gift Request Completed",
      value: GiftRequest?.filter((r) => r.status === "COMPLETED").length,
    },
    {
      name: "Interpreter Request Unassigned",
      value: InterpreterRequest?.filter((r) => r.status === "UNASSIGNED")
        .length,
    },
    {
      name: "Interpreter Request Assigned",
      value: InterpreterRequest?.filter((r) => r.status === "ASSIGNED").length,
    },
    {
      name: "Interpreter Request In Progress",
      value: InterpreterRequest?.filter((r) => r.status === "IN_PROGRESS")
        .length,
    },
    {
      name: "Interpreter Request Completed",
      value: InterpreterRequest?.filter((r) => r.status === "COMPLETED").length,
    },
    {
      name: "IT Request Unassigned",
      value: ITRequest?.filter((r) => r.status === "UNASSIGNED").length,
    },
    {
      name: "IT Request Assigned",
      value: ITRequest?.filter((r) => r.status === "ASSIGNED").length,
    },
    {
      name: "IT Request In Progress",
      value: ITRequest?.filter((r) => r.status === "IN_PROGRESS").length,
    },
    {
      name: "IT Request Completed",
      value: ITRequest?.filter((r) => r.status === "COMPLETED").length,
    },
    {
      name: "Maintenance Request Unassigned",
      value: MaintenanceRequest?.filter((r) => r.status === "UNASSIGNED")
        .length,
    },
    {
      name: "Maintenance Request Assigned",
      value: MaintenanceRequest?.filter((r) => r.status === "ASSIGNED").length,
    },
    {
      name: "Maintenance Request In Progress",
      value: MaintenanceRequest?.filter((r) => r.status === "IN_PROGRESS")
        .length,
    },
    {
      name: "Maintenance Request Completed",
      value: MaintenanceRequest?.filter((r) => r.status === "COMPLETED").length,
    },
    {
      name: "Religious Request Unassigned",
      value: ReligiousRequest?.filter((r) => r.status === "UNASSIGNED").length,
    },
    {
      name: "Religious Request Assigned",
      value: ReligiousRequest?.filter((r) => r.status === "ASSIGNED").length,
    },
    {
      name: "Religious Request In Progress",
      value: ReligiousRequest?.filter((r) => r.status === "IN_PROGRESS").length,
    },
    {
      name: "Religious Request Completed",
      value: ReligiousRequest?.filter((r) => r.status === "COMPLETED").length,
    },
    {
      name: "Room Request Unassigned",
      value: RoomRequest?.filter((r) => r.status === "UNASSIGNED").length,
    },
    {
      name: "Room Request Assigned",
      value: RoomRequest?.filter((r) => r.status === "ASSIGNED").length,
    },
    {
      name: "Room Request In Progress",
      value: RoomRequest?.filter((r) => r.status === "IN_PROGRESS").length,
    },
    {
      name: "Room Request Completed",
      value: RoomRequest?.filter((r) => r.status === "COMPLETED").length,
    },
    {
      name: "Sanitation Request Unassigned",
      value: SanitationRequest?.filter((r) => r.status === "UNASSIGNED").length,
    },
    {
      name: "Sanitation Request Assigned",
      value: SanitationRequest?.filter((r) => r.status === "ASSIGNED").length,
    },
    {
      name: "Sanitation Request In Progress",
      value: SanitationRequest?.filter((r) => r.status === "IN_PROGRESS")
        .length,
    },
    {
      name: "Sanitation Request Completed",
      value: SanitationRequest?.filter((r) => r.status === "COMPLETED").length,
    },
    {
      name: "Security Request Unassigned",
      value: SecurityRequest?.filter((r) => r.status === "UNASSIGNED").length,
    },
    {
      name: "Security Request Assigned",
      value: SecurityRequest?.filter((r) => r.status === "ASSIGNED").length,
    },
    {
      name: "Security Request In Progress",
      value: SecurityRequest?.filter((r) => r.status === "IN_PROGRESS").length,
    },
    {
      name: "Security Request Completed",
      value: SecurityRequest?.filter((r) => r.status === "COMPLETED").length,
    },
    {
      name: "Transport Request Unassigned",
      value: TransportRequest?.filter((r) => r.status === "UNASSIGNED").length,
    },
    {
      name: "Transport Request Assigned",
      value: TransportRequest?.filter((r) => r.status === "ASSIGNED").length,
    },
    {
      name: "Transport Request In Progress",
      value: TransportRequest?.filter((r) => r.status === "IN_PROGRESS").length,
    },
    {
      name: "Transport Request Completed",
      value: TransportRequest?.filter((r) => r.status === "COMPLETED").length,
    },
    {
      name: "Visitor Request Unassigned",
      value: VisitorRequest?.filter((r) => r.status === "UNASSIGNED").length,
    },
    {
      name: "Visitor Request Assigned",
      value: VisitorRequest?.filter((r) => r.status === "ASSIGNED").length,
    },
    {
      name: "Visitor Request In Progress",
      value: VisitorRequest?.filter((r) => r.status === "IN_PROGRESS").length,
    },
    {
      name: "Visitor Request Completed",
      value: VisitorRequest?.filter((r) => r.status === "COMPLETED").length,
    },
    {
      name: "Food Request Unassigned",
      value: FoodRequest?.filter((r) => r.status === "UNASSIGNED").length,
    },
    {
      name: "Food Request Assigned",
      value: FoodRequest?.filter((r) => r.status === "ASSIGNED").length,
    },
    {
      name: "Food Request In Progress",
      value: FoodRequest?.filter((r) => r.status === "IN_PROGRESS").length,
    },
    {
      name: "Food Request Completed",
      value: FoodRequest?.filter((r) => r.status === "COMPLETED").length,
    },
    {
      name: "Equipment Request Unassigned",
      value: EquipmentRequest?.filter((r) => r.status === "UNASSIGNED").length,
    },
    {
      name: "Equipment Request Assigned",
      value: EquipmentRequest?.filter((r) => r.status === "ASSIGNED").length,
    },
    {
      name: "Equipment Request In Progress",
      value: EquipmentRequest?.filter((r) => r.status === "IN_PROGRESS").length,
    },
    {
      name: "Equipment Request Completed",
      value: EquipmentRequest?.filter((r) => r.status === "COMPLETED").length,
    },
  ];

  data01 = data01.filter((d) => d.value && d.value > 0);
  data02 = data02.filter((d) => d.value && d.value > 0);

  const legendItems = data01.map((entry, index) => (
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
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={800} height={800}>
          <Pie
            data={data01}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={selected ? 300 : 130}
            fill="#8884d8"
          >
            {data01.map((entry, index) => (
              <Cell key={"cell-$index"} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Pie
            data={data02}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={selected ? 315 : 140}
            outerRadius={selected ? 335 : 148}
            fill="#82ca9d"
            label={(entry) => entry.value + " " + entry.name}
          >
            {data02.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={handleColor(entry.name)} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-6 right-6">
        <ul className="list-none p-0">{legendItems}</ul>
      </div>
    </>
  );
}
