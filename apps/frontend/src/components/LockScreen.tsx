import { trpc } from "@/utils/trpc";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { LockKeyholeIcon } from "lucide-react";

export function LockScreen() {
  const [rfidString, setRfidString] = useState("");
  const utils = trpc.useUtils();
  const verify = trpc.rfid.verify.useMutation({
    onSuccess: () => {
      utils.user.me.invalidate();
    },
  });

  useEffect(() => {
    const onKeyDown = async (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        console.log(rfidString);
        setRfidString("");
        const data = await verify.mutateAsync({
          code: rfidString,
        });

        console.log(data);
      } else {
        setRfidString(rfidString + e.key);
      }
      console.log(e);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [rfidString, verify]);

  return createPortal(
    <div className="animate-in zoom-in-90 fade-in duration-500 fixed top-0 left-0 min-h-screen min-w-full z-50 bg-white/50 backdrop-blur-md">
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl flex flex-col items-center gap-10">
        <div className="flex gap-2">
          <svg
            width="21"
            height="30"
            viewBox="0 0 29 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="z-10"
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
          <span className="text-3xl">Brigham and Women's Hospital</span>
        </div>
        <div className="text-sm flex gap-2">
          <LockKeyholeIcon className="w-4 h-4" />
          <span>Screen is locked. Scan your badge to continue.</span>
        </div>
      </span>
    </div>,
    document.body,
  );
}
