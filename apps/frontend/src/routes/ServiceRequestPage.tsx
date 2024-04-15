import RequestSummary from "@/components/services/RequestSummary";
import ServiceRequestForm, {
  FormTypes,
} from "@/components/services/ServiceRequestForm";
import { BaseFormSchema } from "@/components/services/formSchema";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createContext, useState } from "react";
import { z } from "zod";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation.tsx";
import { motion } from "framer-motion";

type RequestsContextType = {
  requests: Array<
    z.infer<typeof BaseFormSchema> & { type: string; status: string }
  >;
  setRequests: React.Dispatch<
    Array<z.infer<typeof BaseFormSchema> & { type: string; status: string }>
  >;
};

export const RequestsContext = createContext<RequestsContextType>({
  requests: [],
  setRequests: () => {
    return;
  },
});

export default function ServiceRequestPage() {
  const [variant, setVariant] = useState<FormTypes>("flower-request");
  const [requests, setRequests] = useState<RequestsContextType["requests"]>([]);

  return (
    <>
      <RequestsContext.Provider value={{ requests, setRequests }}>
        <BackgroundGradientAnimation className="overflow-hidden">
          <div className=" absolute z-20 inset-0 flex flex-row h-[95%] w-[95%] gap-4 items-stretch justify-center pointer-events-auto mx-10 my-6">
            <RequestSummary requests={requests} />
            <div className="flex flex-col gap-4 items-stretch">
              <Tabs
                value={variant}
                onValueChange={(v) => {
                  setVariant(v as FormTypes);
                }}
                className="w-full flex items-center justify-center bg-transparent"
              >
                <TabsList className="w-full bg-white/80 backdrop-blur-md shadow-inner rounded shadow-md">
                  <TabsTrigger className="flex-1" value="flower-request">
                    Flower Request
                  </TabsTrigger>
                  <TabsTrigger className="flex-1" value="room-request">
                    Room Request
                  </TabsTrigger>
                  <TabsTrigger className="flex-1" value="security-request">
                    Security Request
                  </TabsTrigger>
                  <TabsTrigger className="flex-1" value="av-request">
                    Audio/Visual Request
                  </TabsTrigger>
                  <TabsTrigger className="flex-1" value="gift-request">
                    Gift Request
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <motion.div
                key={variant}
                initial={{ x: 1000 }}
                animate={{ x: 0 }}
                transition={{ duration: 1.2, type: "easeOut" }}
                className="pointer-events-auto overflow-auto"
              >
                <ServiceRequestForm variant={variant} />
              </motion.div>
            </div>
          </div>
        </BackgroundGradientAnimation>
      </RequestsContext.Provider>
    </>
  );
}
