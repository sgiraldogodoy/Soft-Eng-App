import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from "@/components/ui/dialog";
import { trpc } from "@/utils/trpc.ts";
import { NodeCombobox } from "@/components/services/NodeComboBox.tsx";

interface CreateEdgeDialogProps {
  open: boolean;
  onSubmit: (startNodeId: string, endNodeId: string) => void;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CreateEdgeDialog({
  onSubmit,
  open,
  onOpenChange,
}: CreateEdgeDialogProps) {
  const [startNodeId, setStartNodeId] = useState<string>("");
  const [endNodeId, setEndNodeId] = useState<string>("");
  const [missingFields, setMissingFields] = useState(false);
  const nodesQuery = trpc.node.getAll.useQuery();
  const nodeData = nodesQuery.data;

  const unsortedNodes = nodeData?.map((node) => ({
    label: node.longName.trim(),
    value: node.id,
  }));
  const nodes = unsortedNodes?.sort((a, b) => a.label.localeCompare(b.label));

  const handleSubmit = () => {
    if (!startNodeId && !endNodeId && endNodeId !== startNodeId) {
      setMissingFields(true);
      return;
    }

    setMissingFields(false);

    onSubmit(startNodeId.toUpperCase(), endNodeId.toUpperCase());
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Edge</DialogTitle>
          <DialogDescription>Edit Edge Details</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-6 items-center gap-4">
            <label htmlFor="startNodeId" className="col-span-2">
              Start Node ID
            </label>
            <div className="col-span-4">
              <NodeCombobox
                frameworks={nodes || []}
                onValueChange={setStartNodeId}
              />
            </div>
          </div>
          <div className="grid grid-cols-6 items-center gap-4">
            <label htmlFor="endNodeId" className="col-span-2">
              End Node ID
            </label>
            <div className="col-span-4">
              <NodeCombobox
                frameworks={nodes || []}
                onValueChange={setEndNodeId}
              />
            </div>
          </div>

          {missingFields && (
            <div className="grid grid-cols-5 items-center gap-4 text-red-600">
              <span className="col-start-2 col-span-4">
                Please fill in both fields with two different nodes.
              </span>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} type="submit">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
