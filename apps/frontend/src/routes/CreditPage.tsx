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

export function InfiniteMovingCardsCreditLibraries() {
  return (
    <div className="bg-slate-50">
      <InfiniteMovingCards
        items={testimonialsLibraries}
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
  {
    name: (
      <a href="https://discord.com/">
        <button className="hover:bg-sky-300 text-black">Discord</button>
      </a>
    ),
    description:
      "Discord is a proprietary freeware VoIP application and digital distribution platform designed for creating communities ranging from gamers to education and businesses.",
    extraInfo: "",
  },
  {
    name: (
      <a href="https://canvas.wpi.edu/">
        <button className="hover:bg-sky-300 text-black">Canvas</button>
      </a>
    ),
    description:
      "Canvas is a learning management system that allows teachers to provide instructional support, class calendars, assignments, and resources for students in a safe online environment.",
    extraInfo: "",
  },
  {
    name: (
      <a href="https://support.apple.com/messages">
        <button className="hover:bg-sky-300 text-black">iMessage</button>
      </a>
    ),
    description:
      "iMessage is an instant messaging service developed by Apple Inc. that allows users to send texts, documents, photos, videos, contact information, and group messages over Wi-Fi, mobile phone internet access, or other forms of internet access to other iOS or macOS users.",
    extraInfo: "",
  },
];

const testimonialsLibraries = [
  {
    name: "Libraries Used",
    description:
      "@auth0/auth0-react: ^2.1.4, @hookform/resolvers: ^3.3.4, @popperjs/core: ^2.11.8, @radix-ui/react-accordion: ^1.1.2, @radix-ui/react-alert-dialog: ^1.0.5, @radix-ui/react-checkbox: ^1.0.4, @radix-ui/react-dialog: ^1.0.5, @radix-ui/react-dropdown-menu: ^2.0.6, @radix-ui/react-icons: ^1.3.0, @radix-ui/react-label: ^2.0.2, @radix-ui/react-navigation-menu: ^1.1.4, @radix-ui/react-popover: ^1.0.7, @radix-ui/react-select: ^2.0.0, @radix-ui/react-slot: ^1.0.2, @radix-ui/react-switch: ^1.0.3, @radix-ui/react-tabs: ^1.0.4, @radix-ui/react-toast: ^1.1.5, @radix-ui/react-toggle: ^1.0.3, @radix-ui/react-toggle-group: ^1.0.4, @radix-ui/react-tooltip: ^1.0.7, @tanstack/react-query: ^5.28.9, @tanstack/react-table: ^8.9.3, @trpc/client: 11.0.0-next.327, @trpc/react-query: 11.0.0-next.327, @trpc/server: 11.0.0-next.327, accordion: ^3.0.2, add: ^2.0.6, api: workspace:^, autoprefixer: ^10.4.18, axios: ^1.4.0, class-variance-authority: ^0.7.0, clsx: ^2.1.0, cmdk: 0.2.0, common: workspace:^, date-fns: ^3.6.0, dropdown-menu: ^0.1.1, embla-carousel-react: ^8.0.0, framer-motion: ^11.0.28, localforage: ^1.10.0, lucide-react: ^0.363.0, luxon: ^3.4.4, match-sorter: ^6.3.1, next-themes: ^0.3.0, postcss: ^8.4.35, react: ^18.2.0, react-datetime: ^3.2.0, react-day-picker: ^8.10.1, react-dom: ^18.2.0, react-hook-form: ^7.51.3, react-hot-toast: ^2.4.1, react-qr-code: ^2.0.12, react-qrcode-logo: ^2.10.0, react-router-bootstrap: ^0.26.2, react-zoom-pan-pinch: ^3.1.0, serve: ^14.2.0, shadcn-ui: ^0.8.0, simplex-noise: ^4.0.1, sonner: ^1.4.41, sort-by: ^1.2.0, superjson: 1.13.3, tailwind-merge: ^2.2.2, tailwindcss: ^3.4.1, tailwindcss-animate: ^1.0.7, toggle-group: ^1.0.5, use-mask-input: ^3.3.7, wouter: ^3.1.0, zod: ^3.23.4, @types/luxon: ^3, @types/node: ^20.2.5, @types/prop-types: ^15.7.5, @types/react: ^18.0.37, @types/react-dom: ^18.0.11, @types/react-router-bootstrap: ^0.26.0, @vitejs/plugin-react-swc: ^3.0.0, database: workspace:*, eslint: latest, eslint-config-custom: workspace:*, eslint-plugin-react-hooks: ^4.6.0, eslint-plugin-react-refresh: ^0.4.1, prettier: latest, prettier-config-custom: workspace:*, sass: ^1.62.1, tailwindcss-dotted-background: ^1.1.0, tsconfig-custom: workspace:*, typescript: ^5.0.2, vite: ^4.3.9, vite-plugin-eslint: ^1.8.1, vitest: ^0.34.1, @types/express: ^4.17.21, @types/jsonwebtoken: ^9, @types/priorityqueuejs: ^1.0.4, express: ^4.19.2, jsonwebtoken: ^9.0.2, jwks-rsa: ^3.1.0, priorityqueuejs: ^2.0.0, @commitlint/cli: ^19.2.1, @commitlint/config-conventional: ^19.1.0, @commitlint/prompt-cli: ^19.2.0, @vitest/ui: ^0.33.0, dotenv: ^16.4.5, dotenv-cli: ^7.4.1, happy-dom: ^10.6.3, husky: ^8.0.0, turbo: latest",
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
      <div className="pt-6 pb-2 text-center">
        <p>Software</p>
      </div>
      <div className="">
        <InfiniteMovingCardsCreditProjectSoftware />
      </div>
      <div className="pt-6 pb-2 text-center">
        <p>Project</p>
      </div>
      <div className="">
        <InfiniteMovingCardsCreditProject />
      </div>
      <div className="pt-6 pb-2 text-center">
        <p>Communication</p>
      </div>
      <div className="">
        <InfiniteMovingCardsCreditCommunication />
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
