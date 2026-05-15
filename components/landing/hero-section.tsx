import { SherpaButton } from "./sherpa-button";

export function HeroSection() {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-[1432px] flex-col items-center px-5 pt-[218px] text-center sm:px-8 sm:pt-[252px] lg:pt-[290px]">
      <h1 className="max-w-[1180px] text-balance text-[42px] font-medium leading-[1.12] tracking-normal text-black sm:text-[54px] lg:text-[64px] lg:leading-[1.5]">
        Business badhao, kaam nahi.
      </h1>

      <p className="mt-[23px] max-w-[800px] text-balance text-[20px] font-normal leading-[1.45] tracking-normal text-black sm:text-[24px] lg:text-[26px] lg:leading-[1.5]">
        Instant top-quality proposals in hours minutes = Brand trust + More
        <br className="hidden lg:block" />
        bookings = More revenue
      </p>

      <div className="mt-[23px] flex w-full justify-center">
        <SherpaButton asChild size="hero">
          <a href="#try">Try for Free</a>
        </SherpaButton>
      </div>
    </div>
  );
}
