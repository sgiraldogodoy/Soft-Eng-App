import PatientCreationForm from "@/components/services/PatientCreationForm.tsx";
// import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation.tsx";
import { motion } from "framer-motion";
import PatientRetrevial from "@/components/services/PatientRetrevialForm.tsx";

export default function PatientRequestPage() {
  return (
    <>
      {/*<BackgroundGradientAnimation className="overflow-hidden -z-10" />*/}
      <div className="absolute bottom-0 left-0 w-full h-full">
        <img src="/wave.svg" alt="Wave" className="absolute bottom-0 left-0 " />
      </div>
      <div className="absolute inset-0 flex flex-row h-[95%] w-[95%] gap-4 items-stretch justify-center pointer-events-auto mx-10 my-6">
        <PatientRetrevial />
        <div className="flex flex-col gap-4 items-stretch basis-1/2">
          <motion.div
            key="patient"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, type: "easeOut" }}
            className="pointer-events-auto overflow-auto flex-1"
          >
            <PatientCreationForm />
          </motion.div>
        </div>
      </div>
    </>
  );
}
