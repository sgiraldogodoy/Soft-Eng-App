import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card.tsx";

export default function AboutPage() {
  return (
    <div className="flex-col w-full justify-center content-center items-center">
      <div className="py-6">
        <div className="py-10 text-center">
          <h1 className="text-theme-black font-inter text-5xl font-bold">
            About the Quartz Qilins
          </h1>
        </div>
        <div className="flex align-center justify-center">
          <img
            src={"/Qilin.jpg"}
            alt="kirin but with a q and l, qilin"
            className="size-2/5"
          />
        </div>
        <div className="py-2 text-center">
          <p>
            A WPI Computer Science Project for CS3733-D24 Software Engineering
          </p>
        </div>
      </div>
      <div className="flex py-10 gap-8 mx-8">
        <Card className="bg-slate-300 drop-shadow-md shadow-inner backdrop-blur-md flex-1 flex flex-col">
          <CardHeader>
            <CardTitle className="capitalize">Wilson Wong</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center items-center gap-2">
            <img src={"/Wong.jpg"} alt="Wilson Wong" className="" />
            <p>Course Professor</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-300 drop-shadow-md shadow-inner backdrop-blur-md flex-1 flex flex-col">
          <CardHeader>
            <CardTitle className="capitalize">Ian Wright</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center items-center gap-2">
            <img src={"/Ian.jpg"} alt="Ian Wright" className="" />
            <p>Team Coach</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-wrap justify-evenly">
        <Card className="w-1/4 bg-slate-300 drop-shadow-md shadow-inner backdrop-blur-md flex-1 flex flex-col">
          <CardHeader>
            <CardTitle className="capitalize">Thomas Beattie (Ace)</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center items-center gap-2">
            <img src={"/Ace.jpg"} alt="Ace" className="size-1/6" />
            <p>Lead Software Engineer</p>
          </CardContent>
        </Card>
        <Card className="w-1/4 bg-slate-300 drop-shadow-md shadow-inner backdrop-blur-md flex-1 flex flex-col">
          <CardHeader>
            <CardTitle className="capitalize">Matthew Franco</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center items-center gap-2">
            <img src={"/Matt.jpg"} alt="Matthew" className="size-1/6" />
            <p>Assistant Lead Software Engineer</p>
            <p>Front-End and Feature Engineer</p>
          </CardContent>
        </Card>
        <Card className="w-1/4 bg-slate-300 drop-shadow-md shadow-inner backdrop-blur-md flex-1 flex flex-col">
          <CardHeader>
            <CardTitle className="capitalize">Santiago Giraldo Godoy</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center items-center gap-2">
            <img src={"/Santiago.jpg"} alt="Santiago" className="size-1/6" />
            <p>Algorithms and Feature Engineer</p>
            <p>Back-End Database Engineer</p>
          </CardContent>
        </Card>
        <Card className="w-1/4 bg-slate-300 drop-shadow-md shadow-inner backdrop-blur-md flex-1 flex flex-col">
          <CardHeader>
            <CardTitle className="capitalize">Parker Glispin</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center items-center gap-2">
            <img src={"/Parker.jpg"} alt="Parker" className="size-1/6" />
            <p>Product Owner</p>
            <p>Algorithms and Feature Engineer</p>
          </CardContent>
        </Card>
        <Card className="w-1/4 bg-slate-300 drop-shadow-md shadow-inner backdrop-blur-md flex-1 flex flex-col">
          <CardHeader>
            <CardTitle className="capitalize">Michael Lin</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center items-center gap-2">
            <img src={"/Michael.jpg"} alt="Michael" className="size-1/6" />
            <p>Back-End Database Engineer</p>
          </CardContent>
        </Card>
        <Card className="w-1/4 bg-slate-300 drop-shadow-md shadow-inner backdrop-blur-md flex-1 flex flex-col">
          <CardHeader>
            <CardTitle className="capitalize">Kevin McCrudden</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center items-center gap-2">
            <img src={"/Kevin.jpg"} alt="Kevin" className="size-1/6" />
            <p>Project Manager</p>
            <p>Scrum Master</p>
          </CardContent>
        </Card>
        <Card className="w-1/4 bg-slate-300 drop-shadow-md shadow-inner backdrop-blur-md flex-1 flex flex-col">
          <CardHeader>
            <CardTitle className="capitalize">Keenan Porter</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center items-center gap-2">
            <img src={"/Keenan.jpg"} alt="Keenan" className="size-1/6" />
            <p>Front-End and Feature Engineer</p>
            <p>Documentation Analyst</p>
          </CardContent>
        </Card>
        <Card className="w-1/4 bg-slate-300 drop-shadow-md shadow-inner backdrop-blur-md flex-1 flex flex-col">
          <CardHeader>
            <CardTitle className="capitalize">Daniel Reynolds</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center items-center gap-2">
            <img src={"/Daniel.jpg"} alt="Daniel" className="size-1/6" />
            <p>Front-End and Feature Engineer</p>
          </CardContent>
        </Card>
        <Card className="w-1/4 bg-slate-300 drop-shadow-md shadow-inner backdrop-blur-md flex-1 flex flex-col">
          <CardHeader>
            <CardTitle className="capitalize">Cole Welcher</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center items-center gap-2">
            <img src={"/Cole.jpg"} alt="Pookie" className="size-1/6" />
            <p>Assistant Lead Software Engineer</p>
            <p>Algorithms and Feature Engineer</p>
          </CardContent>
        </Card>
        <Card className="w-1/4 bg-slate-300 drop-shadow-md shadow-inner backdrop-blur-md flex-1 flex flex-col">
          <CardHeader>
            <CardTitle className="capitalize">Justin Yip</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center items-center gap-2">
            <img src={"/Justin.jpg"} alt="Justin" className="size-1/6" />
            <p>Front-End and Feature Engineer</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex-row py-10">
        <p>
          And a thank you to Brigham and Women's Hospital and their
          representative, Andrew Shinn
        </p>
        <img src={"/Andrew.jpg"} alt="Andrew" className="size-1/6" />
      </div>
      <div className="text-center self-end py-4">
        <footer>
          The Brigham & Women’s Hospital maps and data used in this application
          are copyrighted and provided for the sole use of educational purposes.
        </footer>
      </div>
    </div>
  );
}

/*
    Requirements:

    The About page lists the following: WPI
Computer Science Department, CS3733-D24 Software Engineering, Prof. Wilson Wong,
the name of your team coach, and the names, positions, and photos of each team
member. Also thank Brigham and Women’s Hospital and their representative, Andrew
Shinn.


Needs to also convert to Poppins Font?
 */
