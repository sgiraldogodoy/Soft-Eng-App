import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { trpc } from "@/utils/trpc";
import { useLocation } from "wouter";
import {
  GaugeIcon,
  HeartPulseIcon,
  ThermometerIcon,
  WindIcon,
} from "lucide-react";

interface ViewRecordDialogProps {
  viewingId: string;
}

export default function ViewRecordDialog({ viewingId }: ViewRecordDialogProps) {
  const [record] = trpc.record.getOne.useSuspenseQuery({ id: viewingId });
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
        <DialogDescription>Notes: {record?.notes}</DialogDescription>
        {record?.vitals && (
          <fieldset className="p-4 border rounded space-y-2">
            <legend className="flex flex-row gap-1 items-center px-1">
              <span className="ml-auto">Vitals</span>
            </legend>
            <div className="flex gap-2 items-center justify-between px-8">
              <div className="flex flex-col justify-start">
                <p className="text-lg">Heart Rate</p>
                <div className="flex items-center gap-2">
                  <HeartPulseIcon className="w-12 h-12 stroke-red-500" />
                  <p className="text-xl">{record?.vitals?.heartRate}</p>
                </div>
              </div>
              <div className="flex flex-col justify-start">
                <p className="text-lg">Blood Pressure</p>
                <div className="flex items-center gap-2 justify-end">
                  <p className="text-xl">{record?.vitals?.bloodPressure}</p>
                  <GaugeIcon className="w-12 h-12 stroke-purple-500" />
                </div>
              </div>
            </div>
            <div className="flex gap-2 items-center justify-between px-8">
              <div className="flex flex-col justify-start">
                <p className="text-lg">Respiration Rate</p>
                <div className="flex items-center gap-2">
                  <WindIcon className="w-12 h-12 stroke-blue-500" />
                  <p className="text-xl">{record?.vitals?.respRate}</p>
                </div>
              </div>
              <div className="flex flex-col justify-start">
                <p className="text-lg">Body Temperature</p>
                <div className="flex items-center gap-2 justify-end">
                  <p className="text-xl">{record?.vitals?.bodyTemp}</p>
                  <ThermometerIcon className="w-12 h-12 stroke-orange-500" />
                </div>
              </div>
            </div>
          </fieldset>
        )}
        {record?.diagnoses && (
          <fieldset className="p-4 border rounded space-y-2 overflow-auto">
            <legend className="flex flex-row gap-1 items-center px-1">
              <span className="ml-auto">Diagnoses</span>
            </legend>
            {record?.diagnoses.map((diagnosis) => {
              return (
                <div key={diagnosis.id}>
                  <p className="text-xl font-medium">{diagnosis.illness}</p>
                  <p>Notes: {diagnosis.notes}</p>
                  <p>Advice: {diagnosis.advice}</p>
                </div>
              );
            })}
          </fieldset>
        )}
      </DialogContent>
    </Dialog>
  );
}
