import React from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Node } from "database";

interface newNodeDialogProps {
  open: boolean;
  x: number;
  y: number;
  onSubmit: (nodeData: Node) => void;
}
export function NewNodeDialog({ x, y, onSubmit, open }: newNodeDialogProps) {
  const handleSubmit = () => {
    const id = (document.getElementById("id") as HTMLInputElement)?.value;
    const building = (document.getElementById("building") as HTMLInputElement)
      ?.value;
    const floor = (document.getElementById("floor") as HTMLInputElement)?.value;
    const type = (document.getElementById("type") as HTMLInputElement)?.value;
    const longName = (document.getElementById("longname") as HTMLInputElement)
      ?.value;
    const shortName = (document.getElementById("shortname") as HTMLInputElement)
      ?.value;

    if (!id || !building || !floor || !type || !longName || !shortName) {
      // If any required field is empty, return or handle the error
      return;
    }

    const nodeData = {
      id,
      building,
      floor,
      type,
      longName,
      shortName,
      x,
      y,
    };

    onSubmit(nodeData);
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Node</DialogTitle>
          <DialogDescription>Edit Node Details</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="id" className="text-right">
              Node ID
            </Label>
            <Input id="id" defaultValue="" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="building" className="text-right">
              Building
            </Label>
            <Input id="building" defaultValue="" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="floor" className="text-right">
              Floor
            </Label>
            <Input id="floor" defaultValue="" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Input id="type" defaultValue="" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="longname" className="text-right">
              Long Name
            </Label>
            <Input id="longname" defaultValue="" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="shortname" className="text-right">
              Short Name
            </Label>
            <Input id="shortname" defaultValue="" className="col-span-3" />
          </div>
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
