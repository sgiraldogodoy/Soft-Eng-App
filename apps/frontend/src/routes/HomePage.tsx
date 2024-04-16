/*import HeroSection from "@/components/HeroSection.tsx";
import MapButton from "@/components/MapButton.tsx";*/
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "wouter";
/*import {WavyBackground} from "@/components/ui/wavy-background.tsx";
import HelloMultipleLanguages from "@/components/ui/hello-text.tsx";*/
import { LogIn } from "lucide-react";
import HelloMultipleLanguages from "@/components/ui/hello-text.tsx";

export default function HomePage() {
  const session = useAuth0();

  if (session.isLoading) {
    return <div></div>;
  }

  return (
    <div>
      {session.isAuthenticated && <Redirect to="/pathfind" />}
      <div className="flex px-[17px] py-[18px] border-b border-gray-300 bg-gray-200/50 items-center justify-between gap-2">
        <div className="flex gap-2">
          <svg
            width="21"
            height="30"
            viewBox="0 0 29 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
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
          <p className="text-black text-xl">
            Brigham and Women&apos;s Hospital
          </p>
        </div>

        <div
          onClick={() => session.loginWithRedirect()}
          className="flex gap-2 cursor-pointer"
        >
          <p className="ml-auto text-lg">Sign In</p>
          <LogIn />
        </div>
      </div>
      <div className="text-center text-[#005DE2] ">
        <HelloMultipleLanguages />
      </div>
    </div>
  );
}
