import { Link, useRoute } from "wouter";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { cn } from "@/lib/utils.ts";

interface Props {
  link: string;
  name: string;
}

export function SidebarButton({
  link,
  name,
  children,
}: React.PropsWithChildren<Props>) {
  const [match] = useRoute(link);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          to={link}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
            match && "bg-accent",
          )}
        >
          {children}
          <span className="sr-only">{name}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{name}</TooltipContent>
    </Tooltip>
  );
}
