import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog.tsx";

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full justify-center content-center items-center bg-slate-200">
      <img src={"/cut-corridor.jpeg"} alt="BHW Corridor" className="" />
      <div className="pb-8">
        <div className="pt-6 pb-12 text-center flex flex-col items-center justify-center">
          <h1 className="text-theme-black font-inter text-5xl font-bold border-b-4 border-[#005DE2] w-1/2 py-7">
            About the Quartz Qilins
          </h1>
        </div>
        <div className="flex align-center justify-center">
          <img
            src={"/Qilin.jpg"}
            alt="kirin but with a q and l, qilin"
            className="size-2/5 rounded-lg"
          />
        </div>
        <div className="pt-6 pb-2 text-center">
          <p>
            A WPI Computer Science Project for CS3733-D24 Software Engineering
          </p>
        </div>
      </div>
      <div className="flex justify-center py-10 gap-36 mx-8 mb-8">
        <div className="">
          <Card className="h-full bg-slate-100 drop-shadow-md shadow-inner backdrop-blur-md flex-1 flex flex-col border-0">
            <CardHeader className="bg-[#2D83FF] py-5 mb-8 rounded-t-lg">
              <CardTitle className="capitalize text-center">
                Wilson Wong
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center items-center gap-2">
              <Dialog>
                <DialogTrigger>
                  <img
                    src={"/Wong.jpg"}
                    alt="Wilson Wong"
                    className="w-[300px] h-[300px] mb-2 rounded-lg hover:scale-105"
                  />
                </DialogTrigger>
                <DialogContent className="rounded-lg bg-slate-200">
                  <div className="w-[317.5px] h-[125px] rounded-lg bg-slate-200">
                    <p>I love Material UI</p>
                  </div>
                </DialogContent>
              </Dialog>
              <div className="h-8 flex-col justify-center items-center content-center text-center">
                <p>Course Professor</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="">
          <Card className="h-full bg-slate-100 drop-shadow-md shadow-inner backdrop-blur-md flex-1 flex flex-col border-0">
            <CardHeader className="bg-[#2D83FF] py-5 mb-8 rounded-t-lg">
              <CardTitle className="capitalize text-center">
                Ian Wright
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center items-center gap-2">
              <img
                src={"/Ian.jpg"}
                alt="Ian Wright"
                className="w-[300px] h-[300px] mb-2 rounded-lg"
              />
              <div className="h-8 flex-col justify-center items-center content-center text-center">
                <p>Team Coach</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-16 mb-6">
        <div className="w-[325px]">
          <Card className="h-full bg-slate-100 drop-shadow-md shadow-inner backdrop-blur-md flex-1 flex flex-col border-0">
            <CardHeader className="bg-[#9AC4FF] py-5 mb-8 rounded-t-lg">
              <CardTitle className="capitalize text-center">
                <div className="h-8 flex-col justify-center items-center content-center text-center">
                  <p>Thomas Beattie (Ace)</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center items-center gap-2">
              <img src={"/Ace.jpg"} alt="Ace" className="mb-2 rounded-lg" />
              <div className="h-8 flex-col justify-center items-center content-center text-center">
                <p>Lead Software Engineer</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-[325px]">
          <Card className="h-full bg-slate-100 drop-shadow-md shadow-inner backdrop-blur-md flex-1 flex flex-col border-0">
            <CardHeader className="bg-[#9AC4FF] py-5 mb-8 rounded-t-lg">
              <CardTitle className="capitalize text-center">
                <div className="h-8 flex-col justify-center items-center content-center text-center">
                  <p>Matthew Franco</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center items-center gap-2">
              <img
                src={"/Matt.jpg"}
                alt="Matthew"
                className="mb-2 rounded-lg"
              />
              <div className="h-8 flex-col justify-center items-center content-center text-center">
                <p>Assistant Lead Software Engineer</p>
                <p>Front-End and Feature Engineer</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-[325px]">
          <Card className="h-full bg-slate-100 drop-shadow-md shadow-inner backdrop-blur-md flex-1 flex flex-col border-0">
            <CardHeader className="bg-[#9AC4FF] py-5 mb-8 rounded-t-lg">
              <CardTitle className="capitalize text-center">
                <div className="h-8 flex-col justify-center items-center content-center text-center">
                  <p>Santiago Giraldo Godoy</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center items-center gap-2">
              <img
                src={"/Santiago.png"}
                alt="Santiago"
                className="mb-2 rounded-lg"
              />
              <div className="h-8 flex-col justify-center items-center content-center text-center">
                <p>Algorithms and Feature Engineer</p>
                <p>Back-End Database Engineer</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-[325px]">
          <Card className="h-full bg-slate-100 drop-shadow-md shadow-inner backdrop-blur-md flex-1 flex flex-col border-0">
            <CardHeader className="bg-[#9AC4FF] py-5 mb-8 rounded-t-lg">
              <CardTitle className="capitalize text-center">
                <div className="h-8 flex-col justify-center items-center content-center text-center">
                  <p>Parker Glispin</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center items-center gap-2">
              <img
                src={"/Parker.jpg"}
                alt="Parker"
                className="mb-2 rounded-lg"
              />
              <div className="h-8 flex-col justify-center items-center content-center text-center">
                <p>Product Owner</p>
                <p>Algorithms and Feature Engineer</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-[325px]">
          <Card className="h-full bg-slate-100 drop-shadow-md shadow-inner backdrop-blur-md flex-1 flex flex-col border-0">
            <CardHeader className="bg-[#9AC4FF] py-5 mb-8 rounded-t-lg">
              <CardTitle className="capitalize text-center">
                <div className="h-8 flex-col justify-center items-center content-center text-center">
                  <p>Michael Lin</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center items-center gap-2">
              <img
                src={"/Michael.jpg"}
                alt="Michael"
                className="mb-2 rounded-lg"
              />
              <div className="h-8 flex-col justify-center items-center content-center text-center">
                <p>Back-End Database Engineer</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-[325px]">
          <Card className="h-full bg-slate-100 drop-shadow-md shadow-inner backdrop-blur-md flex-1 flex flex-col border-0">
            <CardHeader className="bg-[#9AC4FF] py-5 mb-8 rounded-t-lg">
              <CardTitle className="capitalize text-center">
                <div className="h-8 flex-col justify-center items-center content-center text-center">
                  <p>Kevin McCrudden</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center items-center gap-2">
              <img src={"/Kevin.jpg"} alt="Kevin" className="mb-2 rounded-lg" />
              <div className="h-8 flex-col justify-center items-center content-center text-center">
                <p>Project Manager</p>
                <p>Scrum Master</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-[325px]">
          <Card className="h-full bg-slate-100 drop-shadow-md shadow-inner backdrop-blur-md flex-1 flex flex-col border-0">
            <CardHeader className="bg-[#9AC4FF] py-5 mb-8 rounded-t-lg">
              <CardTitle className="capitalize text-center">
                <div className="h-8 flex-col justify-center items-center content-center text-center">
                  <p>Keenan Porter</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center items-center gap-2">
              <img
                src={"/Keenan.jpg"}
                alt="Keenan"
                className="mb-2 rounded-lg"
              />
              <div className="h-8 flex-col justify-center items-center content-center text-center">
                <p>Front-End and Feature Engineer</p>
                <p>Documentation Analyst</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-[325px]">
          <Card className="h-full bg-slate-100 drop-shadow-md shadow-inner backdrop-blur-md flex-1 flex flex-col border-0">
            <CardHeader className="bg-[#9AC4FF] py-5 mb-8 rounded-t-lg">
              <CardTitle className="capitalize text-center">
                <div className="h-8 flex-col justify-center items-center content-center text-center">
                  <p>Daniel Reynolds</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center items-center gap-2">
              <img
                src={"/Daniel.jpg"}
                alt="Daniel"
                className="mb-2 rounded-lg"
              />
              <div className="h-8 flex-col justify-center items-center content-center text-center">
                <p>Front-End and Feature Engineer</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-[325px]">
          <Card className="h-full bg-slate-100 drop-shadow-md shadow-inner backdrop-blur-md flex-1 flex flex-col border-0">
            <CardHeader className="bg-[#9AC4FF] py-5 mb-8 rounded-t-lg">
              <CardTitle className="capitalize text-center">
                <div className="h-8 flex-col justify-center items-center content-center text-center">
                  <p>Cole Welcher</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center items-center gap-2">
              <img src={"/Cole.jpg"} alt="Pookie" className="mb-2 rounded-lg" />
              <div className="h-8 flex-col justify-center items-center content-center text-center">
                <p>Assistant Lead Software Engineer</p>
                <p>Algorithms and Feature Engineer</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-[325px]">
          <Card className="h-full bg-slate-100 drop-shadow-md shadow-inner backdrop-blur-md flex-1 flex flex-col border-0">
            <CardHeader className="bg-[#9AC4FF] py-5 mb-8 rounded-t-lg">
              <CardTitle className="capitalize text-center">
                <div className="h-8 flex-col justify-center items-center content-center text-center">
                  <p>Justin Yip</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center items-center gap-2">
              <img
                src={"/Justin.jpg"}
                alt="Justin"
                className="mb-2 rounded-lg"
              />
              <div className="h-8 flex-col justify-center items-center content-center text-center">
                <p>Front-End and Feature Engineer</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex justify-center gap-10 py-10 mt-10 mb-20 border-y-2 border-slate-300 w-5/6 self-center">
        <div className="flex flex-col items-center justify-center gap-5 w-1/2">
          <p className="text-2xl">
            And a thank you to Brigham and Women's Hospital and their
            representative and senior planner, Andrew Shinn.
          </p>
          <div className="flex flex-row gap-3 text-theme-blue">
            <svg
              width="42"
              height="60"
              viewBox="0 0 29 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.8 15.3999H0V21.8999V27.7999H3.8V15.3999Z"
                fill="#005DE2"
              />
              <path
                d="M8.20001 15.3999V21.8999V27.7999H12.1V15.3999H8.20001Z"
                fill="#005DE2"
              />
              <path
                d="M16.5 15.3999V21.8999V27.7999H20.3V15.3999H16.5Z"
                fill="#005DE2"
              />
              <path d="M0 13H14.3H28.6V9.5H0V13Z" fill="#005DE2" />
              <path
                d="M14.3 0L0 4.7V8.4L14.3 3.6L28.6 8.4V4.7L14.3 0Z"
                fill="#005DE2"
              />
              <path
                d="M28.6 27.5C28.5 27.7 27.1 30.1 18 30.1H10.6C1.2 30.2 0.2 31.4 0 31.5V35.1C0.2 35 1.2 33.8 10.6 33.7H18C27.1 33.7 28.5 31.3 28.6 31.1V27.5Z"
                fill="#005DE2"
              />
              <path
                d="M28.6 33.3999C28.5 33.5999 27.1 35.9999 18 35.9999H10.6C1.2 36.0999 0.2 37.2999 0 37.3999V40.9999C0.2 40.8999 1.2 39.6999 10.6 39.5999H18C27.1 39.5999 28.5 37.1999 28.6 36.9999V33.3999Z"
                fill="#005DE2"
              />
              <path
                d="M24.7 15.3999V27.1999C27.8 26.4999 28.5 25.3999 28.5 25.1999V15.3999H24.7Z"
                fill="#005DE2"
              />
            </svg>
            <h1 className="text-left font-inter text-2xl font-bold text-[#005DE2]">
              Brigham and
              <br />
              Women's Hospital
            </h1>
          </div>
        </div>
        <img src={"/Andrew.jpg"} alt="Andrew" className="size-1/6 rounded-lg" />
      </div>
      <div className="text-center py-4">
        <footer>
          The Brigham & Women’s Hospital maps and data used in this application
          are copyrighted and provided for the sole use of educational purposes.
        </footer>
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
