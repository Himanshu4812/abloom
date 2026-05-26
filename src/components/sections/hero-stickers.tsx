"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

function useGlobalMouse() {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return { mouseX, mouseY };
}

interface StickerProps {
  className?: string;
  factorX?: number;
  factorY?: number;
  idleY?: number;
  idleDuration?: number;
  children: React.ReactNode;
}

export function ParallaxSticker({
  className = "",
  factorX = 15,
  factorY = 10,
  idleY = 5,
  idleDuration = 3,
  children,
}: StickerProps) {
  const { mouseX, mouseY } = useGlobalMouse();

  const x = useTransform(mouseX, [0, 1], [-factorX, factorX]);
  const y = useTransform(mouseY, [0, 1], [-factorY, factorY]);

  return (
    <motion.div className={className} style={{ x, y }}>
      <motion.div
        animate={{ y: [-idleY, idleY] }}
        transition={{
          duration: idleDuration,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function LeafSprig({ className = "" }: { className?: string }) {
  return (
    <ParallaxSticker className={className} factorX={12} factorY={8} idleY={4} idleDuration={3.5}>
      <svg viewBox="0 0 70 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        <path d="M35 155 L35 25" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M35 130 Q18 120 13 133 Q22 137 35 133" fill="currentColor" />
        <path d="M35 105 Q18 95 13 108 Q22 112 35 108" fill="currentColor" />
        <path d="M35 80 Q18 70 13 83 Q22 87 35 83" fill="currentColor" />
        <path d="M35 55 Q18 45 13 58 Q22 62 35 58" fill="currentColor" />
        <path d="M35 117 Q52 107 57 120 Q48 124 35 120" fill="currentColor" />
        <path d="M35 92 Q52 82 57 95 Q48 99 35 95" fill="currentColor" />
        <path d="M35 67 Q52 57 57 70 Q48 74 35 70" fill="currentColor" />
        <ellipse cx="35" cy="25" rx="3" ry="6" fill="currentColor" transform="rotate(-10, 35, 25)" />
      </svg>
    </ParallaxSticker>
  );
}

export function RoundLeaf({ className = "" }: { className?: string }) {
  return (
    <ParallaxSticker className={className} factorX={10} factorY={12} idleY={6} idleDuration={4}>
      <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        <path d="M50 75 L50 30" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M50 50 C32 22, 18 30, 28 52 C33 62, 44 60, 50 50Z" fill="currentColor" />
        <path d="M50 42 C68 14, 82 22, 72 44 C67 54, 56 52, 50 42Z" fill="currentColor" />
        <path d="M50 30 C58 8, 48 -2, 43 14 C41 20, 44 26, 50 30Z" fill="currentColor" />
      </svg>
    </ParallaxSticker>
  );
}

export function GrassBlade({ className = "" }: { className?: string }) {
  return (
    <ParallaxSticker className={className} factorX={6} factorY={14} idleY={8} idleDuration={2.8}>
      <svg viewBox="0 0 24 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        <path d="M12 145 Q12 80 3 15 Q12 25 12 35 Q16 80 12 145Z" fill="currentColor" />
        <path d="M12 145 Q16 85 21 50 Q15 55 12 145Z" fill="currentColor" opacity="0.5" />
        <path d="M8 120 Q5 90 2 65 Q7 72 8 120Z" fill="currentColor" opacity="0.3" />
      </svg>
    </ParallaxSticker>
  );
}
