import { ColumnDef } from "@tanstack/react-table";
import { RouterOutput } from "@/utils/trpc";
import { DateTime } from "luxon";

export const patientColumns: ColumnDef<RouterOutput["patient"]["getAll"][0]>[] =
  [
    {
      header: "First Name",
      id: "firstName",
      accessorKey: "firstName",
    },
    {
      header: "Last Name",
      accessorKey: "lastName",
    },
    {
      accessorKey: "location.shortName",
      header: "Location",
    },
    {
      accessorKey: "SSN",
      header: "SSN",
    },
    {
      accessorKey: "pcp.name",
      header: "PCP",
    },

    {
      header: "DoB",
      accessorFn: (row) =>
        DateTime.fromJSDate(row.dateOfBirth).toLocaleString(
          DateTime.DATETIME_SHORT,
        ),
    },
    {
      header: "Insurance",
      accessorKey: "insurance",
    },
    {
      header: "Email",
      accessorKey: "user.email",
    },
  ];
