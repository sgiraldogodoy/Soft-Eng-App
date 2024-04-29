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
import { ZCreateNodeSchema as nodeSchema } from "common";
import { z } from "zod";

const newNodeSchema = nodeSchema.omit({ id: true });

interface CreateNodeDialogProps {
  open: boolean;
  onSubmit: (nodeData: z.infer<typeof newNodeSchema>) => void;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));

export function CreateNodeDialog({
  onSubmit,
  open,
  onOpenChange,
}: CreateNodeDialogProps) {
  const [building, setBuilding] = useState("");
  const [type, setType] = useState("");
  const [elevatorletter, setElevatorLetter] = useState("");
  const [longname, setLongName] = useState("");
  const [shortname, setShortName] = useState("");
  const [missingFields, setMissingFields] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [floor, setFloor] = useState("2");

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
    if (
      !building ||
      !type ||
      !longname ||
      !shortname ||
      !x ||
      isNaN(x) ||
      isNaN(y) ||
      !y ||
      !floor
    ) {
      console.log("Missing fields: ", {
        building,
        type,
        longname,
        shortname,
        x,
        y,
        floor,
      });
      setMissingFields(true);
      return;
    }

    setMissingFields(false);

    const nodeData = {
      building,
      floor,
      type: type as z.infer<typeof nodeSchema.shape.type>,
      longName: longname,
      shortName: shortname,
      elevatorLetter: type === "ELEV" ? elevatorletter : undefined,
      x,
      y,
    };

    onSubmit(nodeData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Node</DialogTitle>
          <DialogDescription>Edit Node Details</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="x" className="text-right">
              X:
            </Label>
            <Input
              id="x"
              defaultValue=""
              className="col-span-1"
              value={x}
              onChange={(event) => setX(parseInt(event.target.value))}
            />

            <Label htmlFor="y" className="text-right">
              Y:
            </Label>
            <Input
              id="y"
              defaultValue=""
              className="col-span-1"
              value={y}
              onChange={(event) => setY(parseInt(event.target.value))}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="floor" className="text-right">
              Floor*
            </Label>
            <Select value={floor} onValueChange={setFloor}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="" />
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
            <Label htmlFor="building" className="text-right">
              Building*
            </Label>
            <Select value={building} onValueChange={setBuilding}>
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
              Node Type*
            </Label>
            <Select value={type} onValueChange={setType}>
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
              defaultValue=""
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
              defaultValue=""
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
        <DialogFooter>
          <Button onClick={handleSubmit} type="submit">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
