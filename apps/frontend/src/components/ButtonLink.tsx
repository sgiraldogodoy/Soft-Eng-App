import { Link } from "wouter";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { LucideIcon } from "lucide-react";

interface Props {
  link: string;
  name: string;
  icon: LucideIcon;
}

export function ButtonLink({ link, name, icon: Icon }: Props) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Button asChild variant="ghost" size="icon">
          <Link to={link}>
            <Icon size={28} />
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>{name}</p>
      </TooltipContent>
    </Tooltip>
  );
}
