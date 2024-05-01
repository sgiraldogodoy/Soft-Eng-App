import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion.tsx";

export default function AdminGuidePage() {
  return (
    <>
      <p className="font-semibold text-lg text-black col-span-3">
        Staff Access
      </p>
      <br />
      <p className="text-left w-full col-start-1 col-span-3">
        &emsp;&emsp;The highest tier of access, an admin user is able to
        interact with all features on the website. Admins are responsible for
        updating the map and creating and managing users of all types.
      </p>
      <Accordion type="single" collapsible className="w-auto col-span-3 mx-10">
        <AccordionItem value="mapedit">
          <AccordionTrigger className="text-black">
            Map Editing
          </AccordionTrigger>
          <AccordionContent>*Put Intro Here*</AccordionContent>
        </AccordionItem>
        <AccordionItem value="dbman">
          <AccordionTrigger className="text-black">
            Appointment Scheduling
          </AccordionTrigger>
          <AccordionContent>*Put Intro Here*</AccordionContent>
        </AccordionItem>
        <AccordionItem value="user">
          <AccordionTrigger className="text-black">
            User Creation
          </AccordionTrigger>
          <AccordionContent>*Put Intro Here*</AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
