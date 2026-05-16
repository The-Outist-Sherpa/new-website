import { Zap } from "lucide-react";
import { SherpaButton } from "./sherpa-button";

export function HeroSection() {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-[1432px] flex-col items-center px-5 pt-[218px] text-center sm:px-8 sm:pt-[252px] lg:pt-[290px]">
      <h1 className="max-w-[1180px] text-balance text-[42px] font-medium leading-[1.12] tracking-normal text-black sm:text-[54px] lg:text-[64px] lg:leading-[1.5]">
        Customized, Top-grade Proposals in{" "}
        <span className="inline-flex items-center gap-[0.14em] whitespace-nowrap align-baseline">
          <span className="relative inline-block">
            hours
            <span
              aria-hidden="true"
              className="absolute left-0 top-[57%] h-[0.06em] w-full -translate-y-1/2 bg-current"
            />
          </span>
          <span className="hero-blue-gradient-text inline-flex items-center whitespace-nowrap align-baseline">
            <Zap
              aria-hidden="true"
              className="hero-bolt-icon mx-[0.04em] inline size-[0.78em] translate-y-[0.09em] fill-[#2447ff] text-[#2447ff]"
              strokeWidth={2.25}
            />
            minutes!
          </span>
        </span>
      </h1>

      <p className="mt-[23px] max-w-[800px] text-balance text-[20px] font-normal leading-[1.45] tracking-normal text-black sm:text-[24px] lg:text-[26px] lg:leading-[1.5]">
        Business badhao, kaam nahi.
      </p>

      <div className="mt-10 flex w-full justify-center sm:mt-12">
        <SherpaButton asChild size="hero">
          <a href="#try">Try for Free</a>
        </SherpaButton>
      </div>
    </div>
  );
}
