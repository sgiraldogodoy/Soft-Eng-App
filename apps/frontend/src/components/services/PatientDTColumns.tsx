import { ColumnDef } from "@tanstack/react-table";
import { RouterOutput } from "@/utils/trpc";
import { DataTableColumnHeader } from "../ui/dt-sortable";
import { Button } from "@/components/ui/button.tsx";
import { ReceiptText } from "lucide-react";
import { DateTime } from "luxon";

export const patientColumns: ColumnDef<RouterOutput["patient"]["getAll"][0]>[] =
  [
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="First Name" />
      ),
      id: "firstName",
      accessorKey: "firstName",
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Last Name" />
      ),
      accessorKey: "lastName",
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Sex" />
      ),
      accessorKey: "sex",
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="DoB" />
      ),
      accessorFn: (row) =>
        DateTime.fromJSDate(row.dateOfBirth).toLocaleString(
          DateTime.DATE_SHORT,
        ),
      id: "dob",
    },
    {
      accessorKey: "location.shortName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Location" />
      ),
    },
    {
      accessorKey: "pcp.name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="PCP" />
      ),
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Insurance" />
      ),
      accessorKey: "insurance",
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
