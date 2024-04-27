import { Link } from "wouter";
import { Button } from "@/components/ui/button.tsx";
import { ArrowLeft } from "lucide-react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards.tsx";

export function InfiniteMovingCardsCreditProjectSoftware() {
  return (
    <div className="bg-slate-50">
      <InfiniteMovingCards
        items={testimonialsSoftware}
        direction="right"
        speed="slow"
      />
    </div>
  );
}
export function InfiniteMovingCardsCreditProject() {
  return (
    <div className="bg-slate-50">
      <InfiniteMovingCards
        items={testimonialsProject}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

export function InfiniteMovingCardsCreditCommunication() {
  return (
    <div className="bg-slate-50">
      <InfiniteMovingCards
        items={testimonialsCommunication}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonialsSoftware = [
  {
    name: (
      <a href="https://www.jetbrains.com/webstorm/">
        <button className="hover:bg-sky-300 text-black">Webstorm</button>
      </a>
    ),
    description:
      "WebStorm is a powerful IDE for modern JavaScript development. WebStorm provides full support for JavaScript, TypeScript, HTML, CSS as well as for frameworks such as React, Angular, and Vue.",
    extraInfo: "(Version: 2023.3.5)",
  },
  {
    name: (
      <a href="https://nodejs.org/en">
        <button className="hover:bg-sky-300 text-black">Node.js</button>
      </a>
    ),
    description:
      "Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.",
    extraInfo: "(Version: 21.7.1)",
  },
  {
    name: (
      <a href="https://www.docker.com/#build">
        <button className="hover:bg-sky-300 text-black">Docker</button>
      </a>
    ),
    description:
      "Docker is a set of platform as a service products that use OS-level virtualization to deliver software in packages called containers.",
    extraInfo: "(App version 4.28.0, CMD version 25.0.3)",
  },
  {
    name: (
      <a href="https://www.postgresql.org/">
        <button className="hover:bg-sky-300 text-black">PostgreSQL</button>
      </a>
    ),
    description:
      "PostgreSQL is a powerful, open-source object-relational database system with over 30 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance.",
    extraInfo: "(Version: 16)",
  },
  {
    name: (
      <a href="https://www.prisma.io/">
        <button className="hover:bg-sky-300 text-black">PrismaORM</button>
      </a>
    ),
    description:
      "Prisma is an open-source database toolkit. It replaces traditional ORMs and makes database access easy with an auto-generated query builder for TypeScript & Node.js.",
    extraInfo: "(Version: 4.1.5)",
  },
  {
    name: (
      <a href="https://trpc.io/">
        <button className="hover:bg-sky-300 text-black">tRPC</button>
      </a>
    ),
    description:
      "tRPC is a TypeScript-first framework for building scalable, type-safe APIs with TypeScript and Node.js. It is a modern take on the traditional RPC pattern.",
    extraInfo: "(Version: 11.0.0)",
  },
];

const testimonialsProject = [
  {
    name: (
      <a href="https://www.atlassian.com/software/jira">
        <button className="hover:bg-sky-300 text-black">Jira</button>
      </a>
    ),
    description:
      "Jira is a proprietary issue tracking product developed by Atlassian that allows bug tracking and agile project management.",
    extraInfo: "",
  },
  {
    name: (
      <a href="https://www.atlassian.com/software/confluence">
        <button className="hover:bg-sky-300 text-black">Confluence</button>
      </a>
    ),
    description:
      "Confluence is a team workspace where knowledge and collaboration meet. Dynamic pages give your team a place to create, capture, and collaborate on any project or idea.",
    extraInfo: "",
  },
  {
    name: (
      <a href="https://www.github.com">
        <button className="hover:bg-sky-300 text-black">Github</button>
      </a>
    ),
    description:
      "GitHub is a web-based platform used for version control. Git simplifies the process of working with other people and makes it easy to collaborate on projects.",
    extraInfo: "",
  },
  {
    name: (
      <a href="https://app.diagrams.net/">
        <button className="hover:bg-sky-300 text-black">Draw IO</button>
      </a>
    ),
    description:
      "Draw.io is a free online diagram software for making flowcharts, process diagrams, org charts, UML, ER and network diagrams.",
    extraInfo: "",
  },
  {
    name: (
      <a href="https://www.figma.com/">
        <button className="hover:bg-sky-300 text-black">Figma</button>
      </a>
    ),
    description:
      "Figma is a cloud-based design tool that is similar to Sketch in functionality and features, but with big differences that make Figma better for team collaboration.",
    extraInfo: "",
  },
  {
    name: (
      <a href="https://drive.google.com/">
        <button className="hover:bg-sky-300 text-black">Google Drive</button>
      </a>
    ),
    description:
      "Google Drive is a file storage and synchronization service developed by Google. It allows users to store files in the cloud, synchronize files across devices, and share files.",
    extraInfo: "",
  },
];

const testimonialsCommunication = [
  {
    name: (
      <a href="https://outlook.office.com/">
        <button className="hover:bg-sky-300 text-black">Outlook</button>
      </a>
    ),
    description:
      "Outlook is a web-based suite of webmail, contacts, tasks, and calendaring services from Microsoft.",
    extraInfo: "",
  },
  {
    name: (
      <a href="https://zoom.us/">
        <button className="hover:bg-sky-300 text-black">Zoom</button>
      </a>
    ),
    description:
      "Confluence is a team workspace where knowledge and collaboration meet. Dynamic pages give your team a place to create, capture, and collaborate on any project or idea.",
    extraInfo: "",
  },
  {
    name: (
      <a href="https://slack.com/">
        <button className="hover:bg-sky-300 text-black">Slack</button>
      </a>
    ),
    description:
      "Slack is a proprietary business communication platform developed by Slack Technologies.",
    extraInfo: "",
  },
];
export default function CreditPage() {
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
      <div className="pt-6 pb-2 text-center">
        <p>Software</p>
      </div>
      <div className="">
        <InfiniteMovingCardsCreditProjectSoftware />
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
      <div className="pt-6 pb-2 text-center">
        <p>Project</p>
      </div>
      <div className="">
        <InfiniteMovingCardsCreditProject />
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
      <div className="pt-6 pb-2 text-center">
        <p>Communication</p>
      </div>
      <div className="">
        <InfiniteMovingCardsCreditCommunication />
      </div>
    </div>
  );
}
