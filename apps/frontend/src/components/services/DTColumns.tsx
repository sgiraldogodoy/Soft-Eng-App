import { ColumnDef } from "@tanstack/react-table";
import type { FlowerRequest } from "database";

export const columns: ColumnDef<FlowerRequest>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "nodeId",
    header: "Node ID",
  },
  {
    accessorKey: "flowerName",
    header: "Flower Name",
  },
  {
    accessorKey: "requestDate",
    header: "requestDate",
  },
  {
    accessorKey: "loginName",
    header: "Requestor",
  },
  {
    accessorKey: "commentOnFlower",
    header: "Comments",
  },
  {
    accessorKey: "delivered",
    header: "Delivered",
  },
];
