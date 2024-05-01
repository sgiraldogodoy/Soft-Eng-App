import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion.tsx";

export default function StaffGuidePage() {
  return (
    <>
      <p className="font-semibold text-lg text-black col-span-3">
        Staff Access
      </p>
      <br />
      <p className="text-left w-full col-start-1 col-span-3">
        &emsp;&emsp;The main level of access for the kiosk. As a staff member,
        users are able to utilize a majority of the tools available within the
        kiosk but are not able to access some of the more involved or critical
        features of the kiosk that can change the flow of the entire hospital.
        As a staff member, users are able to help manage the patients schedules
        and appointments and make requests for needed services and equipment.
      </p>
      <Accordion type="single" collapsible className="w-auto col-span-3 mx-10">
        <AccordionItem value="create">
          <AccordionTrigger className="text-black">
            Creating Service Requests
          </AccordionTrigger>
          <AccordionContent>*Put Intro Here*</AccordionContent>
        </AccordionItem>
        <AccordionItem value="manage">
          <AccordionTrigger className="text-black">
            Managing Service Requests
          </AccordionTrigger>
          <AccordionContent>*Put Intro Here*</AccordionContent>
        </AccordionItem>
        <AccordionItem value="pman">
          <AccordionTrigger className="text-black">
            Patient Management
          </AccordionTrigger>
          <AccordionContent>*Put Intro Here*</AccordionContent>
        </AccordionItem>
        <AccordionItem value="stats">
          <AccordionTrigger className="text-black">Statistics</AccordionTrigger>
          <AccordionContent>*Put Intro Here*</AccordionContent>
        </AccordionItem>
        <AccordionItem value="csearch">
          <AccordionTrigger className="text-black">
            Command Search Dialog
          </AccordionTrigger>
          <AccordionContent>*Put Intro Here*</AccordionContent>
        </AccordionItem>
        <AccordionItem value="pat">
          <AccordionTrigger className="text-black">
            Patient & Staff Creation
          </AccordionTrigger>
          <AccordionContent>*Put Intro Here*</AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
