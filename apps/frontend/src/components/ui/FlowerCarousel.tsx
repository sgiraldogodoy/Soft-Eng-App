import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel.tsx";
import Sweet from "../../../public/sweetandpretty.png";
import Dreamscape from "../../../public/dreamscape.png";
import Fiesta from "../../../public/fiesta.png";
import Luminous from "../../../public/luminous.png";
import Marmalade from "../../../public/marmalade.png";
import { Button } from "@/components/ui/button.tsx";

export default function FlowerCarousel() {
  return (
    <div className="flex flex-col">
      <Carousel>
        <CarouselContent className="w-[400px] h-[450px] text-center">
          <CarouselItem>
            <img src={Sweet} className="rounded-xl" />
            <span className="text-2xl">Sweet & Pretty</span>
          </CarouselItem>
          <CarouselItem>
            <img src={Dreamscape} className="rounded-xl" />
            <span className="text-2xl">Dreamscape</span>
          </CarouselItem>
          <CarouselItem>
            <img src={Fiesta} className="rounded-xl" />
            <span className="text-2xl">Fiesta Bouquet</span>
          </CarouselItem>
          <CarouselItem>
            <img src={Luminous} className="rounded-xl" />
            <span className="text-2xl">Luminous Morning Bouquet</span>
          </CarouselItem>
          <CarouselItem>
            <img src={Marmalade} className="rounded-xl" />
            <span className="text-2xl"> Marmalade Skies Bouquet</span>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <Button className=" bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 text-theme-dark border rounded hover:bg-gradient-to-tr rounded-2xl">
        Select this choice{" "}
      </Button>
    </div>
  );
}
