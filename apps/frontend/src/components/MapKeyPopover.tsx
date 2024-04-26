import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { KeyRound } from "lucide-react";
import { useState } from "react";

export default function MapKeyPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const [clickOpen, setClickOpen] = useState(false);
  return (
    <>
      <Popover open={isOpen || clickOpen}>
        <PopoverTrigger
          asChild
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          onClick={() => setClickOpen(!clickOpen)}
        >
          <KeyRound className="cursor-pointer" />
        </PopoverTrigger>

        <PopoverContent
          className="grid grid-cols-2 grid-flow-dense w-30"
          sideOffset={32}
          style={{ gridTemplateColumns: "1fr 2fr" }}
        >
          <img
            src="./mapkeyicons/restroom.png"
            alt="restroom"
            className="object-scale-down h-8 w-8 "
          />
          <p className="">Restrooms</p>
          <img
            src="./mapkeyicons/elevator.png"
            alt="elevator"
            className="object-scale-down h-8 w-8"
          />
          <p className="">Elevator</p>
          <img
            src="./mapkeyicons/ATM.png"
            alt="ATM"
            className="object-scale-down h-8 w-8 "
          />
          <p className="">ATM</p>
          <img
            src="./mapkeyicons/cafe.png"
            alt="cafe"
            className="object-scale-down h-8 w-8 "
          />
          <p className="">Cafe</p>
          <img
            src="./mapkeyicons/emergency.png"
            alt="emergency"
            className="object-scale-down h-8 w-8 "
          />
          <p className="">Emergency</p>
          <img
            src="./mapkeyicons/giftshop.png"
            alt="giftshop"
            className="object-scale-down h-8 w-8 "
          />
          <p className="">Gift Shop</p>
          <img
            src="./mapkeyicons/information.png"
            alt="information"
            className="object-scale-down h-8 w-8 "
          />
          <p className="">Information</p>
          <img
            src="./mapkeyicons/parking.png"
            alt="parking"
            className="object-scale-down h-8 w-8 "
          />
          <p className="">Parking</p>
          <img
            src="./mapkeyicons/pharmacy.png"
            alt="pharmacy"
            className="object-scale-down h-8 w-8 "
          />
          <p className="">Pharmacy</p>
          <img
            src="./mapkeyicons/valet.png"
            alt="valet"
            className="object-scale-down h-8 w-8 "
          />
          <p className="">Valet</p>
        </PopoverContent>
      </Popover>
    </>
  );
}
