import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import type { FlowerRequest } from "database";
import { ReceiptText } from "lucide-react";

export const columns: ColumnDef<FlowerRequest>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: "ID",
    enableSorting: true,
    size: 30,
  },
  {
    accessorKey: "flowerName",
    header: "Flower Name",
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
