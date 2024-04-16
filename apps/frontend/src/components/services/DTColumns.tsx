import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ReceiptText } from "lucide-react";
import { RouterOutput } from "@/utils/trpc";

export const columns: ColumnDef<RouterOutput["service"]["getAll"][0]>[] = [
  {
    accessorKey: "id",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "location",
    header: "Location",
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
