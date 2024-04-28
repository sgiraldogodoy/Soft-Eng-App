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
import { useLocation } from "wouter";

export default function HelpCommand() {
  const [, setLocation] = useLocation();

  const [open, setOpen] = React.useState(false);

  const buttonchange = () => {
    setOpen((open) => !open);
  };

  const goback = () => {
    setLocation("/help");
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
      <Button variant="ghost" onClick={buttonchange} className="w-fit border-2">
        Search the User Manual
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search the User Manual..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Patient">
            <CommandItem onSelect={goback}>Create Appointment</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
