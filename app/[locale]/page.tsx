import { unstable_setRequestLocale } from "next-intl/server";
import { type Locale } from "@/i18n";
import { HeroSection } from "@/components/sections/hero";
import { FeaturesSection } from "@/components/sections/features";
import { PricingSection } from "@/components/sections/pricing";
import { MissionSection } from "@/components/sections/mission";
import { TeamSection } from "@/components/sections/team";
import { Footer } from "@/components/sections/footer";

interface PageProps {
  params: { locale: Locale };
}

export default function HomePage({ params: { locale } }: PageProps) {
  unstable_setRequestLocale(locale);

  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <MissionSection />
      <TeamSection />
      <Footer />
    </main>
  );
}



