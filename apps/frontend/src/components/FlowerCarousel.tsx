import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel.tsx";

import Sweet from "../../public/sweetandpretty.png";
import Dreamscape from "../../public/dreamscape.png";
import Fiesta from "../../public/fiesta.png";
import Luminous from "../../public/luminous.png";
import Marmalade from "../../public/marmalade.png";
import toast, { Toaster } from "react-hot-toast";

const notify = (name: string) => toast(`You have selected: ${name}.`);

export default function FlowerCarousel() {
  return (
    <div className="flex flex-col">
      <Toaster />
      <Carousel>
        <CarouselContent className="w-[400px] h-[450px] text-center">
          <CarouselItem>
            <button onClick={() => notify("Sweet & Pretty")}>
              <img src={Sweet} className="rounded-xl" />
            </button>
            <span className="text-2xl">Sweet & Pretty</span>
          </CarouselItem>
          <CarouselItem>
            <button onClick={() => notify("Dreamscape")}>
              <img src={Dreamscape} className="rounded-xl" />
            </button>
            <span className="text-2xl">Dreamscape</span>
          </CarouselItem>
          <CarouselItem>
            <button onClick={() => notify("Fiesta Bouquet")}>
              <img src={Fiesta} className="rounded-xl" />
            </button>
            <span className="text-2xl">Fiesta Bouquet</span>
          </CarouselItem>
          <CarouselItem>
            <button onClick={() => notify("Luminous Morning Bouquet")}>
              <img src={Luminous} className="rounded-xl" />
            </button>
            <span className="text-2xl">Luminous Morning Bouquet</span>
          </CarouselItem>
          <CarouselItem>
            <button onClick={() => notify("Marmalade Skies Bouquet")}>
              <img src={Marmalade} className="rounded-xl" />
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
