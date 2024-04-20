import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card.tsx";
import PatientCreationForm from "@/components/services/PatientCreationForm.tsx";

export default function PatientIntegration() {
  return (
    <div className="h-full w-full flex flex-row gap-2 items-center justify-center px-5 py-3">
      <Card className="h-full bg-white/90 drop-shadow-md shadow-inner backdrop-blur-md flex-1 flex flex-col overflow-auto">
        <CardHeader>
          <CardTitle className="capitalize">Patient Creation</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col mt-5 gap-2">
          <PatientCreationForm />
        </CardContent>
      </Card>
      <Card className="h-full bg-white/90 drop-shadow-md shadow-inner backdrop-blur-md flex-1 flex flex-col overflow-auto">
        <CardHeader>
          <CardTitle className="capitalize">Patient Lookup</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col justify-center items-center gap-2">
          <p>This is the patient integration page 2.</p>
        </CardContent>
      </Card>
    </div>
  );
}
