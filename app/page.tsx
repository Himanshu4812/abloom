import { MainLayout } from "@/src/components/layout/MainLayout";
import { Hero } from "@/src/components/sections/Hero";
import { Overview } from "@/src/components/sections/Overview";
import { Amenities } from "@/src/components/sections/Features";
import { UnitInfrastructure } from "@/src/components/sections/UnitInfrastructure";
import { Gallery } from "@/src/components/sections/Gallery";
import { PlansSection } from "@/src/components/sections/PlansSection";
import { GetInTouch } from "@/src/components/sections/GetInTouch";

export default function AbloomPage() {
  return (
    <MainLayout>
      <Hero />
      <Overview />
      <Amenities />
      <UnitInfrastructure />
      <Gallery />
      <PlansSection />
      <GetInTouch />
    </MainLayout>
  );
}
