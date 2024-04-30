import { RouterOutput, trpc } from "@/utils/trpc.ts";
import { ColumnDef, flexRender, getCoreRowModel } from "@tanstack/react-table";
// import { useLocation } from "wouter";
import { useReactTable } from "@tanstack/react-table";

const columns: ColumnDef<RouterOutput["record"]["myRecords"][0]>[] = [
  {
    header: "Type",
    accessorKey: "type",
  },
];

export default function MyRecordsList() {
  //const me = trpc.user.me.useQuery();

  // const [, setLocation] = useLocation();
  const [records] = trpc.record.myRecords.useSuspenseQuery();

  const table = useReactTable({
    columns,
    data: records,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="flex-1 border p-4">
        <table>
          <tbody>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </tbody>
        </table>
      </div>
    </>
  );
}
