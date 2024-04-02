import { ArrowRight } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";

export default function AdminDashLink() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div
      onClick={() => loginWithRedirect()}
      className="flex flex-row gap py-[8px] px-[16px] gap-0 cursor-pointer"
    >
      <a className="text-theme-dark">Administrator Dashboard</a>
      <ArrowRight />
    </div>
  );
}
