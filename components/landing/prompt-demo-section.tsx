"use client";

import { FileText, Globe, Mic, MonitorCheck, Smartphone, Zap } from "lucide-react";
import Image from "next/image";
import type { ComponentType } from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const PROMPT_TEXT =
  "Create a proposal for Manali Trip with 5 Adults for 7Days with 4-Star Hotel Accommodation, Premium Transport options, All Food Included. Start point is Chennai, Exclude Flight cost. ";

const TYPE_INTERVAL_MS = 42;
const GENERATING_DURATION_MS = 4200;
const LINK_PREVIEW_URL = "";
const PDF_PREVIEW_URL = "";

type DemoPhase = "idle" | "recording" | "generating" | "complete";
type OutputType = "link" | "pdf";
type PreviewViewport = "desktop" | "mobile";

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

    const playVoice = () => {
      if (!("speechSynthesis" in window)) {
        return;
      }

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(PROMPT_TEXT.trim());
      utterance.rate = 0.96;
      utterance.pitch = 1;
      utterance.volume = 0.95;

      window.speechSynthesis.speak(utterance);
    };

    const startPromptFlow = () => {
      if (hasPlayedRef.current) {
        return;
      }

      hasPlayedRef.current = true;
      setTypedPrompt("");
      setPhase("recording");
      playVoice();

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
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <section
      id="try"
      ref={sectionRef}
      className="relative flex min-h-[760px] flex-col items-center bg-white px-5 py-16 text-center sm:min-h-[820px] sm:py-20 lg:min-h-[900px] lg:py-7"
    >
      <h2 className="w-full max-w-[1180px] text-balance text-[36px] font-medium leading-[1.12] text-sherpa-ink sm:text-[46px] sm:leading-[1.25] lg:leading-[1.5]">
        Easy Prompt to Top Quality Proposal
      </h2>

      <div className="mt-20 flex w-full max-w-[1270px] flex-col items-center gap-10 sm:mt-[85px] lg:flex-row lg:items-center lg:gap-[39px]">
        <div className="flex w-full max-w-[387px] flex-col items-center py-8 sm:py-10 lg:items-start">
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
                  className="min-h-[178px] w-full whitespace-pre-wrap text-base font-normal leading-[1.85] text-sherpa-ink"
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

        <div className="relative flex min-h-[610px] w-full max-w-[844px] items-center justify-center overflow-hidden lg:h-[735px] lg:min-h-0">
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-all duration-700 ease-sherpa",
              isComplete
                ? "pointer-events-none translate-y-3 scale-[0.98] opacity-0 blur-sm"
                : "translate-y-0 scale-100 opacity-100 blur-0",
            )}
          >
            <div className="flex w-full max-w-[450px] flex-col items-center gap-6">
              <SherpaOrb active={isOrbActive} />
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
  const [outputType, setOutputType] = useState<OutputType>("link");
  const [previewViewport, setPreviewViewport] = useState<PreviewViewport>("desktop");
  const isPdf = outputType === "pdf";
  const previewUrl = isPdf ? PDF_PREVIEW_URL : LINK_PREVIEW_URL;

  return (
    <div className="flex w-full flex-col items-start gap-[25px]">
      <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full min-w-0 items-center gap-2 text-sherpa-ink md:w-[262px]">
          <Zap aria-hidden="true" className="size-5 fill-[#16c9e8] text-[#16c9e8]" strokeWidth={2.5} />
          <p className="text-[16px] font-normal leading-[1.45] sm:text-[17px]">
            Generated in less than a min
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 md:gap-6">
          <SegmentedControl
            items={[
              { icon: Globe, label: "Link", value: "link", active: outputType === "link" },
              { icon: FileText, label: "PDF", value: "pdf", active: outputType === "pdf" },
            ]}
            onSelect={(value) => setOutputType(value as OutputType)}
          />
          <SegmentedControl
            disabled={isPdf}
            items={[
              { icon: MonitorCheck, label: "Desktop", value: "desktop", active: previewViewport === "desktop" },
              { icon: Smartphone, label: "Mobile", value: "mobile", active: previewViewport === "mobile" },
            ]}
            onSelect={(value) => {
              if (!isPdf) {
                setPreviewViewport(value as PreviewViewport);
              }
            }}
          />
        </div>
      </div>

      <div className="flex h-[420px] w-full items-center justify-center rounded-[20px] border border-[#cfd5de] bg-[#f0f3f7] px-4 py-3 sm:h-[520px] lg:h-[638px]">
        <div
          className={cn(
            "relative h-full overflow-hidden rounded-[16px] bg-white shadow-[0_1px_0_rgba(32,44,61,0.05)] transition-all duration-500 ease-sherpa",
            isPdf || previewViewport === "desktop"
              ? "w-full"
              : "w-[min(100%,360px)] border border-[#dfe3e8]",
          )}
        >
          {previewUrl ? (
            <iframe
              key={`${outputType}-${previewViewport}`}
              title={isPdf ? "Generated proposal PDF" : "Generated proposal link preview"}
              src={previewUrl}
              className="h-full w-full border-0 bg-white"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <p className="text-center text-base font-medium leading-[1.25] text-black">
                {isPdf ? "PDF preview link pending" : "iframe"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

type SegmentItem = {
  active: boolean;
  icon: ComponentType<{ className?: string; strokeWidth?: number; "aria-hidden"?: boolean }>;
  label: string;
  value: string;
};

function SegmentedControl({
  disabled = false,
  items,
  onSelect,
}: {
  disabled?: boolean;
  items: SegmentItem[];
  onSelect: (value: string) => void;
}) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center rounded-sherpa-pill border border-[#cfd5de] bg-white p-1 transition-opacity duration-medium",
        disabled && "pointer-events-none opacity-40",
      )}
      aria-disabled={disabled}
    >
      {items.map((item, index) => {
        const Icon = item.icon;

        return (
          <button
            type="button"
            key={item.label}
            onClick={() => onSelect(item.value)}
            aria-pressed={item.active}
            disabled={disabled}
            className={cn(
              "flex items-center justify-center gap-2 px-4 py-3 text-[14px] font-medium leading-[1.45] transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sherpa-ink/25",
              item.active ? "bg-[#dfe3e8] text-sherpa-ink" : "text-sherpa-muted",
              index === 0 && "rounded-bl-sherpa-pill rounded-br-[4px] rounded-tl-sherpa-pill rounded-tr-[4px]",
              index === items.length - 1 && "rounded-bl-[4px] rounded-br-sherpa-pill rounded-tl-[4px] rounded-tr-sherpa-pill",
            )}
          >
            <Icon aria-hidden className="size-5" strokeWidth={2} />
            <span className="truncate">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function SherpaOrb({ active }: { active: boolean }) {
  return (
    <div
      className={cn(
        "sherpa-orb relative h-[120px] w-[120px] shrink-0",
        active && "is-listening",
      )}
      aria-label="Sherpa is listening"
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
