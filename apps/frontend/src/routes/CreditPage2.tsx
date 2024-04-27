import { Link } from "wouter";
import { Button } from "@/components/ui/button.tsx";
import { ArrowLeft } from "lucide-react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards.tsx";

export function InfiniteMovingCardsCredit() {
  return (
    <div className="h-[450px] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    quote: "Placeholder1",
    name: "Placeholder1",
    title: "Placeholder1",
  },
  {
    quote: "Placeholder2",
    name: "Placeholder2",
    title: "Placeholder2",
  },
  {
    quote: "Placeholder3",
    name: "Placeholder3",
    title: "Placeholder3",
  },
  {
    quote: "Placeholder4",
    name: "Placeholder4",
    title: "Placeholder4",
  },
  {
    quote: "Placeholder5",
    name: "Placeholder5",
    title: "Placeholder5",
  },
];
export default function CreditPage() {
  return (
    <div className="flex flex-col w-full justify-center content-center items-center bg-slate-200">
      <img src={"/cut-corridor.jpeg"} alt="BHW Corridor" className="" />
      <div className="pb-8">
        <div className="pt-6 pb-12 text-center flex flex-col items-center justify-center">
          <h1 className="text-theme-black font-inter text-5xl font-bold border-b-4 border-[#005DE2] w-1/2 py-7">
            Tools and Software used for our Project
          </h1>
        </div>
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
      <div className="flex flex-col w-full justify-center content-center items-center">
        <InfiniteMovingCardsCredit />
      </div>
    </div>
  );
}
