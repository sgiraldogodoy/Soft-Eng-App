import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel.tsx";

import toast, { Toaster } from "react-hot-toast";
import { FlowerFormFields } from "@/routes/FlowerRequest.tsx";
import React from "react";

export default function FlowerCarousel({
  flowerState,
  setFlowerState,
}: {
  flowerState: FlowerFormFields;
  setFlowerState: React.Dispatch<React.SetStateAction<FlowerFormFields>>;
}) {
  const notify = (name: string) => {
    setFlowerState({ ...flowerState, flowerChoice: name });
    toast(`You have selected: ${name}.`);
  };

  return (
    <div className="flex flex-col">
      <Toaster />
      <Carousel>
        <CarouselContent className="w-[400px] h-[450px] text-center">
          <CarouselItem>
            <button onClick={() => notify("Sweet & Pretty")}>
              <img src={"/sweetandpretty.png"} className="rounded-xl" />
            </button>
            <span className="text-2xl">Sweet & Pretty</span>
          </CarouselItem>
          <CarouselItem>
            <button onClick={() => notify("Dreamscape")}>
              <img src={"/dreamscape.png"} className="rounded-xl" />
            </button>
            <span className="text-2xl">Dreamscape</span>
          </CarouselItem>
          <CarouselItem>
            <button onClick={() => notify("Fiesta Bouquet")}>
              <img src={"/fiesta.png"} className="rounded-xl" />
            </button>
            <span className="text-2xl">Fiesta Bouquet</span>
          </CarouselItem>
          <CarouselItem>
            <button onClick={() => notify("Luminous Morning Bouquet")}>
              <img src={"/luminous.png"} className="rounded-xl" />
            </button>
            <span className="text-2xl">Luminous Morning Bouquet</span>
          </CarouselItem>
          <CarouselItem>
            <button onClick={() => notify("Marmalade Skies Bouquet")}>
              <img src={"/marmalade.png"} className="rounded-xl" />
            </button>
            <span className="text-2xl"> Marmalade Skies Bouquet</span>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
