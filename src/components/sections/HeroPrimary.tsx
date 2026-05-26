"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay: 3.3 },
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

  const marqueeImages = [
    "/images/gallery-1.webp",
    "/images/gallery-2.webp",
    "/images/gallery-3.webp",
    "/images/gallery-4.webp",
    "/images/hero-bg.webp",
    "/images/Homepage.jpg",
    "/images/gallery-1.webp",
    "/images/gallery-2.webp",
    "/images/gallery-3.webp",
    "/images/gallery-4.webp",
    "/images/hero-bg.webp",
    "/images/Homepage.jpg",
  ];

  if (prefersReducedMotion) {
    return (
      <section className="sticky top-0 z-0 w-full bg-mint overflow-hidden">
        <div className="relative min-h-dvh max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col items-center justify-center text-center pb-16 md:pb-24">
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
          <p className="mt-4 text-base leading-relaxed text-foreground/70 max-w-lg mx-auto">
            Discover an exclusive nature-centric villa community near Nashik
            where lush landscapes, quiet luxury, and timeless living come
            together in perfect harmony.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="sticky top-0 z-0 w-full bg-mint overflow-hidden">
      <div className="relative min-h-dvh max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col items-center justify-center text-center">
        
        <div className="flex flex-col items-center pb-16 md:pb-24">
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
            className="mt-4 text-[15px] font-medium tracking-[0.25em] uppercase text-primary"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            Awesomely blossom with nature
          </motion.p>

          <motion.p
            className="mt-4 text-base leading-relaxed text-foreground/70 max-w-lg"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            Discover an exclusive nature-centric villa community near Nashik, where lush landscapes and quiet luxury create timeless living.
          </motion.p>


        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3.5 }}
        className="absolute bottom-0 left-0 w-full h-48 md:h-64 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] pointer-events-none"
      >
        <style>{`
@keyframes marquee-scroll {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}
`}</style>
        <motion.div
          className="flex gap-4"
          style={{ animation: "marquee-scroll 30s linear infinite" }}
        >
          {marqueeImages.map((src, index) => (
            <div
              key={index}
              className="relative aspect-[3/4] h-36 md:h-56 flex-shrink-0"
              style={{ rotate: `${index % 2 === 0 ? -2 : 5}deg` }}
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover rounded-2xl shadow-md"
              />
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
