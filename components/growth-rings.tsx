"use client";

import { motion } from "framer-motion";

interface GrowthRingsProps {
  count?: number;
  animated?: boolean;
  idle?: boolean;
  size?: "sm" | "md" | "lg" | number;
  className?: string;
}

// Concentric tree rings — unevenly spaced, pine / gold / clay at varying opacity.
// Represents accumulated consistency over time.
export function GrowthRings({
  count = 7,
  animated = false,
  idle = false,
  size = "md",
  className = "",
}: GrowthRingsProps) {
  const sizeMap = { sm: 72, md: 140, lg: 520 };
  const baseSize = typeof size === "number" ? size : sizeMap[size];
  const center = baseSize / 2;
  const maxRadius = baseSize / 2 - baseSize * 0.03;

  const colors = ["#1F3D2E", "#3F6B4F", "#C08A3E", "#B4633E"];

  // Uneven spacing: rings cluster slightly tighter toward the outside,
  // like real tree rings adding a new layer each season.
  const radii = Array.from({ length: count }).map((_, i) => {
    const t = (i + 1) / count;
    const eased = Math.pow(t, 0.82);
    return Math.round(eased * maxRadius * 1000) / 1000; // fix precision to 3 decimals
  });

  const stroke = Math.max(1.2, baseSize * 0.012);

  return (
    <motion.svg
      width={baseSize}
      height={baseSize}
      viewBox={`0 0 ${baseSize} ${baseSize}`}
      className={`flex-shrink-0 ${className}`}
      initial={animated ? { scale: 0.85, opacity: 0 } : false}
      animate={
        idle
          ? { scale: [1, 1.015, 1], rotate: [0, 2, 0] }
          : animated
            ? { scale: 1, opacity: 1 }
            : {}
      }
      transition={
        idle
          ? { duration: 34, repeat: Infinity, ease: "easeInOut" }
          : { duration: 0.6, ease: "easeOut" }
      }
      aria-hidden="true"
    >
      {radii.map((radius, i) => {
        const opacity = 0.72 - i * (0.5 / count);
        const color = colors[i % colors.length];
        const isNewest = i === count - 1;

        return (
          <motion.circle
            key={i}
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={isNewest ? stroke * 1.6 : stroke}
            opacity={Math.round(Math.max(opacity, 0.12) * 1000) / 1000}
            initial={animated ? { r: 0, opacity: 0 } : false}
            animate={
              animated ? { r: radius, opacity: Math.max(opacity, 0.12) } : {}
            }
            transition={{
              duration: 0.55,
              delay: i * 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        );
      })}
      {/* Center seed */}
      <circle
        cx={center}
        cy={center}
        r={stroke * 1.1}
        fill="#1F3D2E"
        opacity={0.6}
      />
    </motion.svg>
  );
}
