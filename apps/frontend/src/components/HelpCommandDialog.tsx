import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button.tsx";
import React from "react";
import { navigate } from "wouter/use-browser-location";

export default function HelpCommand() {
  const [open, setOpen] = React.useState(false);

  const buttonchange = () => {
    setOpen((open) => !open);
  };

  const gohome = () => {
    navigate("/help/home", { replace: true });
    setOpen(!open);
  };

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        variant="secondary"
        onClick={buttonchange}
        className="bg-white w-fit border-2"
      >
        Search the User Manual
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search the User Manual..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Patient">
            <CommandItem onSelect={gohome}>Create Appointment</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
