import PatientCreationForm from "@/components/services/PatientCreationForm.tsx";
// import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation.tsx";
import { motion } from "framer-motion";
import PatientRetrevial from "@/components/services/PatientRetrevialForm.tsx";

export default function ServiceRequestPage() {
  return (
    <>
      {/*<BackgroundGradientAnimation className="overflow-hidden -z-10" />*/}
      <div className="absolute bottom-0 left-0 w-full h-full">
        <img src="/wave.svg" alt="Wave" className="absolute bottom-0 left-0 " />
      </div>
      <div className="absolute inset-0 flex flex-row h-[95%] w-[95%] gap-4 items-stretch justify-center pointer-events-auto mx-10 my-6">
        <PatientRetrevial />
        <div className="flex flex-col gap-4 items-stretch ">
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

/*import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card.tsx";
import PatientCreationForm from "@/components/services/PatientCreationForm.tsx";
import PatientRetrevial from "@/components/services/PatientRetrevialForm.tsx";

export default function PatientIntegration() {
  return (
    <div className="h-full w-full flex flex-row gap-2 items-center justify-center px-5 py-3">
      <Card className="h-full bg-white/90 drop-shadow-md shadow-inner backdrop-blur-md flex-1 flex flex-col overflow-auto">
        <CardHeader>
          <CardTitle>Patient Creation</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col mt-5 gap-2">
          <PatientCreationForm />
        </CardContent>
      </Card>
      <Card className="h-full bg-white/90 drop-shadow-md shadow-inner backdrop-blur-md flex-1 flex flex-col overflow-auto">
        <CardHeader>
          <CardTitle>Patient Lookup</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-2">
          <PatientRetrevial />
        </CardContent>
      </Card>
    </div>
  );
}
*/
