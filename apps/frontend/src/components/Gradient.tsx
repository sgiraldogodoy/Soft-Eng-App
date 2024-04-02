import { createPortal } from "react-dom";

export default function Gradient() {
  return (
    <>
      {createPortal(
        <>
          <div className="absolute w-[293px] h-[489px] left-[-119px] top-[-176px] blur-[50px] bg-gradient-to-r from-[#D8FCFE] to-[#CFF1FF38] -z10 rotate-45" />
          <div className="absolute w-[403px] h-[116px] left-[301px] top-[-175px] blur-[100px] bg-gradient-to-r from-[#81CDD14D] to-[#B8FBE7] -z10 rotate-45" />
        </>,
        document.body,
      )}
    </>
  );
}
