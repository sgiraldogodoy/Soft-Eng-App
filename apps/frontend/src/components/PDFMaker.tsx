import React from "react";
import generatePDF, { Resolution, Margin, Options } from "react-to-pdf";
//import { ButtonExample } from "./ButtonExample";
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
  return <div className="container">{children}</div>;
};

interface CardProps {
  title?: string;
  imageId: number;
}

export const Card = ({
  title = "Welcome to Our Sample Component",
  imageId,
}: CardProps) => {
  return (
    <div className="card-container">
      <img
        src={`https://picsum.photos/id/${imageId}/400/200`}
        alt="Sample"
        className="card-image"
      />
      <h2 className="card-title">{title}</h2>
      <p className="card-paragraph">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget
        libero quam. Fusce efficitur, lectus ac commodo maximus, neque augue
        tincidunt tellus, id dictum odio eros ac nulla.
      </p>
      <p className="card-paragraph">
        Vivamus at urna sit amet justo auctor vestibulum ut nec nisl. Sed auctor
        augue eget libero tincidunt, ut dictum libero facilisis. Phasellus non
        libero at nisi eleifend tincidunt a eget ligula.
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
        <Card imageId={30} title="Using advanced example" />
      </div>
    </Container>
  );
};

export default PDF;
