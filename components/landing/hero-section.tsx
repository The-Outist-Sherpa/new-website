import { Clock3, CreditCard, Zap } from "lucide-react";
import { OutistButton } from "./outist-button";

export function HeroSection() {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-[1432px] flex-col items-center px-5 pt-[218px] text-center sm:px-8 sm:pt-[252px] lg:pt-[290px]">
      <h1 className="max-w-[1180px] text-balance text-[42px] font-medium leading-[1.12] tracking-normal text-black sm:text-[54px] lg:text-[64px] lg:leading-[1.5]">
        Turn travel enquiries into bookings
        <br />
        in{" "}
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

      <p className="mt-[23px] max-w-[800px] text-balance text-[24px] font-normal leading-[1.45] tracking-normal text-black sm:text-[30px] lg:text-[34px] lg:leading-[1.5]">
        Business badhao. Kaam nahi!
      </p>

      <div className="mt-10 flex w-full justify-center sm:mt-12">
        <OutistButton asChild size="hero" className="max-w-[460px] px-6 sm:px-8">
          <a href="#try">Start Free - Build Your First Proposal</a>
        </OutistButton>
      </div>

      <div className="mt-5 flex flex-col items-center justify-center gap-3 text-[14px] font-medium leading-[1.25] text-sherpa-ink/72 sm:flex-row sm:gap-6 sm:text-[15px]">
        <span className="inline-flex items-center gap-2">
          <CreditCard aria-hidden className="size-4" strokeWidth={2} />
          No credit card required.
        </span>
        <span className="inline-flex items-center gap-2">
          <Clock3 aria-hidden className="size-4" strokeWidth={2} />
          Setup in 10 minutes.
        </span>
      </div>
    </div>
  );
}
