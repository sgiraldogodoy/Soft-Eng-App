import { motion } from "framer-motion";
import { useEffect } from "react";

interface LaserProps {
  path: string;
  death: () => void;
  imgWidth: number;
  imgHeight: number;
}

export default function Laser({
  path,
  death,
  imgWidth,
  imgHeight,
}: LaserProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      death();
    }, 3000);

    return () => clearTimeout(timer);
  }, [death]);

  return (
    <div>
      <svg
        width={imgWidth}
        height={imgHeight}
        style={{ position: "absolute", top: 0, left: 0 }}
        className="pointer-events-none"
      >
        <g mask={"url(#laserMask)"}>
          <path
            d={path}
            style={{
              stroke: "blue",
              fill: "none",
            }}
            strokeWidth="2"
          />
        </g>

        <mask id={"laserMask"}>
          <motion.path
            d={path}
            style={{
              stroke: "white",
              fill: "none",
            }}
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              pathLength: {
                delay: 1,
                type: "tween",
                duration: 3,
                bounce: 0,
              },
            }}
          />
          <motion.path
            d={path}
            style={{
              stroke: "black",
              fill: "none",
            }}
            strokeWidth="2.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              pathLength: {
                delay: 1.2,
                type: "tween",
                duration: 3,
                bounce: 0,
              },
            }}
          />
        </mask>
      </svg>
    </div>
  );
}
