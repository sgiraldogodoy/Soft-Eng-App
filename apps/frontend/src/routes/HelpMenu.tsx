import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
          <CardDescription className="grids grid-cols-3 w-full">
            <div className="cols-span-3">Introduction</div>
            <div>Patient</div>
            <div>Staff</div>
            <div>Admin</div>
          </CardDescription>
        </CardContent>
        <CardFooter>User Manual</CardFooter>
      </Card>
    </>
  );
}
