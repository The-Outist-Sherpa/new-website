"use client";

import { Mic } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const PROMPT_TEXT =
  "Modify the ‘Majestic Zanskar’ itinerary from our catalogue for Ms. Noa Levi. Group size 8. Include an acclimatization hike to Patalsu on Day 2. Meals on MAP on Day 1 and 8, remaining days AP. Cost per person is INR 1,58,000 (incl 5% GST).";

const TYPE_INTERVAL_MS = 30;
const GENERATING_DURATION_MS = 4200;
const LINK_PREVIEW_URL = "https://tours.outist.app/s/qaWXDawni?v=Cy0GN";

type DemoPhase = "idle" | "recording" | "generating" | "complete";

export function PromptDemoSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const hasPlayedRef = useRef(false);
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const [typedPrompt, setTypedPrompt] = useState("");
  const [phase, setPhase] = useState<DemoPhase>("idle");
  const isRecording = phase === "recording";
  const isGenerating = phase === "generating";
  const isComplete = phase === "complete";
  const isOrbActive = isRecording || isGenerating;

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const stopTyping = () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const stopGenerating = () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    const startPromptFlow = () => {
      if (hasPlayedRef.current) {
        return;
      }

      hasPlayedRef.current = true;
      setTypedPrompt("");
      setPhase("recording");

      let index = 0;
      stopTyping();
      stopGenerating();
      intervalRef.current = window.setInterval(() => {
        index += 1;
        setTypedPrompt(PROMPT_TEXT.slice(0, index));

        if (index >= PROMPT_TEXT.length) {
          stopTyping();
          setPhase("generating");
          timeoutRef.current = window.setTimeout(() => {
            timeoutRef.current = null;
            setPhase("complete");
          }, GENERATING_DURATION_MS);
        }
      }, TYPE_INTERVAL_MS);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startPromptFlow();
        }
      },
      { threshold: 0.45 },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      stopTyping();
      stopGenerating();
    };
  }, []);

  return (
    <section
      id="try"
      ref={sectionRef}
      data-scroll-reveal
      className="scroll-reveal relative z-10 flex min-h-[760px] flex-col items-center bg-white/82 px-5 py-16 text-center sm:min-h-[820px] sm:py-20 lg:min-h-[980px] lg:py-20"
    >
      <div className="flex w-full max-w-[760px] flex-col items-center justify-center gap-4">
        <OutistOrb active={isOrbActive} />
        <h2 className="text-balance text-[34px] font-medium leading-[1.12] text-sherpa-ink sm:text-[46px] sm:leading-[1.25]">
          You describe. Sherpa builds.
        </h2>
        <p className="max-w-[747px] text-balance text-[18px] font-normal leading-[1.7] text-sherpa-ink sm:text-[24px]">
          Your personal assistant for hyper-personalised, branded proposals - on demand, instantly, anywhere! Just talk or type!
        </p>
      </div>

      <div className="mt-16 flex w-full max-w-[1270px] flex-col items-center gap-8 sm:mt-24 sm:gap-10 lg:mt-[134px] lg:flex-row lg:items-start lg:gap-[39px]">
        <div
          className={cn(
            "order-1 flex w-full max-w-[387px] flex-col items-center py-2 transition-all duration-700 ease-sherpa sm:py-10 lg:order-none lg:items-start lg:py-20",
            isComplete && "lg:opacity-100",
          )}
        >
          <div className="w-full px-4 py-3 text-left">
            <div className="flex w-full flex-col items-start gap-3">
              <span className={cn("mic-recording-indicator", isRecording && "is-recording")}>
                <Mic
                  aria-hidden="true"
                  className={cn(
                    "size-10 transition-colors duration-medium",
                    isRecording ? "text-black" : "text-sherpa-muted",
                  )}
                  strokeWidth={2.25}
                />
              </span>

              <div className="flex w-full flex-col gap-6 sm:gap-[26px]">
                <div className="flex items-center">
                  <p className="truncate text-[24px] font-medium leading-[1.25] text-sherpa-ink">
                    Prompt
                  </p>
                </div>

                <p
                  className="min-h-[150px] w-full whitespace-pre-wrap text-[18px] font-normal leading-[1.85] text-sherpa-ink sm:min-h-[178px]"
                  aria-live="polite"
                >
                  {typedPrompt}
                  {isRecording ? (
                    <span
                      aria-hidden="true"
                      className="ml-0.5 inline-block h-5 w-[2px] translate-y-1 animate-caret bg-sherpa-ink"
                    />
                  ) : null}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "relative order-2 flex w-full max-w-[844px] items-center justify-center overflow-hidden transition-all duration-700 ease-sherpa lg:order-none lg:min-h-0",
            isComplete ? "min-h-[790px] sm:min-h-[610px] lg:h-[638px]" : "min-h-[460px] sm:min-h-[520px] lg:h-[638px]",
          )}
        >
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-all duration-700 ease-sherpa",
              isComplete
                ? "pointer-events-none translate-y-3 scale-[0.98] opacity-0 blur-sm"
                : "translate-y-0 scale-100 opacity-100 blur-0",
            )}
          >
            <div className="flex h-[460px] w-full items-center justify-center rounded-[28px] border border-[#cfd5de] bg-[#f0f3f7] px-3 py-3 sm:h-[520px] sm:rounded-[20px] lg:h-[638px]">
              <StatusText phase={phase} />
            </div>
          </div>

          <div
            className={cn(
              "absolute inset-0 flex items-start transition-all duration-700 ease-sherpa",
              isComplete
                ? "translate-y-0 opacity-100 blur-0"
                : "pointer-events-none translate-y-6 opacity-0 blur-sm",
            )}
          >
            <GeneratedProposalFrame />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatusText({ phase }: { phase: DemoPhase }) {
  const isAnimating = phase === "recording" || phase === "generating";
  const label = phase === "generating" ? "Generating Proposal" : "Listening";

  return (
    <p className="whitespace-nowrap text-[16px] font-medium leading-[1.25] text-black">
      {label}
      <span className={cn("listening-dots", isAnimating && "is-active")} aria-hidden="true">
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </span>
    </p>
  );
}

