import { motion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";

interface LaserProps {
  id: number;
  path: string;
  death: () => void;
  imgWidth: number;
  imgHeight: number;
}

export default function Laser({
  id,
  path,
  death,
  imgWidth,
  imgHeight,
}: LaserProps) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleDeath = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
      death();
    }
  }, [death]);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      handleDeath();
    }, 4000);
  }, [handleDeath]);

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
              stroke: "blue",
              strokeWidth: 2,
              fill: "none",
            }}
            strokeWidth="2"
          />
        </g>

        <mask id={`laserMask-${id}`}>
          <motion.path
            d={path}
            style={{
              stroke: "white",
              strokeWidth: 2,
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
              strokeWidth: 2,
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
