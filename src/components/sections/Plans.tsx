"use client";

import Image from "next/image";
import { Container } from "@/src/components/ui/Container";
import { abloom } from "@/src/data/abloom";

export function Plans() {
  return (
    <section id="plans" className="py-20 lg:py-32 bg-card">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16">
            <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase mb-2">
              {abloom.plans.subtitle}
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground">
              {abloom.plans.title}
            </h2>
          </div>

          {/* Plan Image */}
          <a
            href={abloom.plans.mainPlanImage}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border-2 border-border bg-muted cursor-pointer">
              <Image
                src={abloom.plans.mainPlanImage}
                alt="Abloom Master Plan"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-102"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
            </div>
          </a>

          {/* Note */}
          <p className="text-sm text-muted-foreground text-center mt-4">
            {abloom.plans.note}
          </p>
        </div>
      </Container>
    </section>
  );
}
