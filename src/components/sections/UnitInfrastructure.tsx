import { Container } from "@/src/components/ui/Container";
import { abloom } from "@/src/data/abloom";

export function UnitInfrastructure() {
  return (
    <section className="py-20 lg:py-32 bg-card">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground">
              {abloom.unitInfrastructure.title}
            </h2>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed text-center">
              {abloom.unitInfrastructure.description}
            </p>

            {/* Brand Blurb */}
            <div className="mt-12 p-8 bg-primary/5 rounded-lg border border-primary/10">
              <p className="text-base text-muted-foreground leading-relaxed text-center italic">
                {abloom.unitInfrastructure.brandBlurb}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
