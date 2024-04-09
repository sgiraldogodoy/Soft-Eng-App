import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import type { FlowerRequest } from "database";
import { ArrowRight } from "lucide-react";

export const columns: ColumnDef<FlowerRequest>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: "ID",
    enableSorting: true,
  },
  {
    accessorKey: "flowerName",
    header: "Flower Name",
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
