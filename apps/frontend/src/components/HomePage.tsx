import HeroSection from "@/components/HeroSection.tsx";
import AdminDashLink from "@/components/AdminDashLink.tsx";
import MapButton from "@/components/MapButton.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "wouter";
import { WavyBackground } from "@/components/ui/wavy-background.tsx";
import HelloMultipleLanguages from "@/components/ui/hello-text.tsx";
import LaserMap from "@/components/LaserMap.tsx";

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div></div>;
  }
  return (
    <div>
      {isAuthenticated && <Redirect to="/pathfind" />}
      <WavyBackground className="min-h-screen flex flex-col gap-[50px]  items-center p-20">
        <div className="mt-24">
          <HeroSection />
        </div>
        <div className="mt-28">
          <HelloMultipleLanguages />
        </div>
        <div className="mt-24">
          <MapButton />
        </div>
        <AdminDashLink />
      </WavyBackground>
      <div>
        <LaserMap />
      </div>
    </div>
  );
}
