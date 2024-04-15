export default function HeroSection() {
  return (
    <>
      <div className="flex gap-3 justify-center items-center">
        <img src="new_logo.svg" alt="BWH Logo" className="h-[80px] w-[70px]" />
        <h1 className="text-left font-inter text-3xl font-bold">
          Welcome to <br />{" "}
          <span className="text-theme-black font-bold">
            Brigham and Women's Hospital
          </span>
        </h1>
      </div>
      <div className="max-h-[390px] max-w-[1202px] overflow-clip"></div>
    </>
  );
}
