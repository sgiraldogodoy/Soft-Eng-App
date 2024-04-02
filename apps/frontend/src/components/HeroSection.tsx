export default function HeroSection() {
  return (
    <>
      <div className="flex gap-6 justify-center items-center">
        <img src="BWH%20Logo.svg" alt="BWH Logo" className="" />
        <h1 className="text-left font-inter text-3xl font-bold">
          Welcome to <br />{" "}
          <span className="text-theme-blue font-bold">
            Brigham and Women's Hospital
          </span>
        </h1>
      </div>
      <div className="max-h-[390px] max-w-[1202px] overflow-clip">
        <img
          src="bwh-corridor.jpeg"
          alt="BWH Corridor"
          className=" object-cover w-[1220px] h-[390px]"
        />
      </div>
    </>
  );
}
