"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Abloom - Green luxury living near Nashik"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 lg:px-12">
        {/* Main Title Container */}
        <div className="text-center">
          {/* Eyebrow */}
          <p className="text-xs sm:text-sm font-medium tracking-[0.3em] text-white/80 mb-6 lg:mb-8">
            NATURE-LED LIVING
          </p>

          {/* Main Title - Large Typography */}
          <h1 className="font-serif text-7xl sm:text-8xl lg:text-[10rem] xl:text-[12rem] font-medium text-white tracking-tight leading-none mb-8 lg:mb-10">
            Abloom
          </h1>

          {/* Subheading */}
          <p className="max-w-xl mx-auto text-base sm:text-lg lg:text-xl text-white/90 font-light leading-relaxed mb-10 lg:mb-12">
            A refined retreat where greenery, tranquility and spiritual calm
            define everyday life, just 10 km from Nashik city.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Button
              asChild
              size="lg"
              className="bg-white text-foreground hover:bg-white/90 px-8 py-6 text-sm font-medium tracking-wide"
            >
              <Link href="#contact">Schedule a Visit</Link>
            </Button>
            <Link
              href="#overview"
              className="text-sm font-medium tracking-wide text-white/80 hover:text-white transition-colors flex items-center gap-2"
            >
              Explore Overview
              <span className="text-white/60">&#8594;</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-xs font-medium tracking-[0.2em] text-white/60">
          SCROLL
        </span>
        <ChevronDown className="w-5 h-5 text-white/60 animate-bounce" />
      </div>
    </section>
  );
}
