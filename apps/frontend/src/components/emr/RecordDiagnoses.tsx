import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { DiagnosesTable } from "./DiagnosesTable";
import { trpc } from "@/utils/trpc";
import { toast } from "sonner";
import { useLocation } from "wouter";
import { useRecord } from "./RecordEdit";

export function RecordDiagnoses() {
  const record = useRecord();
  const utils = trpc.useUtils();

  const createDiagnosis = trpc.diagnosis.create.useMutation();
  const [, setLocation] = useLocation();

  return (
    <div className="p-4 border rounded flex flex-col gap-2 flex-1">
      <div className="flex items-center justify-between">
        <p className="font-bold">Diagnoses</p>
        <Button
          onClick={async () => {
            const creation = createDiagnosis.mutateAsync(
              {
                recordId: record.id,
              },
              {
                onSuccess: () => {
                  utils.record.getAll.invalidate();
                  utils.record.getOne.invalidate();
                  utils.diagnosis.getOne.invalidate();
                },
              },
            );

            toast.promise(creation, {
              success: "Created new diagnosis.",
              loading: "Creating diagnosis...",
              error: "Error creating diagnosis",
            });

            const newDiagnosis = await creation;

            setLocation(`/diagnosis/${newDiagnosis.id}`);
          }}
          className="self-end shrink-0 flex gap-2"
          size="sm"
        >
          <PlusIcon className="w-4 h-4" />
          New Diagnosis
        </Button>
      </div>
      <DiagnosesTable record={record} />
    </div>
  );
}
