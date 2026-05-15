import { Slot } from "@radix-ui/react-slot";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type SherpaButtonProps = ComponentPropsWithoutRef<"button"> & {
  asChild?: boolean;
  size?: "nav" | "hero";
  variant?: "primary" | "secondary";
};

export function SherpaButton({
  asChild = false,
  className,
  size = "nav",
  variant = "primary",
  ...props
}: SherpaButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sherpa-pill border border-sherpa-ink font-medium leading-[1.25] text-sherpa-ink transition-transform duration-fast ease-sherpa focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sherpa-ink/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:translate-y-[2px] active:shadow-none",
        variant === "primary" && "bg-sherpa-lime shadow-sherpa-button hover:bg-[#c4f24c]",
        variant === "secondary" && "bg-white shadow-sherpa-button-sm hover:bg-[#fbfbfb]",
        size === "nav" && "min-h-12 px-6 text-base md:px-8",
        size === "hero" && "min-h-16 w-full max-w-[372px] px-8 text-[18px] shadow-sherpa-button-lg",
        className,
      )}
      {...props}
    />
  );
}
