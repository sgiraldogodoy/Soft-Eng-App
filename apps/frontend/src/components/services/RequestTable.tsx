import { columns } from "./DTColumns";
import { DataTable } from "@/components/ui/data-table";
import type { OnChangeFn, RowSelectionState } from "@tanstack/react-table";
import { FlowerRequest } from "database";

export default function RequestTable(
  props: Omit<
    React.ComponentProps<typeof DataTable<FlowerRequest, unknown>> & {
      selectionState: RowSelectionState;
      setSelectionState: OnChangeFn<RowSelectionState>;
    },
    "columns"
  >,
) {
  return <DataTable {...props} columns={columns} />;
}
