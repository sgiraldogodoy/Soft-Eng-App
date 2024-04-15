import { RouterOutput } from "@/utils/trpc";
import { columns } from "./DTColumns";
import { DataTable } from "@/components/ui/data-table";
import type { OnChangeFn, RowSelectionState } from "@tanstack/react-table";

export default function RequestTable(
  props: Omit<
    React.ComponentProps<
      typeof DataTable<RouterOutput["service"]["getAll"][0], unknown>
    > & {
      selectionState: RowSelectionState;
      setSelectionState: OnChangeFn<RowSelectionState>;
    },
    "columns"
  >,
) {
  return <DataTable {...props} columns={columns} />;
}
