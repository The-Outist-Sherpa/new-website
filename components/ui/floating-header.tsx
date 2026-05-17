"use client";

import { Image } from "@/components/ui/image";
import { navItems } from "@/lib/content";
import { cn } from "@/lib/utils";

export function FloatingHeader({ theme = "dark" }: { theme?: "light" | "dark" }) {
  const isDark = theme === "dark";

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="container-shell pt-6 sm:pt-8">
        <nav className="flex items-center justify-between gap-6">
          <a
            href="/"
            className={cn(
              "rounded-[2px] px-1 py-1 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2",
              isDark
                ? "hover:bg-white/10 focus-visible:ring-white/60"
                : "hover:bg-black/6 focus-visible:ring-black/30",
            )}
            aria-label="The Outist home"
          >
            <Image
              src="/assets/outist-logo.svg"
              alt="The Outist logo"
              width={140}
              height={36}
              className={cn(
                "h-8 w-auto sm:h-9",
                isDark ? "brightness-0 invert" : "brightness-0",
              )}
              priority
            />
          </a>

          <div className="hidden items-center gap-2 md:flex">
            {navItems.map((link) => (
              <a
                key={link.label}
                className={cn(
                  "rounded-[2px] px-3 py-2 text-[16px] font-normal leading-5 transition-colors duration-300",
                  isDark
                    ? "text-white hover:bg-white/10"
                    : "text-[#171717] hover:bg-black/6",
                )}
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href="#try"
              className={cn(
                "inline-flex min-h-11 items-center justify-center rounded-[2px] px-5 py-3 text-[16px] font-medium leading-5 transition-colors duration-300",
                isDark
                  ? "bg-[#f8f8f8] text-[#171717] hover:bg-white"
                  : "bg-[#171717] text-white hover:bg-black",
              )}
            >
              Try Me
            </a>
            <a
              href="#hire"
              className={cn(
                "inline-flex min-h-11 items-center justify-center rounded-[2px] px-5 py-3 text-[16px] font-medium leading-5 transition-colors duration-300",
                isDark
                  ? "bg-[#f8f8f8] text-[#171717] hover:bg-white"
                  : "bg-[#171717] text-white hover:bg-black",
              )}
            >
              Hire Me
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
