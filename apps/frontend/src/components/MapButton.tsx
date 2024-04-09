import { Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function MapButton() {
  return (
    <Button
      asChild
      className="w-[361px] flex flex-row-reverse gap-2 justify-center bg-gradient-to-r from-yellow-300 to-yellow-400 text-theme-dark hover:bg-gradient-to-l shadow-lg shadow-theme-yellow/30"
    >
      <Link href="/apps/frontend/src/routes/OldPathFind">
        <Map className="h-4 w-4" />
        Map
      </Link>
    </Button>
  );
}
