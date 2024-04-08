import { createPortal } from "react-dom";

export default function ServiceGradient() {
  return (
    <>
      {createPortal(
        <>
          <img
            src="/servicegradient.svg"
            className="absolute w-screen top-0 z-[-1]"
          ></img>
        </>,
        document.body,
      )}
    </>
  );
}
