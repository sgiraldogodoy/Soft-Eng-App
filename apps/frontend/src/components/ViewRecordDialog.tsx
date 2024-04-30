import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { trpc } from "@/utils/trpc";
import { useLocation } from "wouter";
import { Label } from "./ui/label";
// import {
//   GaugeIcon,
//   HeartPulseIcon,
//   ThermometerIcon,
//   WindIcon,
// } from "lucide-react";

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
          <DialogTitle>Viewing {record?.type}</DialogTitle>
        </DialogHeader>
        <Label>Notes: {record?.notes}</Label>
        <Label>by: {record?.author?.name}</Label>
      </DialogContent>
    </Dialog>
  );
}
