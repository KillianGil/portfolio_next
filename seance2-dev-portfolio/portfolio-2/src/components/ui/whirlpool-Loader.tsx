"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const WhirlpoolLoader = () => {
  const [circles, setCircles] = useState<any[]>([]);

  useEffect(() => {
    const segments = 50;
    const rotations = 5;
    const generatedCircles = [...Array(segments)].map((_, i) => {
      const angle = (i / segments) * Math.PI * 2 * rotations;
      const radius = 5 + (90 * i) / segments;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      return { x, y, r: 2 + (i / segments) * 3 };
    });

    setCircles(generatedCircles);
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-black">
      <svg width="100%" height="100%" viewBox="-100 -100 200 200">
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {circles.map((circle, i) => (
            <motion.circle
              key={i}
              cx={circle.x}
              cy={circle.y}
              r={circle.r}
              fill="white" 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: (i / circles.length) * 2,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 1,
              }}
            />
          ))}
        </motion.g>
      </svg>
    </div>
  );
};

export default WhirlpoolLoader;