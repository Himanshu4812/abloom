"use client";

import { motion } from "framer-motion";

const contentVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: 0.4 + i * 0.15,
    },
  }),
};

const items = [
  {
    title: "Thoughtfully planned",
    text: "Each plot is designed to maximise green space while ensuring privacy and comfort for your family.",
  },
  {
    title: "Abundant green spaces",
    text: "Over 60% of the community is dedicated to parks, gardens, and natural landscapes.",
  },
  {
    title: "Timeless architecture",
    text: "Homes designed with natural materials and passive cooling principles for modern, sustainable living.",
  },
  {
    title: "Nature-first living",
    text: "Walking trails, community gardens, and native tree species woven into everyday life.",
  },
];

export function HeroReveal() {
  return (
    <section className="relative z-10 w-full bg-background">
      <div className="relative w-full">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-20% 0px 0px 0px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/images/hero-bg.png"
            alt="Abloom nature-centric villa community near Nashik"
            className="w-full min-h-dvh object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
        </motion.div>

        <motion.div
          className="absolute bottom-6 left-6 md:bottom-10 md:left-10"
          initial={{ opacity: 0, y: -200 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px 0px 0px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <div className="inline-block bg-background/90 backdrop-blur-sm px-5 py-3 md:px-8 md:py-4 rounded-lg shadow-sm">
            <span className="block text-[11px] tracking-[0.22em] uppercase text-muted-foreground">
              Welcome to
            </span>
            <h2 className="font-display text-2xl md:text-4xl font-light text-foreground -mt-0.5">
              Abloom
            </h2>
          </div>
        </motion.div>
      </div>

      

    </section>
  );
}
