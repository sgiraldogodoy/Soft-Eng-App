import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion.tsx";

export default function AdminGuidePage() {
  return (
    <>
      <Accordion type="single" collapsible className="w-auto col-span-3 mx-10">
        <AccordionItem value="Intro">
          <AccordionTrigger className="text-black">
            Admin Features
          </AccordionTrigger>
          <AccordionContent>*Put Intro Here*</AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
