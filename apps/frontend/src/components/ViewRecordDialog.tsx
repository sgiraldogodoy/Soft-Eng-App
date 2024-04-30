import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { RouterOutput } from "@/utils/trpc";
import { useLocation } from "wouter";
import {
  GaugeIcon,
  HeartPulseIcon,
  ThermometerIcon,
  WindIcon,
} from "lucide-react";

interface ViewRecordDialogProps {
  record: RouterOutput["record"]["myRecords"][0];
}

export default function ViewRecordDialog({ record }: ViewRecordDialogProps) {
  const [, setLocation] = useLocation();

  return (
    <Dialog
      open={true}
      onOpenChange={(o) => {
        if (!o) {
          setLocation("/");
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Viewing {record?.type} on{" "}
            {record?.creationTime.toLocaleDateString()}
          </DialogTitle>
        </DialogHeader>
        <fieldset className="p-4 border rounded space-y-1">
          <legend className="flex flex-row gap-1 items-center px-1">
            <span className="ml-auto">Notes</span>
          </legend>
          <p>{record?.notes}</p>
        </fieldset>
        {!!record?.vitals && (
          <fieldset className="p-4 border rounded space-y-1">
            <legend className="flex flex-row gap-1 items-center px-1">
              <span className="ml-auto">Vitals</span>
            </legend>
            <div className="flex justify-between px-6">
              <div className="space-y-2">
                <div className="flex flex-col justify-start">
                  <p className="text-lg">Heart Rate</p>
                  <div className="flex items-center gap-2">
                    <HeartPulseIcon className="w-10 h-10 stroke-red-500" />
                    <p className="text-xl">
                      {record?.vitals?.heartRate
                        ? record.vitals.heartRate
                        : "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-start">
                  <p className="text-lg">Respiration Rate</p>
                  <div className="flex items-center gap-2">
                    <WindIcon className="w-10 h-10 stroke-blue-500" />
                    <p className="text-xl">
                      {record?.vitals?.respRate
                        ? record.vitals.respRate
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex flex-col justify-start">
                  <p className="text-lg">Blood Pressure</p>
                  <div className="flex items-center gap-2">
                    <GaugeIcon className="w-10 h-10 stroke-purple-500" />
                    <p className="text-xl">
                      {record?.vitals?.bloodPressure
                        ? record.vitals.bloodPressure
                        : "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-start">
                  <p className="text-lg">Body Temperature</p>
                  <div className="flex items-center gap-2">
                    <ThermometerIcon className="w-10 h-10 stroke-orange-500" />
                    <p className="text-xl">
                      {record?.vitals?.bodyTemp
                        ? record.vitals.bodyTemp
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        )}
        {record?.diagnoses.length !== 0 && (
          <fieldset className="p-4 border rounded space-y-1 overflow-auto">
            <legend className="flex flex-row gap-1 items-center px-1">
              <span className="ml-auto">Diagnoses</span>
            </legend>
            {record?.diagnoses.map((diagnosis) => {
              return (
                <div key={diagnosis.id} className="space-y-1">
                  <p className="text-xl font-medium">{diagnosis.illness}</p>
                  {diagnosis.notes && (
                    <p>
                      <span className="font-medium">Notes:</span>{" "}
                      {diagnosis.notes}
                    </p>
                  )}
                  {diagnosis.advice && (
                    <p>
                      <span className="font-medium">Advice:</span>{" "}
                      {diagnosis.advice}
                    </p>
                  )}
                  {diagnosis.prescriptions &&
                    diagnosis.prescriptions.map((prescription) => {
                      return (
                        <div key={prescription.id}>
                          <p>
                            <span className="font-medium">Drug:</span>{" "}
                            {prescription.drug}
                          </p>
                          <p>
                            <span className="font-medium">Dosage:</span>{" "}
                            {prescription.dosage}
                          </p>
                        </div>
                      );
                    })}
                </div>
              );
            })}
          </fieldset>
        )}
      </DialogContent>
    </Dialog>
  );
}
