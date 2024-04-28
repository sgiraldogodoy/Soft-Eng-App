import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button.tsx";
import React from "react";
import { useLocation } from "wouter";

export default function SearchCommand() {
  const [, setLocation] = useLocation();

  const [open, setOpen] = React.useState(false);

  const mapedit = () => {
    setLocation("/mapediting");
    setOpen(!open);
  };

  const nodec = () => {
    setLocation("/database/create/node");
    setOpen(!open);
  };

  const services = () => {
    setLocation("/services");
    setOpen(!open);
  };

  const database = () => {
    setLocation("/database");
    setOpen(!open);
  };

  const patients = () => {
    setLocation("/patients");
    setOpen(!open);
  };

  const cuser = () => {
    setLocation("/settings/create");
    setOpen(!open);
  };

  const muser = () => {
    setLocation("/settings");
    setOpen(!open);
  };

  const map = () => {
    setLocation("/pathfind");
    setOpen(!open);
  };

  const emr = () => {
    setLocation("/emr");
    setOpen(!open);
  };

  const buttonchange = () => {
    setOpen((open) => !open);
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
      <Button variant="ghost" onClick={buttonchange}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-terminal"
        >
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" x2="20" y1="19" y2="19" />
        </svg>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Map">
            <CommandItem onSelect={map}>Hospital Map</CommandItem>
          </CommandGroup>
          <CommandGroup heading="Map Edit">
            <CommandItem onSelect={nodec}>Create Node</CommandItem>
            <CommandItem onSelect={mapedit}>Create Edge</CommandItem>
            <CommandItem onSelect={mapedit}>Edit Node</CommandItem>
          </CommandGroup>
          <CommandGroup heading="Services">
            <CommandItem onSelect={services}>Manage Services</CommandItem>
          </CommandGroup>
          <CommandGroup heading="Patients">
            <CommandItem onSelect={patients}>Manage Patients</CommandItem>
            <CommandItem onSelect={patients}>Create Patients</CommandItem>
          </CommandGroup>
          <CommandGroup heading="Database">
            <CommandItem onSelect={database}>Manage database</CommandItem>
          </CommandGroup>
          <CommandGroup heading="Users">
            <CommandItem onSelect={muser}>Manage Users</CommandItem>
            <CommandItem onSelect={cuser}>Create Users</CommandItem>
          </CommandGroup>
          <CommandGroup>
            <CommandItem onSelect={emr}>EMR</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
