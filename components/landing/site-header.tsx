import Image from "next/image";
import { navItems } from "@/lib/content";
import { cn } from "@/lib/utils";
import { SherpaButton } from "./sherpa-button";

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto w-full max-w-[1248px] px-5 pt-6 md:px-6 md:pt-8">
        <nav className="mx-auto flex min-h-[64px] w-full items-center justify-between gap-4 rounded-sherpa-pill bg-white px-5 py-1 shadow-sherpa-nav sm:min-h-[72px] sm:px-7 lg:max-w-[1200px] lg:pl-10 lg:pr-5">
          <a
            href="#"
            aria-label="The Outist home"
            className="shrink-0 rounded-sherpa-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sherpa-ink/25"
          >
            <Image
              src="/assets/outist-logo.svg"
              alt="The Outist"
              width={136}
              height={32}
              priority
              className="h-auto w-[118px] sm:w-[136px]"
            />
          </a>

          <div className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-3 py-6 text-base leading-[1.5] text-sherpa-ink transition-colors duration-fast hover:text-black"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className={cn("flex shrink-0 items-center gap-3 sm:gap-5")}>
            <SherpaButton asChild className="hidden sm:inline-flex">
              <a href="#try">Try for Free</a>
            </SherpaButton>
            <SherpaButton asChild variant="secondary" className="px-5 sm:px-6">
              <a href="#demo">Demo</a>
            </SherpaButton>
          </div>
        </nav>
      </div>
    </header>
  );
}
