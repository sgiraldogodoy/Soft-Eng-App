import { ColumnDef } from "@tanstack/react-table";
import { RouterOutput } from "@/utils/trpc";
import { DateTime } from "luxon";
import { DataTableColumnHeader } from "../ui/dt-sortable";

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
      accessorKey: "location.shortName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Location" />
      ),
    },
    {
      accessorKey: "SSN",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="SSN" />
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
        <DataTableColumnHeader column={column} title="DoB" />
      ),
      accessorFn: (row) =>
        DateTime.fromJSDate(row.dateOfBirth).toLocaleString(
          DateTime.DATE_SHORT,
        ),
      id: "dob",
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Insurance" />
      ),
      accessorKey: "insurance",
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      accessorKey: "user.email",
    },
  ];
