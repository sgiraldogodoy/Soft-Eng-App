import {
  Mapaccordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/mapaccordion.tsx";

export default function FloorTabs() {
  return (
    <Mapaccordion
      type="single"
      collapsible
      className="w-full flex flex-col h-screen"
    >
      <AccordionItem
        value="thirdfloor"
        className="[&[data-state=open]]:h-full flex flex-col"
      >
        <AccordionTrigger>Third Floor</AccordionTrigger>
        <AccordionContent className="relative h-full">
          <div className="absolute top-0 bottom-0 w-full flex justify-center">
            <img
              src="/03_thethirdfloor.png"
              alt="Lower level 1 image"
              className="object-cover h-full"
            />
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="secondfloor"
        className="[&[data-state=open]]:h-full flex flex-col"
      >
        <AccordionTrigger>Second Floor</AccordionTrigger>
        <AccordionContent className="relative h-full">
          <div className="absolute top-0 bottom-0 w-full flex justify-center">
            <img
              src="/02_thesecondfloor.png"
              alt="Lower level 1 image"
              className="object-cover h-full"
            />
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="firstfloor"
        className="[&[data-state=open]]:h-full flex flex-col"
      >
        <AccordionTrigger>First Floor</AccordionTrigger>
        <AccordionContent className="relative h-full">
          <div className="absolute top-0 bottom-0 w-full flex justify-center">
            <img
              src="/01_thefirstfloor.png"
              alt="Lower level 1 image"
              className="object-cover h-full"
            />
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="groundfloor"
        className="[&[data-state=open]]:h-full flex flex-col"
      >
        <AccordionTrigger>Ground Floor</AccordionTrigger>
        <AccordionContent className="relative h-full">
          <div className="absolute top-0 bottom-0 w-full flex justify-center">
            <img
              src="/00_thegroundfloor.png"
              alt="Ground Floor Image"
              className="object-cover h-full"
            />
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="lowerlevelone"
        className="[&[data-state=open]]:h-full flex flex-col"
      >
        <AccordionTrigger>Lower Level One</AccordionTrigger>
        <AccordionContent className="relative h-full">
          <div className="absolute top-0 bottom-0 w-full flex justify-center">
            <img
              src="/00_thelowerlevel1.png"
              alt="Lower level 1 Image"
              className="object-cover h-full"
            />
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="lowerleveltwo"
        className="[&[data-state=open]]:h-full flex flex-col"
      >
        <AccordionTrigger>Lower Level Two</AccordionTrigger>
        <AccordionContent className="relative h-full">
          <div className="absolute top-0 bottom-0 w-full flex justify-center">
            <img
              src="/00_thelowerlevel2.png"
              alt="Lower level 1 Image"
              className="object-cover h-full"
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Mapaccordion>
  );
}

// <ul className="bg-gray-800 text-white flex">
//     {[1, 2, 3, 4, 5].map((floor) => (
//         <li key={floor} className="p-4 cursor-pointer" onClick={() => handleTabClick(floor)}>
//             Floor {floor}
//         </li>
//     ))}
// </ul>
// <div className="flex-grow overflow-y-auto">
//     {[1, 2, 3, 4, 5].map((floor) => (
//         <div
//             key={floor}
//             className={`p-4 ${selectedFloor === floor ? 'block' : 'hidden'}`}
//         >
//             <h2>Floor {floor}</h2>
//             <p>This is the content for Floor {floor}.</p>
//         </div>
//     ))}
// </div>
// const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
//
// const handleTabClick = (floor: number) => {
//     setSelectedFloor(floor);
// };
