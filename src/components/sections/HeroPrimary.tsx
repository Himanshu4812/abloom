"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LeafSprig, RoundLeaf, GrassBlade } from "./hero-stickers";

const TITLE = "ABLOOM";

const containerVariants = {
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
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay: 2.2 },
  },
};

const scrollHintVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 4, duration: 1 },
  },
};

export function HeroPrimary() {
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
      <section className="sticky top-0 z-0 w-full bg-background overflow-hidden">
        <div className="relative min-h-dvh max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col items-center justify-center text-center">
          <span className="text-[11px] tracking-[0.22em] uppercase text-muted-foreground">
            Nature-centric villas
          </span>
          <h1
            className="mt-4 font-display font-normal text-foreground whitespace-nowrap tracking-[-0.03em]"
            style={{ fontSize: "clamp(3.5rem, 12vw, 13.5rem)", lineHeight: 1 }}
          >
            ABLOOM
          </h1>
          <p className="mt-5 text-[15px] font-medium tracking-[0.25em] uppercase text-primary">
            Awesomely blossom with nature
          </p>
          <p className="mt-5 text-base leading-relaxed text-foreground/70 max-w-lg mx-auto">
            Discover an exclusive nature-centric villa community near Nashik
            where lush landscapes, quiet luxury, and timeless living come
            together in perfect harmony.
          </p>
          <span className="mt-12 text-[10px] tracking-[0.2em] text-muted-foreground/60">
            SCROLL
          </span>
        </div>
      </section>
    );
  }

  return (
    <section className="sticky top-0 z-0 w-full bg-background overflow-hidden">
      <div className="relative min-h-dvh max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col items-center justify-center text-center">
        <div className="hidden md:block">
          <LeafSprig className="absolute top-[18vh] left-[4vw] w-[clamp(50px,5vw,80px)] text-emerald-800/15" />
          <RoundLeaf className="absolute top-[22vh] right-[6vw] w-[clamp(60px,4.5vw,85px)] text-emerald-700/10" />
          <GrassBlade className="absolute bottom-[18vh] right-[14vw] w-[clamp(22px,2vw,35px)] text-emerald-800/12" />
        </div>

        <div className="flex flex-col items-center">
          <motion.span
            className="text-[11px] tracking-[0.22em] uppercase text-muted-foreground"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          >
            Nature-centric villas
          </motion.span>

          <motion.h1
            className="mt-4 font-display font-normal text-foreground whitespace-nowrap tracking-[-0.03em] overflow-hidden"
            style={{ fontSize: "clamp(3.5rem, 12vw, 13.5rem)", lineHeight: 1 }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {TITLE.split("").map((char, i) => (
              <motion.span
                key={i}
                className="inline-block overflow-hidden align-middle leading-none"
                variants={charVariants}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="mt-5 text-[15px] font-medium tracking-[0.25em] uppercase text-primary"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            Awesomely blossom with nature
          </motion.p>

          <motion.p
            className="mt-5 text-base leading-relaxed text-foreground/70 max-w-lg"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            Discover an exclusive nature-centric villa community near Nashik
            where lush landscapes, quiet luxury, and timeless living come
            together in perfect harmony.
          </motion.p>

          <motion.div
            className="mt-12 flex items-center justify-center gap-3 text-[10px] tracking-[0.2em] text-muted-foreground/60"
            variants={scrollHintVariants}
            initial="hidden"
            animate="visible"
          >
            <span>SCROLL</span>
            <span className="h-px w-10 bg-muted-foreground/20" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
