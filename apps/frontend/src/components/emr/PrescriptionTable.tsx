import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTableColumnHeader } from "@/components/ui/dt-sortable.tsx";
import { DateTime } from "luxon";
import { useDiagnosis } from "./RecordDiagnosis";
import type { Prescription } from "database";

export function PrescriptionTable() {
  const diagnosis = useDiagnosis();
  const data = diagnosis.prescriptions;

  const columns: ColumnDef<Prescription>[] = [
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Drug" />
      ),
      accessorKey: "drug",
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Dosage" />
      ),
      accessorKey: "dosage",
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Frequency" />
      ),
      accessorKey: "frequency",
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Pharmacy" />
      ),
      accessorKey: "pharmacy.name",
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Issued" />
      ),
      accessorFn: ({ issued }) =>
        DateTime.fromJSDate(issued).toLocaleString(DateTime.DATETIME_MED),
      id: "issued",
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: [
        {
          id: "creationTime",
          desc: true,
        },
      ],
    },
  });

  return (
    <div className="h-full rounded-md border overflow-auto relative flex-1 shadow-lg flex flex-col">
      <Table className="h-full">
        <TableHeader className="sticky top-0">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="overflow-auto">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
