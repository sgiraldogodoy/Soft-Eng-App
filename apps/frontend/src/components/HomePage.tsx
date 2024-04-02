import HeroSection from "@/components/HeroSection.tsx";
import AdminDashLink from "@/components/AdminDashLink.tsx";
import MapButton from "@/components/MapButton.tsx";
import Gradient from "@/components/Gradient.tsx";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col gap-[50px] justify-center items-center p-20">
      <Gradient />
      <HeroSection />
      <MapButton />
      <AdminDashLink />
    </div>
  );
}
