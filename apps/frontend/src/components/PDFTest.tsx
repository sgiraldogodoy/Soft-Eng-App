import React, { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button.tsx";
import { ArrowLeft } from "lucide-react";
import { PatientInfoPDF } from "@/components/PDFMaker.tsx";
import { renderToString } from "react-dom/server";

const patientData = {
  name: "John Doe",
  age: 30,
  gender: "Male",
  address: "123 Main Street, City, Country",
};

export default function PDFTest() {
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);

  const generatePdf = () => {
    // Render the PatientInfoPDF component into a string
    const pdfContent = renderToString(<PatientInfoPDF patient={patientData} />);

    // Create a new Blob containing the PDF data
    const blob = new Blob([pdfContent], { type: "application/pdf" });
    setPdfBlob(blob);
  };

  const downloadPdf = () => {
    if (pdfBlob) {
      // Create a URL for the Blob
      const url = URL.createObjectURL(pdfBlob);

      // Create a temporary <a> element to trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = "patient_info.pdf";
      document.body.appendChild(a);
      a.click();

      // Remove the temporary <a> element
      document.body.removeChild(a);
    }
  };

  return (
    <div className="flex flex-col w-full justify-center content-center items-center bg-slate-50">
      <img src={"/cut-corridor.jpeg"} alt="BHW Corridor" className="" />
      <div className="pb-8">
        <div className="pt-6 pb-12 text-center flex flex-col items-center justify-center">
          <h1 className="text-theme-black font-inter text-5xl font-bold border-b-4 border-[#005DE2] w-1/2 py-7">
            Tools and Software used for our Project
          </h1>
        </div>
      </div>
      <div>
        {/* Render the PatientInfoPDF component with the patient data */}
        <PatientInfoPDF patient={patientData} />
      </div>
      <div className="flex justify-center mt-4">
        <Button onClick={generatePdf} className="mr-2">
          Generate PDF
        </Button>
        <Button onClick={downloadPdf}>Download PDF</Button>
      </div>
      <div className="fixed top-0 right-0 mt-4 mr-4 border-2 rounded-lg border-black">
        <Button
          asChild
          size="icon"
          className="backdrop-blur-[4px] bg-white/90 shadow-inner drop-shadow-md"
          variant="outline"
        >
          <Link to="/">
            <ArrowLeft color="#000000" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
