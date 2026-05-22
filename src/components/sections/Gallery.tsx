"use client";

import Image from "next/image";
import { Container } from "@/src/components/ui/Container";
import { abloom } from "@/src/data/abloom";

export function Gallery() {
  return (
    <section id="gallery" className="py-20 lg:py-32 bg-background">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16">
            <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase mb-2">
              {abloom.gallery.subtitle}
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground">
              {abloom.gallery.title}
            </h2>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {abloom.gallery.images.map((image) => (
              <a
                key={image.id}
                href={image.src}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-muted cursor-pointer"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="px-4 py-2 bg-card/90 backdrop-blur-sm rounded-md text-sm font-medium text-foreground">
                    Click to view
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
