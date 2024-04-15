import RequestSummary from "@/components/services/RequestSummary";
import ServiceRequestForm, {
  FormTypes,
} from "@/components/services/ServiceRequestForm";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation.tsx";
import { motion } from "framer-motion";

export default function ServiceRequestPage() {
  const [variant, setVariant] = useState<FormTypes>("FLOWER");

  return (
    <>
      <BackgroundGradientAnimation className="overflow-hidden">
        <div className=" absolute z-20 inset-0 flex flex-row h-[95%] w-[95%] gap-4 items-stretch justify-center pointer-events-auto mx-10 my-6">
          <RequestSummary />
          <div className="flex flex-col gap-4 items-stretch">
            <Tabs
              value={variant}
              onValueChange={(v) => {
                setVariant(v as FormTypes);
              }}
              className="w-full flex items-center justify-center bg-transparent"
            >
              <TabsList className="w-full bg-white/90 backdrop-blur-md shadow-inner rounded shadow-md">
                <TabsTrigger className="flex-1" value="FLOWER">
                  Flower Request
                </TabsTrigger>
                <TabsTrigger className="flex-1" value="ROOM">
                  Room Request
                </TabsTrigger>
                <TabsTrigger className="flex-1" value="SECURITY">
                  Security Request
                </TabsTrigger>
                <TabsTrigger className="flex-1" value="AV">
                  Audio/Visual Request
                </TabsTrigger>
                <TabsTrigger className="flex-1" value="GIFT">
                  Gift Request
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <motion.div
              key={variant}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, type: "easeOut" }}
              className="pointer-events-auto overflow-auto flex-1"
            >
              <ServiceRequestForm variant={variant} />
            </motion.div>
          </div>
        </div>
      </BackgroundGradientAnimation>
    </>
  );
}
