"use client";

import Image from "next/image";
import { Container } from "@/src/components/ui/Container";

export function PlansSection() {
  return (
    <section id="plans" className="py-20 lg:py-32 bg-background">
      <Container>
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground mb-3">
              Plans
            </h2>
            <p className="text-base font-medium tracking-widest text-muted-foreground uppercase">
              Master Plan
            </p>
          </div>

          {/* Master Plan Image */}
          <a
            href="/images/master-plan.webp"
            target="_blank"
            rel="noopener noreferrer"
            className="group block relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-muted cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <Image
              src="/images/master-plan.webp"
              alt="Abloom Master Plan"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 768px"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="px-4 py-2 bg-card/90 backdrop-blur-sm rounded-md text-sm font-medium text-foreground shadow-sm">
                Click to enlarge
              </span>
            </div>
          </a>

          {/* Helper Text */}
          <p className="text-center mt-4 text-sm text-muted-foreground">
            * Click for larger view
          </p>
        </div>
      </Container>
    </section>
  );
}
