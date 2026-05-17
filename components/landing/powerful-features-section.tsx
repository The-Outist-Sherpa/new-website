"use client";

import { Brain, Clock3, Globe2, Image, Laptop, Palette } from "lucide-react";
import type { ComponentType } from "react";
import { useEffect, useRef, useState } from "react";
import { Image as ReactImage } from "@/components/ui/image";
import { cn } from "@/lib/utils";

type FeatureSlide = {
  accent: string;
  cardPosition: string;
  copy: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number; "aria-hidden"?: boolean }>;
  imageAlt: string;
  imageSrc: string;
  overlayLabel?: string;
  title: string;
};

const FEATURES: FeatureSlide[] = [
  {
    title: "Go live in 10 minutes",
    copy: "Upload your old proposals once. Sherpa learns your style, content, packages & more - so your team can get started immediately.",
    icon: Clock3,
    imageSrc: "/assets/10-minute-setup.png",
    imageAlt: "Upload existing proposals into The Outist",
    accent: "text-[#ff5f5f]",
    cardPosition: "lg:right-[-112px] lg:top-[30%]",
  },
  {
    title: "Stunning visuals without the search",
    copy: "Find destination-perfect images instantly — or let Sherpa suggest the best ones automatically.",
    icon: Image,
    imageSrc: "/assets/effortless-photo.png",
    imageAlt: "Generate and choose destination photos for proposals",
    accent: "text-[#c6e943]",
    cardPosition: "lg:right-[-109px] lg:top-[17%]",
  },
  {
    title: "Every proposal looks like your brand",
    copy: "Your domain, logo, fonts, colors, and customer experience - with ultra consistency, every single time!",
    icon: Palette,
    imageSrc: "/assets/branding.png",
    imageAlt: "Customize proposal branding, font, and colors",
    accent: "text-[#337dff]",
    cardPosition: "lg:left-[-117px] lg:top-[43%]",
    overlayLabel: "Your Brand Guidelines",
  },
  {
    title: "Plan smarter. Price better.",
    copy: "Refine itineraries, calculate margins, optimize costs, and improve proposals before they reach your customer.",
    icon: Brain,
    imageSrc: "/assets/brainstorm.png",
    imageAlt: "Brainstorm trip ideas and calculate proposal pricing",
    accent: "text-[#18b9e5]",
    cardPosition: "lg:right-[-112px] lg:top-[35%]",
  },
  {
    title: "Sell globally, personalize locally",
    copy: "Multi-language + live currency conversion helps you close international customers faster.",
    icon: Globe2,
    imageSrc: "/assets/global-client-ready.png",
    imageAlt: "Convert proposal pricing across currencies",
    accent: "text-[#13c2a3]",
    cardPosition: "lg:left-[-112px] lg:top-[20%]",
  },
  {
    title: "Create once. Share anywhere.",
    copy: "Live links and PDFs across desktop, mobile and tablet - share however your customers prefer.",
    icon: Laptop,
    imageSrc: "/assets/works-anywhere.png",
    imageAlt: "Review proposals across desktop, mobile, and tablet",
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
      className="scroll-reveal relative z-10 h-[560vh] bg-[#101403] px-5 py-12"
    >
      <div className="sticky top-0 flex min-h-screen w-full flex-col items-center justify-start overflow-hidden pt-10 sm:pt-14 lg:pt-12">
        <h2 className="w-full max-w-[1270px] text-center text-[34px] font-medium leading-[1.2] text-white sm:text-[46px] sm:leading-[1.5]">
          Everything your team needs to close bookings faster!
        </h2>

        <div className="relative mt-12 h-[690px] w-full max-w-[1180px] sm:mt-16 sm:h-[760px] lg:mt-16 lg:h-[710px]">
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
      <div className="relative flex w-full max-w-[924px] flex-col items-center">
        <div
          className={cn(
            "relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-[20px] border border-[#cfd5de] bg-[#f0f3f7] transition-all duration-700 ease-sherpa sm:h-[460px] lg:h-[638px]",
            active ? "translate-y-0 scale-100 opacity-100 blur-0" : "translate-y-8 scale-[0.985] opacity-0 blur-sm",
          )}
        >
          <ReactImage
            src={slide.imageSrc}
            alt={slide.imageAlt}
            fill
            sizes="(min-width: 1024px) 924px, calc(100vw - 40px)"
            className="object-cover"
            priority={slideNumber === 1}
          />
          {slide.overlayLabel ? (
            <div className="absolute left-[22%] top-[12%] hidden rounded-[20px] bg-white px-8 py-5 text-[28px] font-medium leading-[1.15] text-[#2f2f2f] shadow-[0_0_26px_rgba(204,243,95,0.55)] md:block">
              {slide.overlayLabel}
            </div>
          ) : null}
        </div>

        <div
          className={cn(
            "relative mt-5 w-full rounded-[24px] border-2 border-sherpa-ink bg-white p-5 text-left shadow-[1px_6px_0_#000] transition-all duration-700 ease-sherpa sm:w-[min(452px,calc(100vw-40px))] sm:p-7 lg:absolute lg:left-auto lg:mt-0 lg:translate-x-0 lg:rounded-[30px] lg:p-8",
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
      className="absolute bottom-0 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-sherpa-pill border border-white/25 bg-white/18 px-3 py-2 shadow-[0_6px_18px_rgba(0,0,0,0.16)] backdrop-blur-sm lg:bottom-auto lg:left-auto lg:right-[-68px] lg:top-[318px] lg:translate-x-0 lg:flex-col lg:px-2 lg:py-3"
      aria-label={`Feature slide ${activeSlide + 1} of ${totalSlides}`}
    >
      {Array.from({ length: totalSlides }).map((_, index) => {
        const isActive = activeSlide === index;

        return (
          <span
            key={index}
            className={cn(
              "block rounded-sherpa-pill bg-white/35 transition-all duration-500 ease-sherpa",
              isActive
                ? "h-2 w-8 bg-white lg:h-8 lg:w-2"
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
