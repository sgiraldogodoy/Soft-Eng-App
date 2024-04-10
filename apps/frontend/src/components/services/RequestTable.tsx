import { columns } from "./DTColumns";
import { DataTable } from "@/components/ui/data-table";
import type { OnChangeFn, RowSelectionState } from "@tanstack/react-table";
import { z } from "zod";
import { BaseFormSchema } from "./formSchema";

export default function RequestTable(
  props: Omit<
    React.ComponentProps<
      typeof DataTable<z.infer<typeof BaseFormSchema>, unknown>
    > & {
      selectionState: RowSelectionState;
      setSelectionState: OnChangeFn<RowSelectionState>;
    },
    "columns"
  >,
) {
  return <DataTable {...props} columns={columns} />;
}
