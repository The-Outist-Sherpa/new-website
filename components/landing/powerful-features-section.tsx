"use client";

import { Brain, Clock3, Globe2, Image, Laptop, MessageSquare, Palette } from "lucide-react";
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
    title: "10-Minute Setup",
    copy: "Upload your existing proposals in any format. The Outist extracts the content so you can start creating proposals quickly.",
    icon: Clock3,
    accent: "text-[#ff5f5f]",
    cardPosition: "lg:right-[-112px] lg:top-[30%]",
  },
  {
    title: "Brainstorm Ideas",
    copy: "Ask The Outist to shape trip ideas, calculate per-person cost, refine packages, or improve proposal content before you share it.",
    icon: Brain,
    accent: "text-[#18b9e5]",
    cardPosition: "lg:left-[-112px] lg:top-[33%]",
  },
  {
    title: "Effortless Pictures",
    copy: "Find stunning trip visuals in seconds. The Outist suggests multiple image options, so you can choose the best one for every destination or day.",
    icon: Image,
    accent: "text-[#c6e943]",
    cardPosition: "lg:right-[-109px] lg:top-[17%]",
  },
  {
    title: "Custom Branding",
    copy: "Make every proposal feel like your brand. Adjust logo, colors, typography, links, and proposal style without redesigning from scratch.",
    icon: Palette,
    accent: "text-[#337dff]",
    cardPosition: "lg:left-[-117px] lg:top-[43%]",
  },
  {
    title: "Close Loops Faster",
    copy: "Turn leads from WhatsApp, email, Instagram, or website forms into ready-to-share proposals without jumping between multiple tools.",
    icon: MessageSquare,
    accent: "text-[#ff9f43]",
    cardPosition: "lg:right-[-112px] lg:top-[35%]",
  },
  {
    title: "Global Client Ready",
    copy: "Create proposals in your client’s language and currency with real-time conversion support, so international enquiries feel local and clear.",
    icon: Globe2,
    accent: "text-[#13c2a3]",
    cardPosition: "lg:left-[-112px] lg:top-[20%]",
  },
  {
    title: "Works Everywhere",
    copy: "Create, review, and share proposals across mobile, tablet, and laptop. Send them as a live URL or export them as a polished PDF.",
    icon: Laptop,
    accent: "text-[#8f5bff]",
    cardPosition: "lg:right-[-109px] lg:top-[43%]",
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
      data-scroll-reveal
      className="scroll-reveal relative z-10 h-[680vh] bg-white/82 px-5 py-16 sm:py-20"
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
          <FeatureProgressIndicator activeSlide={activeSlide} totalSlides={FEATURES.length} />
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
            "absolute left-1/2 top-[56%] w-[min(452px,calc(100vw-40px))] -translate-x-1/2 rounded-[30px] border border-sherpa-ink bg-white p-7 text-left shadow-[1px_4px_0_#000] transition-all duration-700 ease-sherpa sm:p-8 lg:left-auto lg:translate-x-0",
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

function FeatureProgressIndicator({
  activeSlide,
  totalSlides,
}: {
  activeSlide: number;
  totalSlides: number;
}) {
  return (
    <div
      className="absolute bottom-0 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-sherpa-pill border border-[#dfe3e8] bg-white/75 px-3 py-2 shadow-[0_6px_18px_rgba(32,44,61,0.08)] backdrop-blur-sm lg:bottom-auto lg:left-auto lg:right-[-68px] lg:top-[318px] lg:translate-x-0 lg:flex-col lg:px-2 lg:py-3"
      aria-label={`Feature slide ${activeSlide + 1} of ${totalSlides}`}
    >
      {Array.from({ length: totalSlides }).map((_, index) => {
        const isActive = activeSlide === index;

        return (
          <span
            key={index}
            className={cn(
              "block rounded-sherpa-pill bg-sherpa-ink/20 transition-all duration-500 ease-sherpa",
              isActive
                ? "h-2 w-8 bg-sherpa-ink lg:h-8 lg:w-2"
                : "h-2 w-2 lg:h-2 lg:w-2",
            )}
            aria-hidden="true"
          />
        );
      })}
      <span className="sr-only">
        Slide {activeSlide + 1} of {totalSlides}
      </span>
    </div>
  );
}
