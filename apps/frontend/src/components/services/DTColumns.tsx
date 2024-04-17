import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ReceiptText } from "lucide-react";
import { RouterOutput } from "@/utils/trpc";
import { DateTime } from "luxon";
import { Badge } from "../ui/badge";

export const columns: ColumnDef<RouterOutput["service"]["getAll"][0]>[] = [
  {
    header: "Created",
    id: "creationTime",
    accessorFn: (row) =>
      DateTime.fromJSDate(row.date).toLocaleString(DateTime.DATETIME_SHORT),
  },
  {
    header: "Type",
    accessorFn: (row) => row.type.toUpperCase(),
  },
  {
    accessorKey: "nodeId",
    header: "Location",
  },
  {
    accessorKey: "status",
    header: "Status",
  },

  {
    header: "Priority",
    accessorKey: "priority",
    cell: ({ row }) => (
      <Badge
        variant={
          row.getValue("priority") === "EMERGENCY" ? "destructive" : "default"
        }
      >
        {row.getValue("priority")}
      </Badge>
    ),
  },
  {
    id: "select",
    size: 40,
    cell: ({ row }) => {
      return (
        <Button
          disabled={row.getIsSelected()}
          onClick={() => row.toggleSelected()}
          variant="ghost"
          size="icon"
        >
          <ReceiptText />
        </Button>
      );
    },
  },
];
