"use client";

import { Lightbulb, Link2, Mic, Sparkles } from "lucide-react";
import type { ComponentType } from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type FeatureSlide = {
  accent: string;
  cardPosition: string;
  copy: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number; "aria-hidden"?: boolean }>;
  title: string;
};

const FEATURES: FeatureSlide[] = [
  {
    title: "Brain Storm Ideas",
    copy: "Create ready-to-share trip ideas from a simple brief, then shape them into a strong proposal without starting from a blank page.",
    icon: Lightbulb,
    accent: "text-[#ff5f5f]",
    cardPosition: "lg:right-[-112px] lg:top-[30%]",
  },
  {
    title: "Voice Chat",
    copy: "Speak the itinerary details naturally and Sherpa turns the conversation into structured proposal content in seconds.",
    icon: Mic,
    accent: "text-[#18b9e5]",
    cardPosition: "lg:left-[-112px] lg:top-[33%]",
  },
  {
    title: "AI Image Generation",
    copy: "Generate destination-led visuals for proposals, so every plan feels polished before the final share link or PDF is sent.",
    icon: Sparkles,
    accent: "text-[#c6e943]",
    cardPosition: "lg:right-[-109px] lg:top-[17%]",
  },
  {
    title: "Custom Links",
    copy: "Share branded links that work beautifully on desktop and mobile, with every proposal ready for customer review.",
    icon: Link2,
    accent: "text-[#337dff]",
    cardPosition: "lg:left-[-117px] lg:top-[43%]",
  },
];

export function PowerfulFeaturesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    let frameId = 0;

    const updateActiveSlide = () => {
      frameId = 0;

      const rect = section.getBoundingClientRect();
      const scrollableDistance = Math.max(section.offsetHeight - window.innerHeight, 1);
      const rawProgress = -rect.top / scrollableDistance;
      const progress = Math.min(Math.max(rawProgress, 0), 0.999);
      const nextSlide = Math.min(FEATURES.length - 1, Math.floor(progress * FEATURES.length));

      setActiveSlide((currentSlide) => (currentSlide === nextSlide ? currentSlide : nextSlide));
    };

    const onScroll = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(updateActiveSlide);
    };

    updateActiveSlide();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative h-[460vh] bg-white px-5 py-16 sm:py-20"
    >
      <div className="sticky top-0 flex min-h-screen w-full flex-col items-center justify-start overflow-hidden pt-16 sm:pt-20 lg:pt-[72px]">
        <h2 className="w-full max-w-[1270px] text-center text-[34px] font-medium leading-[1.2] text-sherpa-ink sm:text-[46px] sm:leading-[1.5]">
          Powerful Features
        </h2>

        <div className="relative mt-10 h-[600px] w-full max-w-[1180px] sm:mt-12 sm:h-[670px] lg:mt-8 lg:h-[710px]">
          {FEATURES.map((slide, index) => (
            <FeatureSlideView
              key={slide.title}
              active={activeSlide === index}
              slide={slide}
              slideNumber={index + 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureSlideView({
  active,
  slide,
  slideNumber,
}: {
  active: boolean;
  slide: FeatureSlide;
  slideNumber: number;
}) {
  const Icon = slide.icon;

  return (
    <article
      aria-hidden={!active}
      className={cn(
        "absolute inset-0 flex items-start justify-center transition-opacity duration-500 ease-sherpa",
        active ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <div className="relative w-full max-w-[924px]">
        <div
          className={cn(
            "flex h-[390px] w-full items-center justify-center rounded-[20px] border border-[#cfd5de] bg-[#f0f3f7] px-4 py-3 transition-all duration-700 ease-sherpa sm:h-[520px] lg:h-[638px]",
            active ? "translate-y-0 scale-100 opacity-100 blur-0" : "translate-y-8 scale-[0.985] opacity-0 blur-sm",
          )}
        >
          <div className="flex h-full w-full items-center justify-center rounded-[16px] border border-dashed border-[#c8d0db] bg-white/35">
            <p className="text-center text-base font-medium leading-[1.25] text-black">
              Image or Videos
            </p>
          </div>
        </div>

        <div
          className={cn(
            "absolute left-1/2 top-[56%] w-[min(452px,calc(100vw-40px))] -translate-x-1/2 rounded-[30px] bg-white p-7 text-left shadow-[0_6px_6px_rgba(0,0,0,0.1)] transition-all duration-700 ease-sherpa sm:p-8 lg:left-auto lg:translate-x-0",
            slide.cardPosition,
            active
              ? "translate-y-0 opacity-100 blur-0 delay-200"
              : "translate-y-8 opacity-0 blur-sm delay-0",
          )}
        >
          <div className="flex w-full flex-col items-start gap-3">
            <Icon aria-hidden className={cn("size-10", slide.accent)} strokeWidth={2} />
            <div className="flex w-full flex-col items-start gap-[14px]">
              <h3 className="max-w-full text-[24px] font-medium leading-[1.25] text-sherpa-ink">
                {slide.title}
              </h3>
              <p className="text-base font-normal leading-[1.65] text-sherpa-ink">
                {slide.copy}
              </p>
            </div>
          </div>
          <span className="sr-only">Slide {slideNumber}</span>
        </div>
      </div>
    </article>
  );
}
