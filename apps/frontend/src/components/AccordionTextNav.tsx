import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CornerUpRight,
  CornerUpLeft,
  MoveUp,
  Columns2,
  ArrowUpNarrowWide,
  MapPin,
  RotateCcw,
  Star,
} from "lucide-react";

interface AccordionTextNavProps {
  directions: string[];
  floor: string;
}

const pickIcon = (direction: string) => {
  if (direction.includes("Right")) {
    return <CornerUpRight className="h-8 w-8" />;
  } else if (direction.includes("Left")) {
    return <CornerUpLeft className="h-8 w-8" />;
  } else if (direction.includes("Walk")) {
    return <MoveUp className="h-8 w-8" />;
  } else if (direction.includes("elevator")) {
    return <Columns2 className="h-8 w-8" />;
  } else if (direction.includes("stairs")) {
    return <ArrowUpNarrowWide className="h-8 w-8" />;
  } else if (direction.includes("till")) {
    return <RotateCcw className="h-8 w-8" />;
  } else if (direction.includes("Start")) {
    return <Star className="h-8 w-8" />;
  } else return <MapPin className="h-8 w-8" />;
};

export function AccordionTextNav({ directions, floor }: AccordionTextNavProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="w-[23vw] pl-2">
          Directions For {floor}
        </AccordionTrigger>
        <AccordionContent>
          <div className="w-full h-[60vh] overflow-auto">
            <div className="flex flex-col space-y-2 w-[23vw]">
              {directions.map((direction, index) => (
                <div key={index} className="flex items-center space-x-2">
                  {pickIcon(direction)}
                  <p className="text-lg">{direction}</p>
                </div>
              ))}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
