import { Link } from "wouter";
import { Button } from "@/components/ui/button.tsx";
import { ArrowLeft } from "lucide-react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect.tsx";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export function CreditPage2() {
  return (
    <>
      <div className="flex flex-col w-full justify-center content-center items-center bg-slate-50">
        <img src={"/cut-corridor.jpeg"} alt="BHW Corridor" className="" />
        <div className="pb-8">
          <div className="pt-6 pb-12 text-center flex flex-col items-center justify-center">
            <h1 className="text-theme-black font-inter text-5xl font-bold border-b-4 border-[#005DE2] w-1/2 py-7">
              Tools and Software used for our Project
            </h1>
          </div>
        </div>
      </div>
      <div className="py-20 flex flex-col lg:flex-row items-center justify-center bg-white dark:bg-black w-full gap-4 mx-auto px-8">
        <Card title="Sheetal is Nisha" icon={<AceternityIcon />}>
          <CanvasRevealEffect
            animationSpeed={1}
            containerClassName="bg-slate-600"
          />
        </Card>
        <Card title="Nisha is Munni" icon={<AceternityIcon />}>
          <CanvasRevealEffect
            animationSpeed={1}
            containerClassName="bg-black"
            colors={[
              [236, 72, 153],
              [232, 121, 249],
            ]}
          />
          <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
        </Card>
        <Card title="Munni is Aditi" icon={<AceternityIcon />}>
          <CanvasRevealEffect
            animationSpeed={1}
            containerClassName="bg-sky-600"
            colors={[[125, 211, 252]]}
          />
        </Card>
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
    </>
  );
}

const Card = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2]  max-w-sm w-full mx-auto p-4 relative h-[30rem] relative"
    >
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20">
        <div className="text-center group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full  mx-auto flex items-center justify-center">
          {icon}
        </div>
        <h2 className="dark:text-white text-xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
          {title}
        </h2>
      </div>
    </div>
  );
};

const AceternityIcon = () => {
  return (
    <svg
      width="66"
      height="65"
      viewBox="0 0 66 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-10 text-black dark:text-white group-hover/canvas-card:text-white "
    >
      <path
        d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
        stroke="currentColor"
        strokeWidth="15"
        strokeMiterlimit="3.86874"
        strokeLinecap="round"
        style={{ mixBlendMode: "darken" }}
      />
    </svg>
  );
};

interface IconProps {
  className?: string;
}

export const Icon = ({ className, ...rest }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
