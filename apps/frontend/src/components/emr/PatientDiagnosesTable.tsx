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

export function PatientDiagnosesTable() {
  const visit = useVisit();

  const [data] = trpc.patient.diagnoses.useSuspenseQuery({
    patientId: visit.patientId,
  });

  const [, setLocation] = useLocation();

  const columns: ColumnDef<RouterOutput["patient"]["diagnoses"][0]>[] = [
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Illness" />
      ),
      accessorKey: "illness",
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created" />
      ),
      accessorFn: ({ creationTime }) =>
        DateTime.fromJSDate(creationTime).toLocaleString(DateTime.DATETIME_MED),
      id: "created",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const diagnosis = row.original;

        return (
          <Button
            onClick={() => {
              setLocation(
                `/record/${diagnosis.record.id}/diagnosis/${diagnosis.id}`,
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
        <TableHeader className="sticky top-0 bg-orange-100">
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
