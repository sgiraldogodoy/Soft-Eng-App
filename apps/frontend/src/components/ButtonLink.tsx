import { Link, useRoute } from "wouter";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { LucideIcon } from "lucide-react";
import clsx from "clsx";

interface Props {
  link: string;
  name: string;
  icon: LucideIcon;
}

export function ButtonLink({ link, name, icon: Icon }: Props) {
  const [match] = useRoute(link);

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          className={clsx(match && "bg-slate-100 text-slate-900")}
          asChild
          variant="ghost"
          size="icon"
        >
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
