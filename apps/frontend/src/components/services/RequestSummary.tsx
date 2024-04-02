import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import RequestTable from "@/components/DTPage.tsx";

import { RequestNotes } from "@/components/RequestNotes.ts";

type RequestNotesProps = {
  rNote: RequestNotes["notes"];
};

export default function RequestSummary(noteProp: RequestNotesProps) {
  return (
    <div className="w-full flex flex-col px-20 gap-20 items-center">
      <div className="navDiv py-3">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                A11Y Service Requests
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Link1</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                Translation Service Requests
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Link2</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                Flower Service Requests
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Link3</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="w-full flex flex-row justify-evenly">
        <div>
          <RequestTable />
        </div>
        <div>
          <div className="h-full flex flex-col justify-center gap-5">
            <div className="grid w-[530px] h-[126px] gap-1.5">
              <Label htmlFor="message-2" className="font-bold">
                Request Notes
              </Label>
              <Textarea
                className="border-color rounded-[6px]"
                placeholder=""
                id="message-2"
                value={noteProp.rNote}
              />
              <p className="text-sm text-muted-foreground">
                Notes regarding the Specified Request
              </p>
            </div>
            <div className="self-center">
              <Button className="w-[188px] bg-black hover:bg-gray-800 text-white rounded-[6px]">
                Resolve
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
