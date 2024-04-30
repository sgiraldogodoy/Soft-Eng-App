import { PrescriptionForm } from "./PrescriptionForm";
import { PrescriptionTable } from "./PrescriptionTable";
import { useDiagnosis } from "./RecordDiagnosis";

export function PrescriptionViewer() {
  const diagnosis = useDiagnosis();
  console.log(diagnosis);

  return (
    <fieldset className="flex flex-col flex-1 overflow-auto border rounded p-2 ">
      <legend>Prescriptions</legend>
      <div className="flex gap-2 overflow-auto">
        <PrescriptionForm />
        <PrescriptionTable />
      </div>
    </fieldset>
  );
}
