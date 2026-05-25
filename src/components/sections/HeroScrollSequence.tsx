"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TITLE = "ABLOOM";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.27,
      delayChildren: 1.0,
    },
  },
};

const charVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const rightContentVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.0,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: 3.0,
    },
  },
};

const scrollVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 4.5, duration: 1.1 },
  },
};

export function HeroScrollSequence() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (prefersReducedMotion) {
    return (
      <div className="relative h-screen w-full overflow-hidden bg-black">
        <video
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          suppressHydrationWarning
        >
          <source src="/videos/Hero-section.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/40" />
        <div className="relative z-10 w-full h-full max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 w-full h-full items-center">
              <div className="lg:col-span-7 lg:self-end lg:pb-[24vh]">
                <h1 className="font-serif font-light text-white tracking-[-0.03em] whitespace-nowrap" style={{ fontSize: 'clamp(3.5rem, 12vw, 13.5rem)', lineHeight: 0.85 }}>
                  ABLOOM
                </h1>
              </div>
              <div className="text-white lg:col-span-4 lg:col-start-9 lg:justify-self-end lg:self-end lg:pb-[26vh] max-w-[400px]">
              <p className="text-[22px] font-medium tracking-[0.25em] text-white/90 uppercase mb-4 sm:mb-6">
                AWESOMELY BLOSSOM WITH NATURE
              </p>
              <p className="text-[1.15rem] font-light text-white/90 leading-[1.9] max-w-[420px]">
                Discover a place where lush landscapes, quiet luxury, and timeless living come together in perfect harmony.
              </p>
            </div>
          </div>
        </div>
        <span className="absolute bottom-8 right-8 lg:right-12 z-10 text-[10px] font-medium tracking-[0.2em] text-white/60">
          SCROLL
        </span>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
        <video
          autoPlay
          muted
          playsInline
          loop={false}
          className="absolute inset-0 w-full h-full object-cover"
          suppressHydrationWarning
        >
          <source src="/videos/Hero-section.webm" type="video/webm" />
        </video>

      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />

      <div className="relative z-10 w-full h-full max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center h-full">
          <motion.h1
            className="font-serif font-light text-white tracking-[-0.03em] lg:col-span-7 lg:self-end lg:pb-[24vh] whitespace-nowrap"
            style={{ fontSize: 'clamp(3.5rem, 12vw, 13.5rem)', lineHeight: 0.85 }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {TITLE.split("").map((char, i) => (
              <motion.span
                key={i}
                className="inline-block overflow-hidden align-middle"
                variants={charVariants}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div
            className="text-white lg:col-span-4 lg:col-start-9 lg:justify-self-end lg:self-end lg:pb-[26vh] max-w-[400px]"
            variants={rightContentVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-[22px] font-medium tracking-[0.25em] text-white/90 uppercase mb-4 sm:mb-6">
              AWESOMELY BLOSSOM WITH NATURE
            </p>
            <p className="text-[1.15rem] font-light text-white/90 leading-[1.9] max-w-[420px]">
              Discover a place where lush landscapes, quiet luxury, and timeless living come together in perfect harmony.
            </p>
          </motion.div>
        </div>
      </div>

      <motion.span
        className="absolute bottom-8 right-8 lg:right-12 z-10 text-[10px] font-medium tracking-[0.2em] text-white/60"
        variants={scrollVariants}
        initial="hidden"
        animate="visible"
      >
        SCROLL
      </motion.span>
    </div>
  );
}
