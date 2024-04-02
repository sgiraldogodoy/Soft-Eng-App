import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button.tsx";
import { LogOut } from "lucide-react";

export default function LogOutButton() {
  const { logout } = useAuth0();
  return (
    <Button
      className="flex flex-row gap-3"
      variant="ghost"
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      <LogOut className="h-6 w-6" />
      Sign Out
    </Button>
  );
}
