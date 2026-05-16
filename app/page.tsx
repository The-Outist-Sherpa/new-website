import { AmbientMouseEffect } from "@/components/landing/ambient-mouse-effect";
import { AudienceSection } from "@/components/landing/audience-section";
import { FooterSection } from "@/components/landing/footer-section";
import { HeroSection } from "@/components/landing/hero-section";
import { PowerfulFeaturesSection } from "@/components/landing/powerful-features-section";
import { PromptDemoSection } from "@/components/landing/prompt-demo-section";
import { ScrollRevealController } from "@/components/landing/scroll-reveal-controller";
import { SiteHeader } from "@/components/landing/site-header";
import { TrialSection } from "@/components/landing/trial-section";

export default function Home() {
  return (
    <main className="relative isolate min-h-screen bg-sherpa-bg text-sherpa-ink">
      <AmbientMouseEffect />
      <ScrollRevealController />
      <section
        data-scroll-reveal
        className="scroll-reveal relative z-10 min-h-[800px] overflow-hidden bg-sherpa-hero/80"
      >
        <SiteHeader />
        <HeroSection />
      </section>
      <PromptDemoSection />
      <PowerfulFeaturesSection />
      <AudienceSection />
      <TrialSection />
      <FooterSection />
    </main>
  );
}
