import {
  CornerUpRight,
  CornerUpLeft,
  MoveUp,
  Columns2,
  ArrowUpNarrowWide,
  MapPin,
  RotateCcw,
  Star,
  SeparatorHorizontal,
  Ban,
} from "lucide-react";

interface AccordionTextNavProps {
  directions: [string, string][];
  onPhone?: boolean;
}

const pickIcon = (direction: string) => {
  if (direction.includes("Right")) {
    return <CornerUpRight className="h-8 w-8" />;
  } else if (direction.includes("You")) {
    return <MapPin className="h-8 w-8" color="red" />;
  } else if (direction.includes("Left")) {
    return <CornerUpLeft className="h-8 w-8" />;
  } else if (direction.includes("Walk")) {
    return <MoveUp className="h-8 w-8" />;
  } else if (direction.includes("elevator")) {
    return <Columns2 className="h-8 w-8" fill="gray" />;
  } else if (direction.includes("stairs")) {
    return <ArrowUpNarrowWide className="h-8 w-8" />;
  } else if (direction.includes("till")) {
    return <RotateCcw className="h-8 w-8" />;
  } else if (direction.includes("Start")) {
    return <Star className="h-8 w-8" color="#003A96" fill="#003A96" />;
  } else if (direction.includes("Error")) {
    return <Ban className="h-8 w-8" />;
  } else return <SeparatorHorizontal className="h-8 w-8" />;
};

export function AccordionTextNav({
  directions,
  onPhone,
}: AccordionTextNavProps) {
  const lastDirection = directions[directions.length - 1];
  const shouldRemoveLast = lastDirection && lastDirection.includes("When Back");
  if (shouldRemoveLast && directions.length === 1) {
    return null;
  }

  console.log(onPhone);
  return (
    <div
      className={`flex flex-col space-y-2 ${onPhone ? "w-full" : "w-[20vw]"} overflow-auto`}
    >
      {directions.map((direction, index) => {
        if (index === directions.length - 1 && shouldRemoveLast) {
          return null;
        }
        return (
          <div key={index} className="flex items-center space-x-2">
            {pickIcon(direction[0])}
            <p className="text-lg">{direction[0]}</p>
          </div>
        );
      })}
    </div>
  );
}
