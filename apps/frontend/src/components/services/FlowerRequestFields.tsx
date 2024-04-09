import { z } from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { UseFormReturn } from "react-hook-form";
import { BaseFormSchema } from "./formSchema";
import {
  CarouselContent,
  Carousel,
  CarouselItem,
} from "@/components/ui/carousel.tsx";
import { FormComponent } from "@/components/services/ServiceRequestForm.tsx";

export const FlowerRequestSchema = z.object({
  type: z.literal("flower-request"),
  flowerChoice: z.string(),
});

const FlowerRequestFormSchema = BaseFormSchema.merge(FlowerRequestSchema);

const FlowerRequest: FormComponent<z.infer<typeof FlowerRequestFormSchema>> = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof FlowerRequestFormSchema>>;
}) => {
  return (
    <div className="flex gap-2 items-center flex-1">
      <FormField
        control={form.control}
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
