import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion.tsx";

export default function PatientGuidePage() {
  return (
    <>
      <p className="font-semibold text-lg text-black col-span-3">
        Patient Access
      </p>
      <br />
      <p className="text-left w-full col-start-1 col-span-3">
        &emsp;&emsp;Patients are a vital part of a hospital, without patients,
        hospitals would not exist. This is a detail that our kiosk refuses to
        ignore, catering to the very fundamentals of medical care by integrating
        patient features into the kiosk. All features are added with our users
        in mind and seek to make the experience of receiving medical care more
        efficient and less stressful to patients.
        <br />
        &emsp;&emsp;However, patients are only allowed to do so much on the
        kiosk for the very idea of reducing stress in patients.
      </p>
      <Accordion type="single" collapsible className="w-auto col-span-3 mx-10">
        <AccordionItem value="checkin">
          <AccordionTrigger className="text-black">
            Appointment Check-in
          </AccordionTrigger>
          <AccordionContent>*Put Intro Here*</AccordionContent>
        </AccordionItem>
        <AccordionItem value="aman">
          <AccordionTrigger className="text-black">
            Appointment Management
          </AccordionTrigger>
          <AccordionContent>*Put Intro Here*</AccordionContent>
        </AccordionItem>
        <AccordionItem value="asched">
          <AccordionTrigger className="text-black">
            Appointment Scheduling
          </AccordionTrigger>
          <AccordionContent>*Put Intro Here*</AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
