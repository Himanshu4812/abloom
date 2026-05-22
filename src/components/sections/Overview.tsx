import { Container } from "@/src/components/ui/Container";
import { abloom } from "@/src/data/abloom";

export function Overview() {
  return (
    <section id="overview" className="py-20 lg:py-32 bg-card">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground mb-4">
              {abloom.overview.title}
            </h2>
            <p className="text-lg lg:text-xl text-primary font-medium">
              {abloom.overview.subtitle}
            </p>
          </div>

          {/* Overview Content */}
          <div className="space-y-6">
            {abloom.overview.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-base lg:text-lg text-muted-foreground leading-relaxed text-center"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
