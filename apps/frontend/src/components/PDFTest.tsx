import { Link } from "wouter";
import { Button } from "@/components/ui/button.tsx";
import { ArrowLeft } from "lucide-react";
//import { PDFDownloadLink } from "@react-pdf/renderer";
//import {PatientIntoPDF} from "@/components/PDFMaker.tsx";

// const patientData = {
//     name: "John Doe",
//     age: 30,
//     gender: "Male",
//     address: "123 Main Street, City, Country",
// };
// const PDF = () =>{
//     PatientIntoPDF {...patientData};
//     );
// };

export function TestPDF() {
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
      <div className="flex justify-center mt-4">
        {/*<div>*/}
        {/*  <PDFDownloadLink document={<PDF />} fileName="somename.pdf">*/}
        {/*    {({ loading }) =>*/}
        {/*      loading ? "Loading document..." : "Download now!"*/}
        {/*    }*/}
        {/*  </PDFDownloadLink>*/}
        {/*</div>*/}
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
