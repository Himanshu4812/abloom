"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";

const TOTAL_FRAMES = 90;

const getFramePath = (index: number) => {
  const frameNum = index + 2;
  const padded = String(frameNum).padStart(3, "0");
  return `/abloom-hero-section/frame_${padded}.webp`;
};

export function HeroScrollSequence() {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);

  const [loadedPercent, setLoadedPercent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Scroll tracking locked to the 300vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Responsive spring — filters micro-jitter without introducing perceptible lag
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 35,
    stiffness: 200,
    mass: 0.1,
    restDelta: 0.001,
  });

  // Direct 0→1 to 0→89 mapping; frame 091 reached exactly when sticky releases
  const frameIndex = useTransform(smoothProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  // Typography Timeline
  const text1Opacity = useTransform(smoothProgress, [0.25, 0.35, 0.55, 0.60], [0, 1, 1, 0]);
  const text1Y = useTransform(smoothProgress, [0.25, 0.35, 0.55, 0.60], [30, 0, 0, -15]);

  const text2Opacity = useTransform(smoothProgress, [0.60, 0.70, 0.85, 0.92], [0, 1, 1, 0]);
  const text2Y = useTransform(smoothProgress, [0.60, 0.70, 0.85, 0.92], [30, 0, 0, -15]);

  const ctaOpacity = useTransform(smoothProgress, [0.85, 0.92, 0.95, 1.0], [0, 1, 1, 0]);
  const ctaY = useTransform(smoothProgress, [0.85, 0.92, 0.95, 1.0], [20, 0, 0, -10]);

  // Detect Reduced Motion Preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  // Preload all frames into an array of HTMLImageElement
  useEffect(() => {
    if (isMobile === undefined) return;

    const step = isMobile ? 2 : 1;
    const indicesToLoad: number[] = [];
    for (let i = 0; i < TOTAL_FRAMES; i += step) {
      indicesToLoad.push(i);
    }
    if (!indicesToLoad.includes(TOTAL_FRAMES - 1)) {
      indicesToLoad.push(TOTAL_FRAMES - 1);
    }

    const frames: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let loaded = 0;

    indicesToLoad.forEach((idx) => {
      const img = new Image();
      img.src = getFramePath(idx);
      img.onload = () => {
        loaded++;
        setLoadedPercent(Math.round((loaded / indicesToLoad.length) * 100));
        frames[idx] = img;
        if (loaded === indicesToLoad.length) {
          if (isMobile) {
            for (let f = 0; f < TOTAL_FRAMES; f++) {
              if (!frames[f]) {
                const nearest = indicesToLoad.reduce((prev, curr) =>
                  Math.abs(curr - f) < Math.abs(prev - f) ? curr : prev
                );
                frames[f] = frames[nearest];
              }
            }
          }
          framesRef.current = frames;
          setIsLoaded(true);
        }
      };
    });
  }, [isMobile]);

  // Object-fit: cover draw
  const drawCoverImage = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    cssWidth: number,
    cssHeight: number
  ) => {
    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;
    const canvasRatio = cssWidth / cssHeight;
    const imgRatio = imgW / imgH;

    let dw = cssWidth, dh = cssHeight, ox = 0, oy = 0;

    if (canvasRatio > imgRatio) {
      dh = cssWidth / imgRatio;
      oy = (cssHeight - dh) / 2;
    } else {
      dw = cssHeight * imgRatio;
      ox = (cssWidth - dw) / 2;
    }

    ctx.drawImage(img, ox, oy, dw, dh);
  };

  // Canvas render loop — pure RAF, zero React state during scroll
  useEffect(() => {
    if (!isLoaded || prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let rAFId: number;
    let lastFrameIndex = -1;

    const render = () => {
      const raw = frameIndex.get();
      const index = Math.min(Math.round(raw), TOTAL_FRAMES - 1);

      if (index !== lastFrameIndex) {
        const img = framesRef.current[index];
        if (img && img.complete) {
          const dpr = window.devicePixelRatio || 1;
          const cssW = window.innerWidth;
          const cssH = window.innerHeight;
          ctx.clearRect(0, 0, cssW, cssH);
          drawCoverImage(ctx, img, cssW, cssH);
          lastFrameIndex = index;
        }
      }

      rAFId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);

      const idx = Math.min(Math.round(frameIndex.get()), TOTAL_FRAMES - 1);
      const img = framesRef.current[idx];
      if (img && img.complete) {
        const cssW = window.innerWidth;
        const cssH = window.innerHeight;
        ctx.clearRect(0, 0, cssW, cssH);
        drawCoverImage(ctx, img, cssW, cssH);
      }
      lastFrameIndex = idx;
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    rAFId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rAFId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isLoaded, prefersReducedMotion]);

  // Reduced Motion fallback
  if (prefersReducedMotion) {
    return (
      <div className="relative h-screen w-full flex items-center justify-center bg-stone-900">
        <div className="absolute inset-0 opacity-60 bg-[url('/abloom-hero-section/frame_091.webp')] bg-cover bg-center" />
        <div className="relative z-10 text-center px-6 text-white max-w-4xl">
          <span className="text-xs font-semibold tracking-[0.4em] text-[#A5D6A7] mb-4 block uppercase">
            Nature-Led Sanctuary
          </span>
          <h1 className="font-serif text-5xl md:text-8xl tracking-wide mb-8">
            Abloom
          </h1>
          <p className="font-light text-lg md:text-2xl mb-12 text-stone-200">
            Natures Finest Address &mdash; A refined retreat where spiritual tranquility meets green luxury.
          </p>
          <Link
            href="#contact"
            className="inline-block rounded-full px-10 py-5 bg-[#4CAF50] text-white tracking-widest text-xs uppercase hover:bg-[#1B5E20] transition-colors"
          >
            Book a Site Visit
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full bg-black" style={{ height: "300vh" }}>
      {/* Luxury Preloading Screen */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{ pointerEvents: isLoaded ? "none" : "auto" }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FDFBF7]"
      >
        <div className="flex flex-col items-center max-w-xs text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-[#1B5E20] font-light tracking-widest leading-none mb-4 animate-pulse">
            Abloom
          </h2>
          <div className="h-[2px] w-48 bg-[#A5D6A7]/30 rounded-full overflow-hidden mb-4 relative">
            <motion.div
              className="absolute left-0 top-0 bottom-0 bg-[#4CAF50]"
              style={{ width: `${loadedPercent}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
          <span className="text-[10px] font-medium tracking-[0.3em] text-[#1B5E20]/70 uppercase">
            PRELOADING SANCTUARY {loadedPercent}%
          </span>
        </div>
      </motion.div>

      {/* Sticky Canvas Frame — locks viewport for full 300vh scroll track */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-0 bg-black">
        <canvas ref={canvasRef} className="w-full h-full object-cover" />

        {/* Cinematic Atmospheric Lighting */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-[#1B5E20]/15 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(27,94,32,0.1)_100%)] pointer-events-none" />

        {/* Screen 1: 25%–60% */}
        <motion.div
          style={{ opacity: text1Opacity, y: text1Y }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none z-10"
        >
          <p className="text-xs sm:text-sm font-medium tracking-[0.4em] text-white/90 uppercase mb-4 drop-shadow-md">
            Nature-Led Sanctuary
          </p>
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-white tracking-widest leading-tight drop-shadow-lg uppercase">
            AWESOMELY BLOSSOM
            <br />
            <span className="italic font-normal text-[#C8E6C9]">WITH NATURE</span>
          </h2>
        </motion.div>

        {/* Screen 2: 60%–92% */}
        <motion.div
          style={{ opacity: text2Opacity, y: text2Y }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none z-10"
        >
          <h2 className="font-serif text-6xl sm:text-8xl lg:text-9xl font-medium text-white tracking-tight mb-4 drop-shadow-lg">
            Abloom
          </h2>
          <p className="font-light text-sm sm:text-lg lg:text-xl text-white/95 tracking-[0.3em] uppercase drop-shadow-md">
            Natures Finest Address
          </p>
        </motion.div>

        {/* Screen 3: 85%–100% — CTA */}
        <motion.div
          style={{ opacity: ctaOpacity, y: ctaY }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10"
        >
          <p className="text-xs sm:text-sm font-medium tracking-[0.3em] text-white/90 uppercase mb-6 drop-shadow-md">
            Your Journey Begins Here
          </p>
          <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light text-white tracking-tight mb-10 drop-shadow-lg">
            Welcome to Abloom
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="#contact"
              className="group relative overflow-hidden rounded-full px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium tracking-widest text-[10px] uppercase transition-all duration-300 hover:border-[#C8E6C9]/50 hover:bg-white hover:text-[#1B5E20] hover:shadow-lg hover:shadow-[#C8E6C9]/20"
            >
              <span className="relative z-10">Book a Site Visit</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#C8E6C9]/20 to-[#A5D6A7]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <Link
              href="#overview"
              className="text-[10px] font-medium tracking-[0.2em] text-white/90 hover:text-white transition-colors flex items-center gap-2"
            >
              EXPLORE OVERVIEW
              <span className="text-white/60 transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>
        </motion.div>

        {/* Scroll Prompt — fades during first 15% */}
        <motion.div
          style={{ opacity: useTransform(smoothProgress, [0, 0.15], [0.8, 0]) }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[10px] font-medium tracking-[0.2em] text-white/60">
            SCROLL TO COMMENCE
          </span>
          <div className="w-5 h-8 border border-white/30 rounded-full flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-1 h-2 bg-white/80 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
