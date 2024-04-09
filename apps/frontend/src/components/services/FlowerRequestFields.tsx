import { z } from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  CarouselContent,
  Carousel,
  CarouselItem,
} from "@/components/ui/carousel.tsx";

export const FlowerRequestSchema = z.object({
  type: z.literal("flower-request"),
  flowerChoice: z.string(),
});

const FlowerRequest = () => {
  return (
    <div className="flex gap-2 items-center flex-1">
      <FormField
        name="flowerChoice"
        render={() => (
          <FormItem className="flex-1">
            <FormLabel>Choose a flower.</FormLabel>
            <FormControl>
              <Carousel>
                <CarouselContent className="-ml-2 md:-ml-4">
                  <CarouselItem className="pl-2 md:pl-4">...</CarouselItem>
                  <CarouselItem className="pl-2 md:pl-4">...</CarouselItem>
                  <CarouselItem className="pl-2 md:pl-4">...</CarouselItem>
                </CarouselContent>
              </Carousel>
            </FormControl>
            <FormDescription>Which flowers would you like?</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default FlowerRequest;
