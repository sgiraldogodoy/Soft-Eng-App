import RequestSummary from "@/components/services/RequestSummary";
import ServiceRequestForm, {
  FormTypes,
} from "@/components/services/ServiceRequestForm";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
// import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation.tsx";
import { motion } from "framer-motion";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function ServiceRequestPage() {
  const [variant, setVariant] = useState<FormTypes>("flower");
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("flower");
  const options = [
    {
      value: "flower",
      label: "Request Flowers",
    },
    {
      value: "room",
      label: "Request Room",
    },
    {
      value: "security",
      label: "Request Security",
    },
    {
      value: "av",
      label: "Request Audio/Visual",
    },
    {
      value: "gift",
      label: "Request Gift",
    },
    {
      value: "transport",
      label: "Request Transport",
    },
    {
      value: "it",
      label: "Request IT",
    },
    {
      value: "visitor",
      label: "Request Visitor",
    },
    {
      value: "maintenance",
      label: "Request Maintenance",
    },
    {
      value: "sanitation",
      label: "Request Sanitation",
    },
    {
      value: "religious",
      label: "Request Religious",
    },
    {
      value: "interpreter",
      label: "Request Interpreter",
    },
  ];

  return (
    <>
      {/*<BackgroundGradientAnimation className="overflow-hidden -z-10" />*/}
      <div className="absolute inset-0 flex flex-row h-[95%] w-[95%] gap-4 items-stretch justify-center pointer-events-auto mx-10 my-6">
        <RequestSummary />
        <div className="flex flex-col gap-4 items-stretch basis-1/2 shrink-0">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="justify-between w-full"
              >
                {value
                  ? options.find((SR) => SR.value === value)?.label
                  : "Select Service Request..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Select Serive Request..." />
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {options.map((SR) => (
                    <CommandItem
                      key={SR.value}
                      value={SR.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setVariant(currentValue as FormTypes);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === SR.value ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {SR.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          {/*<Tabs*/}
          {/*  value={variant}*/}
          {/*  onValueChange={(v) => {*/}
          {/*    setVariant(v as FormTypes);*/}
          {/*  }}*/}
          {/*  className="w-full items-center justify-center bg-transparent"*/}
          {/*>*/}
          {/*  <TabsList className="flex-wrap h-full justify-around w-full bg-white/90 backdrop-blur-md rounded shadow-md">*/}
          {/*    <TabsTrigger className="flex-1" value="flower">*/}
          {/*      Flower Request*/}
          {/*    </TabsTrigger>*/}
          {/*    <TabsTrigger className="flex-1" value="room">*/}
          {/*      Room Request*/}
          {/*    </TabsTrigger>*/}
          {/*    <TabsTrigger className="flex-1" value="security">*/}
          {/*      Security Request*/}
          {/*    </TabsTrigger>*/}
          {/*    <TabsTrigger className="flex-1" value="av">*/}
          {/*      Audio/Visual Request*/}
          {/*    </TabsTrigger>*/}
          {/*    <TabsTrigger className="flex-1" value="gift">*/}
          {/*      Gift Request*/}
          {/*    </TabsTrigger>*/}
          {/*    <TabsTrigger className="flex-1" value="transport">*/}
          {/*      Transport Request*/}
          {/*    </TabsTrigger>*/}
          {/*    <TabsTrigger className="flex-1" value="it">*/}
          {/*      IT Request*/}
          {/*    </TabsTrigger>*/}
          {/*    <TabsTrigger className="flex-1" value="visitor">*/}
          {/*      Visitor Request*/}
          {/*    </TabsTrigger>*/}
          {/*    <TabsTrigger className="flex-1" value="maintenance">*/}
          {/*      Maintenance Request*/}
          {/*    </TabsTrigger>*/}
          {/*    <TabsTrigger className="flex-1" value="sanitation">*/}
          {/*      Sanitation Request*/}
          {/*    </TabsTrigger>*/}
          {/*    <TabsTrigger className="flex-1" value="religious">*/}
          {/*      Religious Request*/}
          {/*    </TabsTrigger>*/}
          {/*    <TabsTrigger className="flex-1" value="interpreter">*/}
          {/*      Interpreter Request*/}
          {/*    </TabsTrigger>*/}
          {/*  </TabsList>*/}
          {/*</Tabs>*/}
          <motion.div
            key={variant}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, type: "easeOut" }}
            className="pointer-events-auto overflow-auto flex-1"
          >
            <ServiceRequestForm variant={variant} />
          </motion.div>
        </div>
      </div>
    </>
  );
}
