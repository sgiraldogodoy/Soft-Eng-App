import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { trpc } from "@/utils/trpc";
import { toast } from "sonner";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ConnectRfidDialog({ open, onOpenChange }: Props) {
  const utils = trpc.useUtils();
  const store = trpc.rfid.store.useMutation();
  const lockMe = trpc.user.lockMe.useMutation({
    onSuccess: () => {
      utils.user.me.invalidate();
    },
  });
  const [rfid, setRfid] = useState("");

  useEffect(() => {
    const onSubmit = async () => {
      const update = store.mutateAsync(
        {
          code: rfid,
        },
        {
          onSuccess: () => {
            utils.user.getAll.invalidate();
            utils.user.getOne.invalidate();
          },
        },
      );

      toast.promise(update, {
        success: "Added badge to user!",
        loading: "Adding badge...",
        error: "Error adding badge.",
      });

      await update;

      await lockMe.mutateAsync();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      if (e.key !== "Enter") {
        setRfid(rfid + e.key);
      } else {
        onSubmit();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [rfid, setRfid, store, utils, open, lockMe]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Scan your badge!</DialogTitle>
        </DialogHeader>
        <p>Pressing keys our your keyboard may interfere with this process.</p>
      </DialogContent>
    </Dialog>
  );
}
