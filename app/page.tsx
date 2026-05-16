import { HeroSection } from "@/components/landing/hero-section";
import { PowerfulFeaturesSection } from "@/components/landing/powerful-features-section";
import { PromptDemoSection } from "@/components/landing/prompt-demo-section";
import { SiteHeader } from "@/components/landing/site-header";

export default function Home() {
  return (
    <main className="min-h-screen bg-sherpa-bg text-sherpa-ink">
      <section className="relative min-h-[800px] overflow-hidden bg-sherpa-hero">
        <SiteHeader />
        <HeroSection />
      </section>
      <PromptDemoSection />
      <PowerfulFeaturesSection />
    </main>
  );
}
