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
      <div className="flex justify-center py-10 gap-8 mx-8">
        <div className="w-1/3">
          <Card className="h-full bg-slate-300 drop-shadow-md shadow-inner backdrop-blur-md flex-1 flex flex-col">
            <CardHeader>
              <CardTitle className="capitalize text-center">
                Wilson Wong
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center items-center gap-2">
              <img src={"/Wong.jpg"} alt="Wilson Wong" className="" />
              <p>Course Professor</p>
            </CardContent>
          </Card>
        </div>
        <div className="w-1/3">
          <Card className="h-full bg-slate-300 drop-shadow-md shadow-inner backdrop-blur-md flex-1 flex flex-col">
            <CardHeader>
              <CardTitle className="capitalize text-center">
                Ian Wright
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center items-center gap-2">
              <img src={"/Ian.jpg"} alt="Ian Wright" className="" />
              <p>Team Coach</p>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-16">
        <div className="w-1/4">
          <Card className="h-full bg-slate-300 drop-shadow-md shadow-inner backdrop-blur-md flex-1 flex flex-col">
            <CardHeader>
              <CardTitle className="capitalize text-center">
                Thomas Beattie (Ace)
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center items-center gap-2">
              <img src={"/Ace.jpg"} alt="Ace" className="mb-2" />
              <div className="h-8 flex-col justify-center items-center content-center text-center">
                <p>Lead Software Engineer</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-1/4">
          <Card className="h-full bg-slate-300 drop-shadow-md shadow-inner backdrop-blur-md flex-1 flex flex-col">
            <CardHeader>
              <CardTitle className="capitalize text-center">
                Matthew Franco
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center items-center gap-2">
              <img src={"/Matt.jpg"} alt="Matthew" className="mb-2" />
              <div className="h-8 flex-col justify-center items-center content-center text-center">
                <p>Assistant Lead Software Engineer</p>
                <p>Front-End and Feature Engineer</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-1/4">
          <Card className="h-full bg-slate-300 drop-shadow-md shadow-inner backdrop-blur-md flex-1 flex flex-col">
            <CardHeader>
              <CardTitle className="capitalize text-center">
                Santiago Giraldo Godoy
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center items-center gap-2">
              <img src={"/Santiago.jpg"} alt="Santiago" className="mb-2" />
              <div className="h-8 flex-col justify-center items-center content-center text-center">
                <p>Algorithms and Feature Engineer</p>
                <p>Back-End Database Engineer</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-1/4">
          <Card className="h-full bg-slate-300 drop-shadow-md shadow-inner backdrop-blur-md flex-1 flex flex-col">
            <CardHeader>
              <CardTitle className="capitalize text-center">
                Parker Glispin
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center items-center gap-2">
              <img src={"/Parker.jpg"} alt="Parker" className="mb-2" />
              <div className="h-8 flex-col justify-center items-center content-center text-center">
                <p>Product Owner</p>
                <p>Algorithms and Feature Engineer</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-1/4">
          <Card className="h-full bg-slate-300 drop-shadow-md shadow-inner backdrop-blur-md flex-1 flex flex-col">
            <CardHeader>
              <CardTitle className="capitalize text-center">
                Michael Lin
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center items-center gap-2">
              <img src={"/Michael.jpg"} alt="Michael" className="mb-2" />
              <div className="h-8 flex-col justify-center items-center content-center text-center">
                <p>Back-End Database Engineer</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-1/4">
          <Card className="h-full bg-slate-300 drop-shadow-md shadow-inner backdrop-blur-md flex-1 flex flex-col">
            <CardHeader>
              <CardTitle className="capitalize text-center">
                Kevin McCrudden
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center items-center gap-2">
              <img src={"/Kevin.jpg"} alt="Kevin" className="mb-2" />
              <div className="h-8 flex-col justify-center items-center content-center text-center">
                <p>Project Manager</p>
                <p>Scrum Master</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-1/4">
          <Card className="h-full bg-slate-300 drop-shadow-md shadow-inner backdrop-blur-md flex-1 flex flex-col">
            <CardHeader>
              <CardTitle className="capitalize text-center">
                Keenan Porter
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center items-center gap-2">
              <img src={"/Keenan.jpg"} alt="Keenan" className="mb-2" />
              <div className="h-8 flex-col justify-center items-center content-center text-center">
                <p>Front-End and Feature Engineer</p>
                <p>Documentation Analyst</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-1/4">
          <Card className="h-full bg-slate-300 drop-shadow-md shadow-inner backdrop-blur-md flex-1 flex flex-col">
            <CardHeader>
              <CardTitle className="capitalize text-center">
                Daniel Reynolds
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center items-center gap-2">
              <img src={"/Daniel.jpg"} alt="Daniel" className="mb-2" />
              <div className="h-8 flex-col justify-center items-center content-center text-center">
                <p>Front-End and Feature Engineer</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-1/4">
          <Card className="h-full bg-slate-300 drop-shadow-md shadow-inner backdrop-blur-md flex-1 flex flex-col">
            <CardHeader>
              <CardTitle className="capitalize text-center">
                Cole Welcher
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center items-center gap-2">
              <img src={"/Cole.jpg"} alt="Pookie" className="mb-2" />
              <div className="h-8 flex-col justify-center items-center content-center text-center">
                <p>Assistant Lead Software Engineer</p>
                <p>Algorithms and Feature Engineer</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-1/4">
          <Card className="h-full bg-slate-300 drop-shadow-md shadow-inner backdrop-blur-md flex-1 flex flex-col">
            <CardHeader>
              <CardTitle className="capitalize text-center">
                Justin Yip
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center items-center gap-2">
              <img src={"/Justin.jpg"} alt="Justin" className="mb-2" />
              <div className="h-8 flex-col justify-center items-center content-center text-center">
                <p>Front-End and Feature Engineer</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex justify-center gap-10 py-10">
        <div className="flex-col justify-center align-center content-center text-center">
          <p>
            And a thank you to Brigham and Women's Hospital and their
            representative, Andrew Shinn.
          </p>
        </div>
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
