import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import type { FlowerRequest } from "database";
import { ArrowRight, Check, X } from "lucide-react";

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
    header: "Date",
  },
  {
    accessorKey: "loginName",
    header: "Requestor",
  },
  {
    accessorKey: "delivered",
    header: "Delivered",
    cell: (props) => {
      return props.getValue() ? <Check /> : <X />;
    },
  },
  {
    id: "select",
    cell: ({ row }) => {
      return (
        <Button
          disabled={row.getIsSelected()}
          onClick={() => row.toggleSelected()}
          variant={"secondary"}
        >
          <ArrowRight />
        </Button>
      );
    },
  },
];
