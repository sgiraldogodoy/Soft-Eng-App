import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ReceiptText } from "lucide-react";
import { RouterOutput } from "@/utils/trpc";
import { DateTime } from "luxon";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

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
    accessorKey: "assignee.name",
    header: "Assignee",
    id: "assignee",
  },

  {
    header: "Priority",
    accessorKey: "priority",
    cell: ({ row }) => {
      const val: string = row.getValue("priority");

      return (
        <Badge
          className={cn("capitalize", {
            "bg-purple-600": val === "EMERGENCY",
            "bg-red-600": val === "HIGH",
            "bg-orange-600": val === "MEDIUM",
            "bg-green-600": val === "LOW",
          })}
        >
          {val}
        </Badge>
      );
    },
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
