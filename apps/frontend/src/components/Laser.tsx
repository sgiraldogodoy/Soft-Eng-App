import { motion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";

interface LaserProps {
  id: number;
  path: string;
  death: () => void;
  speed: number;
  sameSpeed: boolean;
  delay: number;
  ease: boolean;
  imgWidth: number;
  imgHeight: number;
}

export default function Laser({
  id,
  path,
  death,
  speed,
  sameSpeed,
  delay,
  ease,
  imgWidth,
  imgHeight,
}: LaserProps) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleDeath = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    death();
  }, [death]);

  if (!path.startsWith("M") && path.length <= 1) {
    path = "";
  }

  if (sameSpeed) {
    const svgPathElement: SVGPathElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path",
    );
    svgPathElement.setAttribute("d", path);
    const pathLength = svgPathElement.getTotalLength();
    speed = pathLength / speed;
  }

  useEffect(() => {
    timerRef.current = setTimeout(
      () => {
        handleDeath();
      },
      (speed + delay + 2) * 1000,
    );
  }, [delay, handleDeath, speed]);

  const strokeWidth = 3;

  return (
    <div>
      <svg
        width={imgWidth}
        height={imgHeight}
        style={{ position: "absolute", top: 0, left: 0 }}
        className="pointer-events-none"
      >
        <g mask={`url(#laserMask-${id})`}>
          <path
            d={path}
            style={{
              filter: "drop-shadow(white 1rem 1rem 10px)",
              stroke: "#f6bd38",
              strokeWidth: strokeWidth,
              fill: "none",
              opacity: 0.8,
            }}
          />
        </g>

        <mask id={`laserMask-${id}`}>
          <motion.path
            d={path}
            style={{
              stroke: "white",
              strokeWidth: strokeWidth,
              fill: "none",
            }}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              pathLength: {
                delay: 1,
                type: "tween",
                duration: speed,
                bounce: 0,
                ease: ease ? "easeInOut" : "linear",
              },
            }}
          />
          <motion.path
            d={path}
            style={{
              stroke: "black",
              strokeWidth: strokeWidth + 1,
              fill: "none",
            }}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              pathLength: {
                delay: delay + 1,
                type: "tween",
                duration: speed,
                bounce: 0,
                ease: ease ? "easeInOut" : "linear",
              },
            }}
          />
        </mask>
      </svg>
    </div>
  );
}
