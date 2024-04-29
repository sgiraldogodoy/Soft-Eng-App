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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CreateStaffDialogProps {
  open: boolean;
  onSubmit: (name: string, jobTitle: string) => void;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CreateStaffDialog({
  onSubmit,
  open,
  onOpenChange,
}: CreateStaffDialogProps) {
  const [name, setName] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");
  const [missingFields, setMissingFields] = useState(false);

  const handleSubmit = () => {
    if (!name || !jobTitle) {
      setMissingFields(true);
      return;
    }

    setMissingFields(false);

    onSubmit(name, jobTitle);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Staff</DialogTitle>
          <DialogDescription>Edit Staff Details</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Name" className="col-span-1">
              Name
            </Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3 w-full"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Job Title" className="col-span-1">
              Job Title
            </Label>
            <Input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="col-span-3 w-full"
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
