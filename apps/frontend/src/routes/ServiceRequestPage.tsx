import ServiceGradient from "@/components/ServiceGradient";
import RequestSummary from "@/components/services/RequestSummary";
import ServiceRequestForm, {
  FormTypes,
} from "@/components/services/ServiceRequestForm";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function ServiceRequestPage() {
  const [variant, setVariant] = useState<FormTypes>("flower-request");

  return (
    <>
      <ServiceGradient />
      <div className="flex flex-row h-[95%] w-[95%] gap-2 items-stretch justify-center">
        <RequestSummary />
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
          <ServiceRequestForm variant={variant} />
        </div>
      </div>
    </>
  );
}
