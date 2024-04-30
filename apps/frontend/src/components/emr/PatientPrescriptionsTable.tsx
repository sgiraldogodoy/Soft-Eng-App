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
import { RouterOutput, trpc } from "@/utils/trpc";
import { useVisit } from "./EmrVisit";
import { Button } from "../ui/button";
import { EyeIcon } from "lucide-react";
import { useLocation } from "wouter";

export function PatientPrescriptionTable() {
  const visit = useVisit();

  const [data] = trpc.patient.prescriptions.useSuspenseQuery({
    patientId: visit.patientId,
  });

  const [, setLocation] = useLocation();

  const columns: ColumnDef<RouterOutput["patient"]["prescriptions"][0]>[] = [
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Drug" />
      ),
      accessorKey: "drug",
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Issued" />
      ),
      accessorFn: ({ issued }) =>
        DateTime.fromJSDate(issued).toLocaleString(DateTime.DATETIME_MED),
      id: "issued",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const prescription = row.original;

        return (
          <Button
            onClick={() => {
              setLocation(
                `/record/${prescription.diagnosis.record.id}/diagnosis/${prescription.diagnosis.id}`,
              );
            }}
            size="icon"
            variant="ghost"
          >
            <EyeIcon />
          </Button>
        );
      },
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
          id: "issued",
          desc: true,
        },
      ],
    },
  });

  return (
    <div className="h-full rounded-md border overflow-auto relative flex-1 shadow-lg flex flex-col">
      <Table className="h-full">
        <TableHeader className="sticky top-0 bg-lime-100">
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
