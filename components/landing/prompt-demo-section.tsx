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
      className="scroll-reveal relative z-10 flex min-h-[760px] flex-col items-center bg-white/82 px-5 py-16 text-center sm:min-h-[820px] sm:py-20 lg:min-h-[900px] lg:py-7"
    >
      <h2 className="w-full max-w-[1180px] text-balance text-[36px] font-medium leading-[1.12] text-sherpa-ink sm:text-[46px] sm:leading-[1.25] lg:leading-[1.5]">
        Easy Prompt to Top Quality Proposal
      </h2>

      <div className="mt-12 flex w-full max-w-[1270px] flex-col items-center gap-10 sm:mt-[85px] lg:flex-row lg:items-center lg:gap-[39px]">
        <div
          className={cn(
            "flex w-full max-w-[387px] flex-col items-center py-8 transition-all duration-700 ease-sherpa sm:py-10 lg:order-none lg:items-start",
            isComplete ? "order-2" : "order-1",
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
                  className="min-h-[178px] w-full whitespace-pre-wrap text-[18px] font-normal leading-[1.85] text-sherpa-ink"
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
            "relative flex min-h-[500px] w-full max-w-[844px] items-center justify-center overflow-hidden transition-all duration-700 ease-sherpa sm:min-h-[610px] lg:order-none lg:h-[735px] lg:min-h-0",
            isComplete ? "order-1" : "order-2",
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
            <div className="flex w-full max-w-[450px] flex-col items-center gap-6">
              <OutistOrb active={isOrbActive} />
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
    <p className="whitespace-nowrap text-base font-normal leading-[1.45] text-sherpa-muted">
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
      <div className="flex h-[460px] w-full items-center justify-center rounded-[20px] border border-[#cfd5de] bg-[#f0f3f7] px-3 py-3 sm:h-[520px] sm:px-4 lg:h-[638px]">
        <div className="relative h-full w-full overflow-hidden rounded-[16px] bg-white shadow-[0_1px_0_rgba(32,44,61,0.05)] transition-all duration-500 ease-sherpa">
          <iframe
            title="Generated proposal link preview"
            src={LINK_PREVIEW_URL}
            className="h-full w-full border-0 bg-white"
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
