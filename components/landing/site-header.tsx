"use client";

import Image from "next/image";
import { Menu } from "lucide-react";
import { navItems } from "@/lib/content";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { OutistButton } from "./outist-button";

const GOOGLE_FORM_URL = "https://forms.gle/tfSK7WaLfgPHapza7";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
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

          <div className={cn("hidden shrink-0 items-center gap-3 lg:flex")}>
            <OutistButton asChild className="hidden sm:inline-flex">
              <a href={GOOGLE_FORM_URL} target="_blank" rel="noreferrer">
                Start for Free
              </a>
            </OutistButton>
            <OutistButton asChild variant="secondary" className="px-5 sm:px-6">
              <a href={GOOGLE_FORM_URL} target="_blank" rel="noreferrer">
                Book Demo
              </a>
            </OutistButton>
          </div>

          <div className="ml-auto flex items-center gap-3 lg:hidden">
            <OutistButton asChild className="min-h-11 px-5 text-[15px]">
              <a href={GOOGLE_FORM_URL} target="_blank" rel="noreferrer">
                Start Free
              </a>
            </OutistButton>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open navigation menu"
                className="inline-flex size-12 items-center justify-center rounded-full border border-sherpa-ink bg-white text-sherpa-ink shadow-[1px_3px_0_#202c3d] transition-transform active:translate-y-[2px] active:shadow-none lg:hidden"
              >
                <Menu aria-hidden className="size-6" strokeWidth={2.25} />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-sherpa-ink/10 bg-white p-0 text-sherpa-ink backdrop-blur-none"
              style={{ background: "#ffffff", backdropFilter: "none" }}
            >
              <SheetHeader className="border-sherpa-ink/10 bg-white p-6">
                <SheetTitle className="text-[20px] font-medium text-sherpa-ink">
                  Menu
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-2 px-6 py-5">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.label}>
                    <a
                      href={item.href}
                      className="rounded-[16px] px-4 py-4 text-[20px] font-medium leading-[1.25] text-sherpa-ink transition-colors hover:bg-sherpa-lime/20"
                    >
                      {item.label}
                    </a>
                  </SheetClose>
                ))}
              </div>
              <div className="mt-auto flex flex-col gap-4 border-t border-sherpa-ink/10 p-6">
                <SheetClose asChild>
                  <OutistButton asChild variant="secondary" className="w-full">
                    <a href={GOOGLE_FORM_URL} target="_blank" rel="noreferrer">
                      Book Demo
                    </a>
                  </OutistButton>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}
