import ServiceGradient from "@/components/ServiceGradient";
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
      <div className="flex flex-col gap-4 items-stretch">
        <Tabs
          value={variant}
          onValueChange={(v) => {
            setVariant(v as FormTypes);
          }}
          className="w-full flex items-center justify-center w-full"
        >
          <TabsList className="w-full">
            <TabsTrigger className="flex-1" value="flower-request">
              Flower Request
            </TabsTrigger>
            <TabsTrigger className="flex-1" value="room-request">
              Flower Request
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <ServiceRequestForm variant={variant} />
      </div>
    </>
  );
}
