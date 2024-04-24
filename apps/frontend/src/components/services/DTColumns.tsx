import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ReceiptText } from "lucide-react";
import { RouterOutput } from "@/utils/trpc";
import { DateTime } from "luxon";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { DataTableColumnHeader } from "../ui/dt-sortable";

export const columns: ColumnDef<RouterOutput["service"]["getAll"][0]>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    id: "creationTime",
    accessorFn: (row) =>
      DateTime.fromJSDate(row.date).toLocaleString(DateTime.DATETIME_SHORT),
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    accessorFn: (row) => row.type.toUpperCase(),
    id: "type",
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    accessorKey: "nodeId",
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  },
  {
    accessorKey: "assignee.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assignee" />
    ),
    id: "assignee",
  },

  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
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