function GeneratedProposalFrame() {
  return (
    <div className="flex w-full flex-col items-start gap-[25px]">
      <div className="flex h-[760px] w-full items-center justify-center sm:h-[520px] lg:h-[638px]">
        <div className="relative h-full w-full max-w-[390px] overflow-hidden rounded-[36px] border-[8px] border-black bg-white shadow-[0_20px_70px_rgba(32,44,61,0.18)] transition-all duration-500 ease-sherpa sm:max-w-none sm:rounded-[20px] sm:border sm:border-[#cfd5de] sm:shadow-[0_18px_60px_rgba(32,44,61,0.12)]">
          <iframe
            title="Generated proposal link preview"
            src={LINK_PREVIEW_URL}
            className="h-full w-full border-0 bg-white xl:absolute xl:left-0 xl:top-0 xl:h-[726px] xl:w-[960px] xl:origin-top-left xl:scale-[0.879]"
          />
        </div>
      </div>
    </div>
  );
}

function OutistOrb({ active }: { active: boolean }) {
  return (
    <div
      className={cn(
        "sherpa-orb relative h-[120px] w-[120px] shrink-0",
        active && "is-listening",
      )}
      aria-label="The Outist is listening"
      role="img"
    >
      <span className="orb-glow" aria-hidden="true" />
      <span className="orb-voice orb-voice-a" aria-hidden="true" />
      <span className="orb-voice orb-voice-b" aria-hidden="true" />
      <span className="orb-voice orb-voice-c" aria-hidden="true" />
      <Image
        src="/assets/sherpa-orb-base.png"
        alt=""
        width={120}
        height={120}
        className="orb-base"
        priority={false}
      />
      <Image
        src="/assets/sherpa-orb-light.png"
        alt=""
        width={132}
        height={132}
        className="orb-light"
        priority={false}
      />
      <span className="orb-shimmer" aria-hidden="true" />
    </div>
  );
}
