import React from "react";
import generatePDF, { Resolution, Margin, Options } from "react-to-pdf";
import { Button } from "@/components/ui/button.tsx";

const options: Options = {
  filename: "advanced-example.pdf",
  method: "save",
  // default is Resolution.MEDIUM = 3, which should be enough, higher values
  // increases the image quality but also the size of the PDF, so be careful
  // using values higher than 10 when having multiple pages generated, it
  // might cause the page to crash or hang.
  resolution: Resolution.EXTREME,
  page: {
    // margin is in MM, default is Margin.NONE = 0
    margin: Margin.SMALL,
    // default is 'A4'
    format: "letter",
    // default is 'portrait'
    orientation: "portrait",
  },
  canvas: {
    // default is 'image/jpeg' for better size performance
    mimeType: "image/jpeg",
    qualityRatio: 1,
  },
  // Customize any value passed to the jsPDF instance and html2canvas
  // function. You probably will not need this and things can break,
  // so use with caution.
  overrides: {
    // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
    pdf: {
      compress: true,
    },
    // see https://html2canvas.hertzen.com/configuration for more options
    canvas: {
      useCORS: true,
    },
  },
};

type ContainerProps = {
  children: React.ReactNode;
};

export const Container = ({ children }: ContainerProps) => {
  return <div className="container bg-slate-50">{children}</div>;
};

interface CardProps {
  title?: string;
}

export const Card = ({
  title = "Welcome to Our Sample Component",
}: CardProps) => {
  return (
    <div className="card-container bg-slate-50">
      <img src={"/cut-corridor.jpeg"} alt="BHW Corridor" className="" />
      <h2 className="card-title bg-slate-50">{title}</h2>
      <p className="flex flex-col w-full justify-center content-center items-center bg-slate-50">
        HI
      </p>
      <p className="flex flex-col w-full justify-center content-center items-center bg-slate-50">
        Pookie
      </p>
    </div>
  );
};

// you can also use a function to return the target element besides using React refs
const getTargetElement = () => document.getElementById("container");

const downloadPdf = () => generatePDF(getTargetElement, options);

const PDF = () => {
  return (
    <Container>
      <Button onClick={downloadPdf}>Download PDF</Button>
      <div id="container">
        <Card title="Using advanced example" />
      </div>
    </Container>
  );
};

export default PDF;
