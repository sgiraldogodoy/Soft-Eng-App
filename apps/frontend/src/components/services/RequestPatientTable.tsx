import { RouterOutput } from "@/utils/trpc";
import { PatientDataTable } from "@/components/services/PatientDataTable.tsx";
import type { OnChangeFn, RowSelectionState } from "@tanstack/react-table";
import { patientColumns } from "@/components/services/PatientDTColumns.tsx";

export default function RequestPatientTable(
  props: Omit<
    React.ComponentProps<
      typeof PatientDataTable<RouterOutput["patient"]["getAll"][0], unknown>
    > & {
      selectionState: RowSelectionState;
      setSelectionState: OnChangeFn<RowSelectionState>;
    },
    "columns"
  >,
) {
  return <PatientDataTable {...props} columns={patientColumns} />;
}
