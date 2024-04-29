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
import { UserComboBox } from "./comboboxs/userComboBox.tsx";
import { StatusComboBox } from "./comboboxs/statusComboBox.tsx";
import { PriorityComboBox } from "./comboboxs/priorityComboBox.tsx";

interface FilterBarChartSRProps {
  selected: boolean;
}

export default function FilterBarChartSR({ selected }: FilterBarChartSRProps) {
  const [user, setUser] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  // const utils = trpc.useUtils();
  const servicesQuery = trpc.service.getAll.useQuery();
  let allRequest = servicesQuery.data;

  const handleUserChange = (value: string) => {
    setUser(value);
  };
  // console.log(user);
  if (user || status || priority) {
    if (user) {
      allRequest = allRequest?.filter((u) => u.assignee?.id === user);
    }
    if (status) {
      // console.log(status.toUpperCase());
      allRequest = allRequest?.filter(
        (st) => st.status === status.toUpperCase(),
      );
    }
    if (priority) {
      allRequest = allRequest?.filter(
        (pr) => pr.priority === priority.toUpperCase(),
      );
    }
  }

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

  let data = [
    {
      name: "AV Request",
      Unassigned: AVRequest?.filter((r) => r.status === "UNASSIGNED").length,
      Assigned: AVRequest?.filter((r) => r.status === "ASSIGNED").length,
      InProgress: AVRequest?.filter((r) => r.status === "IN_PROGRESS").length,
      Completed: AVRequest?.filter((r) => r.status === "COMPLETED").length,
    },
    {
      name: "Flower Request",
      Unassigned: FlowerRequest?.filter((r) => r.status === "UNASSIGNED")
        .length,
      Assigned: FlowerRequest?.filter((r) => r.status === "ASSIGNED").length,
      InProgress: FlowerRequest?.filter((r) => r.status === "IN_PROGRESS")
        .length,
      Completed: FlowerRequest?.filter((r) => r.status === "COMPLETED").length,
    },
    {
      name: "Gift Request",
      Unassigned: GiftRequest?.filter((r) => r.status === "UNASSIGNED").length,
      Assigned: GiftRequest?.filter((r) => r.status === "ASSIGNED").length,
      InProgress: GiftRequest?.filter((r) => r.status === "IN_PROGRESS").length,
      Completed: GiftRequest?.filter((r) => r.status === "COMPLETED").length,
    },
    {
      name: "Interpreter Request",
      Unassigned: InterpreterRequest?.filter((r) => r.status === "UNASSIGNED")
        .length,
      Assigned: InterpreterRequest?.filter((r) => r.status === "ASSIGNED")
        .length,
      InProgress: InterpreterRequest?.filter((r) => r.status === "IN_PROGRESS")
        .length,
      Completed: InterpreterRequest?.filter((r) => r.status === "COMPLETED")
        .length,
    },
    {
      name: "IT Request",
      Unassigned: ITRequest?.filter((r) => r.status === "UNASSIGNED").length,
      Assigned: ITRequest?.filter((r) => r.status === "ASSIGNED").length,
      InProgress: ITRequest?.filter((r) => r.status === "IN_PROGRESS").length,
      Completed: ITRequest?.filter((r) => r.status === "COMPLETED").length,
    },
    {
      name: "Maintenance Request",
      Unassigned: MaintenanceRequest?.filter((r) => r.status === "UNASSIGNED")
        .length,
      Assigned: MaintenanceRequest?.filter((r) => r.status === "ASSIGNED")
        .length,
      InProgress: MaintenanceRequest?.filter((r) => r.status === "IN_PROGRESS")
        .length,
      Completed: MaintenanceRequest?.filter((r) => r.status === "COMPLETED")
        .length,
    },
    {
      name: "Religious Request",
      Unassigned: ReligiousRequest?.filter((r) => r.status === "UNASSIGNED")
        .length,
      Assigned: ReligiousRequest?.filter((r) => r.status === "ASSIGNED").length,
      InProgress: ReligiousRequest?.filter((r) => r.status === "IN_PROGRESS")
        .length,
      Completed: ReligiousRequest?.filter((r) => r.status === "COMPLETED")
        .length,
    },
    {
      name: "Room Request",
      Unassigned: RoomRequest?.filter((r) => r.status === "UNASSIGNED").length,
      Assigned: RoomRequest?.filter((r) => r.status === "ASSIGNED").length,
      InProgress: RoomRequest?.filter((r) => r.status === "IN_PROGRESS").length,
      Completed: RoomRequest?.filter((r) => r.status === "COMPLETED").length,
    },
    {
      name: "Sanitation Request",
      Unassigned: SanitationRequest?.filter((r) => r.status === "UNASSIGNED")
        .length,
      Assigned: SanitationRequest?.filter((r) => r.status === "ASSIGNED")
        .length,
      InProgress: SanitationRequest?.filter((r) => r.status === "IN_PROGRESS")
        .length,
      Completed: SanitationRequest?.filter((r) => r.status === "COMPLETED")
        .length,
    },
    {
      name: "Security Request",
      Unassigned: SecurityRequest?.filter((r) => r.status === "UNASSIGNED")
        .length,
      Assigned: SecurityRequest?.filter((r) => r.status === "ASSIGNED").length,
      InProgress: SecurityRequest?.filter((r) => r.status === "IN_PROGRESS")
        .length,
      Completed: SecurityRequest?.filter((r) => r.status === "COMPLETED")
        .length,
    },
    {
      name: "Transport Request",
      Unassigned: TransportRequest?.filter((r) => r.status === "UNASSIGNED")
        .length,
      Assigned: TransportRequest?.filter((r) => r.status === "ASSIGNED").length,
      InProgress: TransportRequest?.filter((r) => r.status === "IN_PROGRESS")
        .length,
      Completed: TransportRequest?.filter((r) => r.status === "COMPLETED")
        .length,
    },
    {
      name: "Visitor Request",
      Unassigned: VisitorRequest?.filter((r) => r.status === "UNASSIGNED")
        .length,
      Assigned: VisitorRequest?.filter((r) => r.status === "ASSIGNED").length,
      InProgress: VisitorRequest?.filter((r) => r.status === "IN_PROGRESS")
        .length,
      Completed: VisitorRequest?.filter((r) => r.status === "COMPLETED").length,
    },
    {
      name: "Food Request",
      Unassigned: FoodRequest?.filter((r) => r.status === "UNASSIGNED").length,
      Assigned: FoodRequest?.filter((r) => r.status === "ASSIGNED").length,
      InProgress: FoodRequest?.filter((r) => r.status === "IN_PROGRESS").length,
      Completed: FoodRequest?.filter((r) => r.status === "COMPLETED").length,
    },
    {
      name: "Equipment Request",
      Unassigned: EquipmentRequest?.filter((r) => r.status === "UNASSIGNED")
        .length,
      Assigned: EquipmentRequest?.filter((r) => r.status === "ASSIGNED").length,
      InProgress: EquipmentRequest?.filter((r) => r.status === "IN_PROGRESS")
        .length,
      Completed: EquipmentRequest?.filter((r) => r.status === "COMPLETED")
        .length,
    },
  ];

  data = data.filter(
    (d) =>
      d.Unassigned !== 0 ||
      d.Assigned !== 0 ||
      d.InProgress !== 0 ||
      d.Completed !== 0,
  );

  //130 140 148
  return (
    <>
      {selected && (
        <div className="flex flex-row items-center justify-center gap-3">
          <UserComboBox
            handleUserChange={(value: string) => handleUserChange(value)}
          />
          <StatusComboBox
            handleUserChange={(value: string) => setStatus(value)}
          />
          <PriorityComboBox
            handleUserChange={(value: string) => setPriority(value)}
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
          <Bar dataKey="Unassigned" stackId="a" fill="#87CEEB" />
          <Bar dataKey="Assigned" stackId="a" fill="#FFD700" />
          <Bar dataKey="InProgress" stackId="a" fill="#FFA500" />
          <Bar dataKey="Completed" stackId="a" fill="#008000" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
