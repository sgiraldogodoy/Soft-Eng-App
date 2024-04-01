export default function HeroSection() {
  return (
    <div className="flex-col justify-center align-middle">
      <div className="flex gap-2 justify-center items-center">
        <img src="public/BWH%20Logo.svg" alt="BWH Logo" className="relative" />
        <h1 className="text-left font-inter">
          Welcome to <br />{" "}
          <span className="text-theme-blue font-black">
            Brigham and Women's Hospital
          </span>
        </h1>
      </div>
      <img
        src="../../public/bwh-corridor.jpeg"
        alt="BWH Corridor"
        height="1202"
        width="390"
      />
    </div>
  );
}
