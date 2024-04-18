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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Node } from "database";

interface newNodeDialogProps {
  open: boolean;
  x: number;
  y: number;
  floor: string;
  onSubmit: (nodeData: Node) => void;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export function NewNodeDialog({
  x,
  y,
  floor,
  onSubmit,
  open,
  setDialogOpen,
}: newNodeDialogProps) {
  const handleSubmit = () => {
    const id = (document.getElementById("id") as HTMLInputElement)?.value;
    const building = (document.getElementById("building") as HTMLInputElement)
      ?.value;
    const type = (document.getElementById("type") as HTMLInputElement)?.value;
    const longName = (document.getElementById("longname") as HTMLInputElement)
      ?.value;
    const shortName = (document.getElementById("shortname") as HTMLInputElement)
      ?.value;

    if (!id || !building || !type || !longName || !shortName) {
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
    <Dialog open={open} onOpenChange={setDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Node</DialogTitle>
          <DialogDescription>Edit Node Details</DialogDescription>
        </DialogHeader>
        {/*Delete Node ID after merge main*/}
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
            <Select>
              {/*45 Francis, BTM, Tower, 15 Francis, Shapiro*/}
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="45 Francis">45 Francis</SelectItem>
                <SelectItem value="BTM">BTM</SelectItem>
                <SelectItem value="Tower">Tower</SelectItem>
                <SelectItem value="15 Francis">15 Francis</SelectItem>
                <SelectItem value="Shapiro">Shapiro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Node Type
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="HALL">Hallway</SelectItem>
                <SelectItem value="ELEV">Elevator</SelectItem>
                <SelectItem value="CONF">Conference Room</SelectItem>
                <SelectItem value="REST">Restroom</SelectItem>
                <SelectItem value="STAI">Staircase</SelectItem>
                <SelectItem value="DEPT">Departments</SelectItem>
                <SelectItem value="LABS">Labs</SelectItem>
                <SelectItem value="INFO">Information Desk</SelectItem>
                <SelectItem value="EXIT">Exit/Entrance</SelectItem>
                <SelectItem value="RETL">Shops & Food</SelectItem>
                <SelectItem value="SERV">Non-Medical Services</SelectItem>
              </SelectContent>
            </Select>
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
