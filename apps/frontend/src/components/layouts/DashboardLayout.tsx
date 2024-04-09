import { useAuth0 } from "@auth0/auth0-react";
import {
  // ArrowRightIcon,
  DatabaseIcon,
  HammerIcon,
  HomeIcon,
  LogOut,
  MapIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { TooltipProvider } from "../ui/tooltip";
import { ButtonLink } from "../ButtonLink";

export default function DashboardLayout({ children }: React.PropsWithChildren) {
  const session = useAuth0();

  if (!session.isAuthenticated) {
    return children;
  }

  return (
    <div className="h-screen min-w-screen flex">
      <div className="flex flex-col gap-[15px] py-[23px] px-[10px] border-r border-slate-300 items-center">
        <TooltipProvider delayDuration={0}>
          <ButtonLink link="/pathfind" icon={HomeIcon} name={"Home"} />
          <ButtonLink link="/mapediting" icon={MapIcon} name={"Map Editor"} />
          <ButtonLink
            link="/services"
            icon={HammerIcon}
            name={"Service Requests"}
          />
          <ButtonLink link="/database" icon={DatabaseIcon} name={"DB Editor"} />
        </TooltipProvider>
        {/* <ArrowRightIcon size={30} className="mt-auto" /> */}
      </div>
      <div className="flex flex-col max-h-screen h-full flex-1">
        <div className="flex px-[17px] py-[18px] border-b border-slate-300 items-center gap-2">
          <svg
            width="21"
            height="30"
            viewBox="0 0 29 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.8 15.3999H0V21.8999V27.7999H3.8V15.3999Z"
              fill="#8260F6"
            />
            <path
              d="M8.20001 15.3999V21.8999V27.7999H12.1V15.3999H8.20001Z"
              fill="#8260F6"
            />
            <path
              d="M16.5 15.3999V21.8999V27.7999H20.3V15.3999H16.5Z"
              fill="#8260F6"
            />
            <path d="M0 13H14.3H28.6V9.5H0V13Z" fill="#8260F6" />
            <path
              d="M14.3 0L0 4.7V8.4L14.3 3.6L28.6 8.4V4.7L14.3 0Z"
              fill="#8260F6"
            />
            <path
              d="M28.6 27.5C28.5 27.7 27.1 30.1 18 30.1H10.6C1.2 30.2 0.2 31.4 0 31.5V35.1C0.2 35 1.2 33.8 10.6 33.7H18C27.1 33.7 28.5 31.3 28.6 31.1V27.5Z"
              fill="#8260F6"
            />
            <path
              d="M28.6 33.3999C28.5 33.5999 27.1 35.9999 18 35.9999H10.6C1.2 36.0999 0.2 37.2999 0 37.3999V40.9999C0.2 40.8999 1.2 39.6999 10.6 39.5999H18C27.1 39.5999 28.5 37.1999 28.6 36.9999V33.3999Z"
              fill="#8260F6"
            />
            <path
              d="M24.7 15.3999V27.1999C27.8 26.4999 28.5 25.3999 28.5 25.1999V15.3999H24.7Z"
              fill="#8260F6"
            />
          </svg>
          <p className="text-[#8260F6] text-xl font-semibold">
            Brigham and Women&apos;s Hospital
          </p>
          <p className="ml-auto text-lg">
            Welcome,{" "}
            <span className="font-semibold">{session.user?.email}</span>
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <img
                className="h-[40px] w-[40px] rounded-full object-contain hover:border-[5px] border-slate-500 cursor-pointer"
                src={session.user?.picture}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
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
        <div className="flex-1 overflow-y-scroll relative">{children}</div>
      </div>
    </div>
  );
}
