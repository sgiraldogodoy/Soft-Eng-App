import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import HelpCommand from "@/components/HelpCommandDialog.tsx";

export default function HelpMenu() {
  return (
    <>
      <Card className="w-auto h-auto m-2 rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl flex justify-center">
            User Manual
          </CardTitle>
          <div className="flex justify-center">
            <HelpCommand />
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="flex w-full grid grid-cols-3">
            <Accordion
              type="single"
              collapsible
              className="w-auto col-span-3 mx-10"
            >
              <AccordionItem value="Intro">
                <AccordionTrigger>Introduction: The Basics</AccordionTrigger>
                <AccordionContent>*Put Intro Here*</AccordionContent>
              </AccordionItem>
            </Accordion>
            <Card className="w-full h-fit p-2 m-2">
              <CardHeader>
                <CardTitle>Patient</CardTitle>
              </CardHeader>
            </Card>
            <Card className="w-full h-fit p-2 m-2">
              <CardHeader>
                <CardTitle>Staff</CardTitle>
              </CardHeader>
            </Card>
            <Card className="w-full h-fit p-2 m-2">
              <CardHeader>
                <CardTitle>Admin</CardTitle>
              </CardHeader>
            </Card>
          </CardDescription>
        </CardContent>
        <CardFooter>User Manual</CardFooter>
      </Card>
    </>
  );
}
