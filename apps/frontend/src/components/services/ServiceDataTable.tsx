import {
  ColumnDef,
  OnChangeFn,
  RowSelectionState,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import React from "react";
// import {Input} from "@/components/ui/input";
import { trpc } from "@/utils/trpc.ts";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils.ts";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  selectionState: RowSelectionState;
  setSelectionState: OnChangeFn<RowSelectionState>;
}

export function ServiceDataTable<TData extends { id: string }, TValue>({
  columns,
  data,
  selectionState,
  setSelectionState,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const unfilteredStaffQuery = trpc.staff.getAll.useQuery();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setSelectionState,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    enableMultiRowSelection: false,
    getRowId: (row) => {
      return row.id;
    },
    initialState: {
      sorting: [
        {
          id: "creationTime",
          desc: true,
        },
      ],
    },
    state: {
      columnFilters,
      rowSelection: selectionState,
    },
  });

  const unsortedStaffQuery = unfilteredStaffQuery.data
    ? unfilteredStaffQuery.data
    : [];

  const staffQuery = unsortedStaffQuery.sort(function (a, b) {
    const staffA = a.name.toUpperCase();
    const staffB = b.name.toUpperCase();
    return staffA < staffB ? -1 : staffA > staffB ? 1 : 0;
  });

  return (
    <div className="rounded-md overflow-auto">
      <div className="flex items-center py-4 px-3">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {value
                ? staffQuery.find((staff) => staff.id === value)?.name
                : "Filter by assignee..."}
              <ChevronsUpDown className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full justify-between p-0">
            <Command>
              <CommandInput placeholder="Filter by assignee..." />
              <CommandEmpty>No Assignee Found</CommandEmpty>
              <CommandGroup>
                {staffQuery.map((staff) => (
                  <CommandItem
                    key={staff.id}
                    onSelect={() => {
                      if (staff.id === value) {
                        setValue("");
                        table.getColumn("assignee")?.setFilterValue("");
                      } else {
                        setValue(staff.id);
                        table.getColumn("assignee")?.setFilterValue(staff.name);
                      }
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === staff.id ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {staff.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        {/*<Input*/}
        {/*    placeholder="Filter by assignee..."*/}
        {/*    value={*/}
        {/*        (table.getColumn("assignee")?.getFilterValue() as string) ?? ""*/}
        {/*    }*/}
        {/*    onChange={(event) =>*/}
        {/*        table.getColumn("assignee")?.setFilterValue(event.target.value)*/}
        {/*    }*/}
        {/*    className="max-w-sm"*/}
        {/*/>*/}
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    style={{
                      width:
                        header.column.getSize() === 150
                          ? undefined
                          : header.column.getSize(),
                    }}
                  >
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
                  <TableCell
                    key={cell.id}
                    style={{
                      width:
                        cell.column.getSize() === 150
                          ? undefined
                          : cell.column.getSize(),
                    }}
                  >
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
