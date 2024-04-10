import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ReceiptText } from "lucide-react";
import { BaseFormSchema } from "./formSchema";
import { z } from "zod";

export const columns: ColumnDef<z.infer<typeof BaseFormSchema>>[] = [
  {
    accessorKey: "type",
    header: "Type",
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
