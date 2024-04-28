import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HelpMenu() {
  return (
    <>
      <Card className="w-auto h-auto m-2 rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl flex justify-center">
            User Manual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>hello</CardDescription>
        </CardContent>
        <CardFooter>User Manual</CardFooter>
      </Card>
    </>
  );
}
