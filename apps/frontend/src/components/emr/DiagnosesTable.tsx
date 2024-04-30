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
import { Button } from "@/components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { trpc } from "@/utils/trpc.ts";
import { useLocation } from "wouter";
import { DateTime } from "luxon";
import type { Diagnosis } from "database";
import { RouterRecord } from "./record-type";
// import {trpc} from "@/utils/trpc.ts";
// import {skipToken} from "@tanstack/react-query";

export function DiagnosesTable({ record }: { record: RouterRecord }) {
  const data = record.diagnoses;

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [, setLocation] = useLocation();

  const deleteMutation = trpc.diagnosis.delete.useMutation();
  const utils = trpc.useUtils();

  const columns: ColumnDef<Diagnosis>[] = [
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Illness" />
      ),
      accessorKey: "illness",
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Advice" />
      ),
      accessorKey: "advice",
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created" />
      ),
      accessorFn: ({ creationTime }) =>
        DateTime.fromJSDate(creationTime).toLocaleString(DateTime.DATETIME_MED),
      id: "creationTime",
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const diagnosis = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onSelect={() =>
                  toast.promise(navigator.clipboard.writeText(diagnosis.id), {
                    success: "Diagnosis ID copied to clipboard",
                    loading: "Copying diagnosis ID...",
                    error: "Failed to copy ID",
                  })
                }
              >
                Copy diagnosis ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => {
                  setLocation(`/diagnosis/${diagnosis.id}`);
                }}
              >
                Edit diagnosis
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => {
                  setDeletingId(diagnosis.id);
                }}
              >
                Delete diagnosis
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="rounded-md border h-full">
      <AlertDialog
        open={!!deletingId}
        onOpenChange={(v) => {
          if (!v) setDeletingId(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              diagnosis and remove the data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (!deletingId) return;

                const deletion = deleteMutation.mutateAsync(
                  {
                    id: deletingId,
                  },
                  {
                    onSuccess: () => {
                      utils.record.getAll.invalidate();
                      utils.record.getOne.invalidate();
                    },
                  },
                );

                toast.promise(deletion, {
                  success: "Diagnosis successfully deleted",
                  loading: "Attempting to delete diagnosis",
                  error: "Failed to delete diagnosis",
                });
                await deletion;
                setDeletingId(null);
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Table className="h-full">
        <TableHeader className="bg-orange-100">
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
        <TableBody>
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
