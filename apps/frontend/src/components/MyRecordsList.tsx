import { RouterOutput, trpc } from "@/utils/trpc.ts";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { Route, useLocation } from "wouter";
import { useReactTable } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { EyeIcon } from "lucide-react";
import { Button } from "./ui/button";
import ViewRecordDialog from "./ViewRecordDialog";
import { DataTableColumnHeader } from "./ui/dt-sortable";

export default function MyRecordsList() {
  //const me = trpc.user.me.useQuery();

  const [, setLocation] = useLocation();
  const [records] = trpc.record.myRecords.useSuspenseQuery();

  const columns: ColumnDef<RouterOutput["record"]["myRecords"][0]>[] = [
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Type" />
      ),
      accessorKey: "type",
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date" />
      ),
      id: "date",
      accessorFn: ({ creationTime }) => {
        return creationTime.toLocaleString();
      },
      sortingFn: (rowA, rowB) =>
        rowA.original.creationTime.getTime() -
        rowB.original.creationTime.getTime(),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <Button
          onClick={() => {
            setLocation(`/records/${row.original.id}`);
          }}
          variant="ghost"
          size="icon"
        >
          <EyeIcon className="w-6 h-6" />
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    columns,
    data: records,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: [
        {
          id: "date",
          desc: true,
        },
      ],
    },
  });

  return (
    <>
      <Route path="/records/:id">
        {({ id }) => (
          <ViewRecordDialog
            record={records.find((record) => record.id === id)!}
          />
        )}
      </Route>
      <div className="flex flex-col gap-3 flex-1">
        <p className="text-xl">Your records</p>
        <div className="flex-1 border p-4 rounded-xl shadow-sm">
          <Table className="overflow-auto">
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
                    className="h-20"
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
