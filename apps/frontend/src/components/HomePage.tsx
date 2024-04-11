import HeroSection from "@/components/HeroSection.tsx";
import AdminDashLink from "@/components/AdminDashLink.tsx";
import MapButton from "@/components/MapButton.tsx";
//import Gradient from "@/components/Gradient.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "wouter";
import { WavyBackground } from "@/components/ui/wavy-background.tsx";
//import {WavyBackground} from "@/components/ui/wavy-background.tsx";

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div></div>;
  }
  return (
    <div>
      {isAuthenticated && <Redirect to="/pathfind" />}
      <WavyBackground className="min-h-screen flex flex-col gap-[50px] justify-center items-center p-20">
        <HeroSection />
        <MapButton />
        <AdminDashLink />
      </WavyBackground>
    </div>
  );
}
