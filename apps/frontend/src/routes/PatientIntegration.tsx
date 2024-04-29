import PatientCreationForm from "@/components/services/PatientCreationForm.tsx";
// import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation.tsx";
import PatientRetrevial from "@/components/services/PatientRetrevialForm.tsx";
import BackgroundWave from "@/components/BackgroundWave";

export default function PatientRequestPage() {
  return (
    <>
      {/*<BackgroundGradientAnimation className="overflow-hidden -z-10" />*/}
      <BackgroundWave />
      <div className="absolute inset-0 flex flex-row h-[95%] w-[95%] gap-4 items-stretch justify-center pointer-events-auto mx-10 my-6">
        <PatientRetrevial />
        <div
          key="patient"
          className="pointer-events-auto overflow-auto flex-1 animate-in zoom-in-105 fade-in duration-500 delay-200 fill-mode-both"
        >
          <PatientCreationForm />
        </div>
      </div>
    </>
  );
}
