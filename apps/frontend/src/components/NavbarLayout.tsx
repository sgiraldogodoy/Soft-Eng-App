import { Button } from "@/components/ui/button.tsx";
import { Home } from "lucide-react";
import { Flower } from "lucide-react";
import { Map } from "lucide-react";
import { Link } from "wouter";
import { useAuth0 } from "@auth0/auth0-react";
import LogOutButton from "@/components/LogOutButton.tsx";

// import NavbarLayout from "@components/NavbarLayout.tsx";

export default function NavbarLayout({ children }: React.PropsWithChildren) {
  const { isAuthenticated, isLoading } = useAuth0();
  console.log(isAuthenticated);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="flex flex-row gap-2">
      {isAuthenticated && (
        <div className="flex flex-col min-h-screen max-w-[324px] font-inter justify-between px-5 py-5 border-r-slate-300 border-r-[1px]">
          <div className="space-y-4">
            <div className="flex flex-row gap-3 text-theme-blue">
              <img src="BWH%20Logo.svg" alt="BWH Logo" />
              <h1 className="text-left font-inter text-2xl font-bold">
                Brigham and
                <br />
                Women's Hospital
              </h1>
            </div>
            <hr />
            <Button
              asChild
              className="flex flex-row gap-3 justify-start text-xl w-full"
              variant="ghost"
            >
              <Link to="/pathfind">
                <Home className="h-6 w-6" />
                Home
              </Link>
            </Button>
            <Button
              className="flex flex-row gap-3 justify-start text-xl w-full"
              variant="ghost"
            >
              <Flower className="h-6 w-6" />
              Service Requests
            </Button>
            <Button
              asChild
              className="flex flex-row gap-3 justify-start text-xl w-full"
              variant="ghost"
            >
              <Link to="/pathfind">
                <Map className="h-6 w-6" />
                Map
              </Link>
            </Button>
          </div>
          <div className="flex flex-col gap-5">
            <hr />
            <LogOutButton />
          </div>
        </div>
      )}
      <div className="flex-1 overflow-x-hidden">{children}</div>
    </div>
  );
}
