import { Link, useRoute } from "wouter";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { LucideIcon } from "lucide-react";
import clsx from "clsx";

interface Props {
  link: string;
  name: string;
  icon: LucideIcon;
  color: string;
}

export function ButtonLink({ link, name, color, icon: Icon }: Props) {
  const [match] = useRoute(link);

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          className={clsx(
            "bg-transparent hover:bg-[#BDBFC1]",
            match && "text-slate-900 bg-[#BDBFC1]",
          )}
          asChild
          variant="ghost"
          size="icon"
        >
          <Link to={link}>
            <Icon size={28} color={color} />
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>{name}</p>
      </TooltipContent>
    </Tooltip>
  );
}
