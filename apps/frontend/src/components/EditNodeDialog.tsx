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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Node, Prisma } from "database";
type NodeCreateInput = Prisma.NodeCreateInput;
import { z } from "zod";
import { node as nodeSchema } from "common";

interface editNodeDialogProps {
  node: Node;
  open: boolean;
  onSubmit: (nodeData: NodeCreateInput, oldID: string) => void;
  handleDelete: (nodeData: Node) => void;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));

export function EditNodeDialog({
  node,
  onSubmit,
  handleDelete,
  open,
  setDialogOpen,
}: editNodeDialogProps) {
  const [building, setBuilding] = useState(node.building);
  const [type, setType] = useState(node.type);
  const [elevatorletter, setElevatorLetter] = useState("");
  const [id, setID] = useState(node.id);
  const [longname, setLongName] = useState(node.longName);
  const [shortname, setShortName] = useState(node.shortName);
  const [floor, setFloor] = useState(node.floor);
  const [x, setX] = useState(node.x);
  const [y, setY] = useState(node.y);
  const [missingFields, setMissingFields] = useState(false);

  const handleElevatorLetter = (value: string) => {
    setElevatorLetter(value);
    if (floor === "1" || floor === "2" || floor === "3")
      setLongName("Elevator" + " " + value + " " + "0" + floor);
    else setLongName("Elevator" + " " + value + " " + floor);
    setShortName("Elevator" + " " + value + " " + floor);
  };

  const handleSubmit = () => {
    if (type === "ELEV" && !elevatorletter) {
      // console.log("Missing fields: ", { elevatorletter });
      setMissingFields(true);
      return;
    }
    if (!id || !building || !type || !longname || !shortname) {
      // console.log("Missing fields: ", { id, building, type, longname, shortname });
      setMissingFields(true);
      return;
    }

    setMissingFields(false);

    const nodeData = {
      id,
      building,
      floor,
      type,
      longName: longname,
      shortName: shortname,
      x,
      y,
    };

    onSubmit(nodeData, node.id);
  };

  const handleDeleteNode = () => {
    handleDelete(node);
  };

  return (
    <Dialog open={open} onOpenChange={setDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Node</DialogTitle>
          <DialogDescription>Edit Node Details</DialogDescription>
        </DialogHeader>
        {/*Delete Node ID after merge main*/}
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="id" className="text-right">
              Node ID*
            </Label>
            <Input
              id="id"
              defaultValue=""
              className="col-span-3"
              value={id}
              onChange={(event) => setID(event.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="x" className="text-right">
              X:
            </Label>
            <Input
              id="x"
              // defaultValue={x}
              className="col-span-1"
              value={x}
              onChange={(event) => setX(parseInt(event.target.value))}
            />
            <Label htmlFor="y" className="text-right">
              Y:
            </Label>
            <Input
              id="y"
              // defaultValue={y}
              className="col-span-1"
              value={y}
              onChange={(event) => setY(parseInt(event.target.value))}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="building" className="text-right">
              Building*
            </Label>
            <Select value={building} onValueChange={setBuilding}>
              {/*45 Francis, BTM, Tower, 15 Francis, Shapiro*/}
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder={building} />
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
            <Label htmlFor="floor" className="text-right">
              Floor*
            </Label>
            <Select value={floor} onValueChange={setFloor}>
              {/*45 Francis, BTM, Tower, 15 Francis, Shapiro*/}
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder={floor} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="L1">L1</SelectItem>
                <SelectItem value="L2">L2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Node Type*
            </Label>
            <Select
              value={type}
              onValueChange={(v) => {
                setType(v as z.infer<typeof nodeSchema.shape.type>);
              }}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder={type} />
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

          {type === "ELEV" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Elevator Letter" className="text-right">
                Elevator Letter*
              </Label>
              <Select
                value={elevatorletter}
                onValueChange={handleElevatorLetter}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="A-Z" />
                  <SelectContent>
                    {alphabet.map((letter) => (
                      <SelectItem key={letter} value={letter}>
                        {letter}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectTrigger>
              </Select>
            </div>
          )}

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="longname" className="text-right">
              Long Name*
            </Label>
            <Input
              id="longname"
              // defaultValue={longname}
              className="col-span-3"
              value={longname}
              onChange={(event) => setLongName(event.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="shortname" className="text-right">
              Short Name*
            </Label>
            <Input
              id="shortname"
              // defaultValue={shortname}
              className="col-span-3"
              value={shortname}
              onChange={(event) => setShortName(event.target.value)}
            />
          </div>
          {missingFields && (
            <div className="grid grid-cols-5 items-center gap-4 text-red-600">
              <span className="col-start-2 col-span-4">
                Please fill in all required fields.
              </span>
            </div>
          )}
        </div>
        <DialogFooter className="sm:justify-right">
          <Button
            onClick={handleDeleteNode}
            type="submit"
            variant="destructive"
          >
            Delete
          </Button>
          <Button onClick={handleSubmit} type="submit">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
