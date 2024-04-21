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
import { z } from "zod";
import { UserModel } from "database/zod";
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
import { Suspense, useState } from "react";
import UserEditDialog from "@/components/UserEditDialog.tsx";
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
// import {trpc} from "@/utils/trpc.ts";
// import {skipToken} from "@tanstack/react-query";

interface DataTableProps {
  data: z.infer<typeof UserModel>[];
}

export function UserTable({ data }: DataTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const deleteMutation = trpc.user.deleteOne.useMutation();
  const utils = trpc.useUtils();

  const columns: ColumnDef<z.infer<typeof UserModel>>[] = [
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      accessorKey: "name",
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      accessorKey: "email",
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Auth0 ID" />
      ),
      accessorKey: "sub",
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Role" />
      ),
      accessorKey: "role",
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const user = row.original;

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
                  toast.promise(navigator.clipboard.writeText(user.id), {
                    success: "User ID copied to clipboard",
                    loading: "Copying user ID...",
                    error: "Failed to copy User ID",
                  })
                }
              >
                Copy user ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => {
                  setEditingId(user.id);
                }}
              >
                Edit user
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => {
                  setDeletingId(user.id);
                }}
              >
                Delete user
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
              user and remove the data from our servers.
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
                      utils.user.getAll.invalidate();
                      utils.user.getOne.invalidate();
                    },
                  },
                );

                toast.promise(deletion, {
                  success: "User successfully deleted",
                  loading: "Attempting to delete user",
                  error: "Failed to delete user",
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
        <TableHeader>
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
      <Suspense>
        {editingId && (
          <UserEditDialog editingId={editingId} setEditingId={setEditingId} />
        )}
      </Suspense>
    </div>
  );
}
