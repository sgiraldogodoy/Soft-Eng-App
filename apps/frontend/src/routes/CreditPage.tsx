import { Link } from "wouter";
import { Card, CardTitle } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ArrowLeft } from "lucide-react";

export default function CreditPage() {
  return (
    <>
      <img
        src={"/BWH Logo.svg"}
        alt="pic"
        className="h-12 w-12 object-left-top"
      />
      <h1 className="text-center pb-16 text-2xl">Software Used</h1>

      <div className="container m-auto grid grid-cols-4 gap-2">
        <Card>
          <CardTitle className="text-center m-auto pt-9 pb-7">
            <h1>Software tools</h1>
          </CardTitle>
          <div className="text-center space-y-5">
            <p>
              <a href="https://eslint.org/">
                <button className="hover:bg-sky-300 text-blue-500">
                  ESLint
                </button>
              </a>
            </p>
            <p>
              <a href="https://github.com/">
                <button className="hover:bg-sky-300 text-blue-500">Git</button>
              </a>
            </p>
            <p>
              <a href="https://www.postgresql.org/">
                <button className="hover:bg-sky-300 text-blue-500">
                  PostgresSQL
                </button>
              </a>
            </p>
            <p>
              <a href="https://www.prisma.io/">
                <button className="hover:bg-sky-300 text-blue-500">
                  Prisma Client
                </button>
              </a>
            </p>
            <p>
              <a href="https://trpc.io/">
                <button className="hover:bg-sky-300 text-blue-500">TRPC</button>
              </a>
            </p>
          </div>
        </Card>

        <Card>
          <CardTitle className="text-center m-auto pt-9 pb-7">
            <h1>Software Libraries</h1>
          </CardTitle>
          <div className="text-center space-y-3">
            <p>Wouter</p>
            <p>
              <a href="https://auth0.com/">
                <button className="hover:bg-sky-300 text-blue-500">
                  Auth0-react
                </button>
              </a>
            </p>
            <p>
              <a href="https://react.dev/">
                <button className="hover:bg-sky-300 text-blue-500">
                  React
                </button>
              </a>
            </p>
            <p>
              <a href="https://www.npmjs.com/package/clsx">
                <button className="hover:bg-sky-300 text-blue-500">CLSX</button>
              </a>
            </p>
            <p>ResizeObserver</p>
            <p>
              <a href="https://zod.dev/">
                <button className="hover:bg-sky-300 text-blue-500">Zod</button>
              </a>
            </p>
            <p>PriorityQueueJS</p>
          </div>
        </Card>

        <Card>
          <CardTitle className="text-center m-auto pt-9 pb-7">
            <h1>Frameworks</h1>
          </CardTitle>
          <div className="text-center space-y-5">
            <p>
              <a href="https://react.dev/">
                <button className="hover:bg-sky-300 text-blue-500">
                  React
                </button>
              </a>
            </p>
            <p>
              <a href="https://www.prisma.io/">
                <button className="hover:bg-sky-300 text-blue-500">
                  Prisma
                </button>
              </a>
            </p>
            <p>
              <a href="https://www.framer.com/">
                <button className="hover:bg-sky-300 text-blue-500">
                  Framer
                </button>
              </a>
            </p>
          </div>
        </Card>

        <Card>
          <CardTitle className="text-center m-auto pt-9 pb-7">
            <h1>Other</h1>
          </CardTitle>
          <div className="text-center space-y-5">
            <p>
              <a href="https://ui.shadcn.com/">
                <button className="hover:bg-sky-300 text-blue-500">
                  Shadcn Component Library
                </button>
              </a>
            </p>
            <p>
              <a href="https://lucide.dev/icons/">
                <button className="hover:bg-sky-300 text-blue-500">
                  Lucide Icons
                </button>
              </a>
            </p>
          </div>
        </Card>
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
    </>
  );
}
