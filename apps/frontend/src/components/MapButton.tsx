import { Map } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MapButton() {
  return (
    <Button className="flex-row-reverse gap-2 justify-center bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 text-theme-dark border rounded hover:bg-gradient-to-tr">
      <Map className="mr-2 h-4 w-4" />
      Map
    </Button>
  );
}
