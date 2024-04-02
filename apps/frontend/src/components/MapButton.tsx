import { Map } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MapButton() {
  return (
    <Button className="w-[361px] flex flex-row-reverse gap-2 justify-center bg-gradient-to-r from-yellow-300 to-yellow-400 text-theme-dark hover:bg-gradient-to-l shadow-lg shadow-theme-yellow/30">
      <Map className="h-4 w-4" />
      Map
    </Button>
  );
}
