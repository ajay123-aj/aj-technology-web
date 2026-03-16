"use client";

import { motion } from "framer-motion";

const orbs = [
  { size: 280, x: "5%", y: "15%", color: "rgba(123, 97, 255, 0.2)" },
  { size: 200, x: "88%", y: "25%", color: "rgba(0, 229, 255, 0.15)" },
  { size: 180, x: "80%", y: "65%", color: "rgba(59, 130, 246, 0.15)" },
  { size: 220, x: "0%", y: "55%", color: "rgba(123, 97, 255, 0.12)" },
];

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[80px]"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: orb.color,
          }}
          animate={{
            x: [0, 20, -15, 0],
            y: [0, -15, 20, 0],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 12 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
