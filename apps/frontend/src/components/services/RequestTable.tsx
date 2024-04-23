import { RouterOutput } from "@/utils/trpc";
import { columns } from "./DTColumns";
import { ServiceDataTable } from "@/components/services/ServiceDataTable.tsx";
import type { OnChangeFn, RowSelectionState } from "@tanstack/react-table";

export default function RequestTable(
  props: Omit<
    React.ComponentProps<
      typeof ServiceDataTable<RouterOutput["service"]["getAll"][0], unknown>
    > & {
      selectionState: RowSelectionState;
      setSelectionState: OnChangeFn<RowSelectionState>;
    },
    "columns"
  >,
) {
  return <ServiceDataTable {...props} columns={columns} />;
}
