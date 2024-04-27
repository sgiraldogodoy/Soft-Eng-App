import { useAuth0 } from "@auth0/auth0-react";
import {
  BookHeart,
  DatabaseIcon,
  HammerIcon,
  LogOut,
  MapIcon,
  PencilRuler,
  UserCog,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SidebarButton } from "@/components/SidebarButton.tsx";
import { trpc } from "@/utils/trpc.ts";
import SearchCommand from "@/components/ui/searchcommand.tsx";

export default function DashboardLayout({ children }: React.PropsWithChildren) {
  const session = useAuth0();
  const me = trpc.user.me.useQuery();

  if (!session.isAuthenticated) {
    return (
      <div className="w-full h-screen min-h-screen overflow-auto relative bg-muted/40">
        {children}
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-background min-h-screen max-h-screen overflow-auto">
      <div className="flex h-14 border-b items-center flex-none">
        <div className="relative w-14 flex-none border-r h-full flex items-center justify-center">
          <svg
            width="21"
            height="30"
            viewBox="0 0 29 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="z-10"
          >
            <path
              d="M3.8 15.3999H0V21.8999V27.7999H3.8V15.3999Z"
              fill="#005DE2"
            />
            <path
              d="M8.20001 15.3999V21.8999V27.7999H12.1V15.3999H8.20001Z"
              fill="#005DE2"
            />
            <path
              d="M16.5 15.3999V21.8999V27.7999H20.3V15.3999H16.5Z"
              fill="#005DE2"
            />
            <path d="M0 13H14.3H28.6V9.5H0V13Z" fill="#005DE2" />
            <path
              d="M14.3 0L0 4.7V8.4L14.3 3.6L28.6 8.4V4.7L14.3 0Z"
              fill="#005DE2"
            />
            <path
              d="M28.6 27.5C28.5 27.7 27.1 30.1 18 30.1H10.6C1.2 30.2 0.2 31.4 0 31.5V35.1C0.2 35 1.2 33.8 10.6 33.7H18C27.1 33.7 28.5 31.3 28.6 31.1V27.5Z"
              fill="#005DE2"
            />
            <path
              d="M28.6 33.3999C28.5 33.5999 27.1 35.9999 18 35.9999H10.6C1.2 36.0999 0.2 37.2999 0 37.3999V40.9999C0.2 40.8999 1.2 39.6999 10.6 39.5999H18C27.1 39.5999 28.5 37.1999 28.6 36.9999V33.3999Z"
              fill="#005DE2"
            />
            <path
              d="M24.7 15.3999V27.1999C27.8 26.4999 28.5 25.3999 28.5 25.1999V15.3999H24.7Z"
              fill="#005DE2"
            />
          </svg>
        </div>
        <div className="h-full w-full flex items-center px-4 gap-2">
          <p className="text-black text-lg">
            Brigham and Women&apos;s Hospital
          </p>
          <div className="flex-1" />
          <SearchCommand />
          <p className="text-lg">
            Welcome,{" "}
            <span className="font-semibold">
              {me.data?.name ?? session.user?.email}
            </span>
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <img
                className="h-3/5 rounded-full object-contain hover:border border-slate-500 cursor-pointer"
                src={session.user?.picture}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-auto">
              <DropdownMenuItem
                onClick={() => {
                  session.logout();
                }}
              >
                <LogOut className="mr-2" />
                <span>Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex-1 min-w-screen flex overflow-auto">
        <aside className="z-10 hidden w-14 flex-col border-r bg-background sm:flex flex-none">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
            <SidebarButton link="/pathfind" name="Map">
              <MapIcon />
            </SidebarButton>
            <SidebarButton link="/mapediting" name="Map Editor">
              <PencilRuler />
            </SidebarButton>
            <SidebarButton link="/services" name="Service Requests">
              <HammerIcon />
            </SidebarButton>
            <SidebarButton link="/patients" name="Patients">
              <BookHeart />
            </SidebarButton>
            <SidebarButton link="/database" name="Database">
              <DatabaseIcon />
            </SidebarButton>
          </nav>
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
            <SidebarButton link="/settings" name="Settings">
              <UserCog className="h-5 w-5" />
            </SidebarButton>
          </nav>
        </aside>

        <div className="flex-1 w-full overflow-auto relative bg-sky-100">
          {children}
        </div>
      </div>
    </div>
  );
}
