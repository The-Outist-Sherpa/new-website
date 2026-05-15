"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full border font-medium transition-all duration-fast ease-sherpa focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "border-[#202c3d] bg-brand text-[#202c3d] shadow-[1px_4px_0px_0px_#202c3d] hover:translate-y-[1px] hover:bg-[#c4df77] hover:shadow-[1px_2px_0px_0px_#202c3d] active:translate-y-[2px] active:bg-[#c4df77] active:shadow-none disabled:border-[#cfd5de] disabled:bg-[#f0f9d7] disabled:text-[#bcc5d2] disabled:shadow-[1px_4px_0px_0px_#dfe3e8]",
        primary:
          "border-[#202c3d] bg-brand text-[#202c3d] shadow-[1px_4px_0px_0px_#202c3d] hover:translate-y-[1px] hover:bg-[#c4df77] hover:shadow-[1px_2px_0px_0px_#202c3d] active:translate-y-[2px] active:bg-[#c4df77] active:shadow-none disabled:border-[#cfd5de] disabled:bg-[#f0f9d7] disabled:text-[#bcc5d2] disabled:shadow-[1px_4px_0px_0px_#dfe3e8]",
        secondary:
          "border-[#43533f] bg-[#171f15] text-[#f4f7ef] shadow-[1px_4px_0px_0px_#43533f] hover:translate-y-[1px] hover:bg-[#1d281a] hover:shadow-[1px_2px_0px_0px_#43533f] active:translate-y-[2px] active:bg-[#1d281a] active:shadow-none disabled:border-[#2c352b] disabled:bg-[#131913] disabled:text-[#7f8d78] disabled:shadow-[1px_4px_0px_0px_#2c352b]",
        outline:
          "border-[#43533f] bg-[#171f15] text-[#f4f7ef] shadow-[1px_2px_0px_0px_#43533f] hover:translate-y-[1px] hover:bg-[#1d281a] active:translate-y-[2px] active:shadow-none disabled:border-[#2c352b] disabled:text-[#7f8d78] disabled:shadow-[1px_2px_0px_0px_#2c352b]",
        ghost:
          "border-transparent bg-transparent text-ink-soft shadow-none hover:bg-white/10 hover:text-ink active:bg-white/15",
        link: "border-transparent bg-transparent px-0 text-ink underline-offset-4 shadow-none hover:underline",
      },
      size: {
        default: "min-h-11 px-6 py-3 text-base leading-5",
        sm: "min-h-10 px-5 py-2.5 text-sm leading-5",
        lg: "min-h-14 px-8 py-3 text-[18px] leading-[1.25]",
        icon: "h-11 w-11 p-0 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
