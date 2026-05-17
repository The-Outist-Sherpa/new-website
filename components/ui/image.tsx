import { ImgHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type ReactImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> & {
  alt: string;
  fill?: boolean;
  priority?: boolean;
  src: string;
};

export const Image = forwardRef<HTMLImageElement, ReactImageProps>(
  ({ alt, className, fill, height, priority, src, width, ...props }, ref) => (
    <img
      ref={ref}
      alt={alt}
      className={cn(fill && "absolute inset-0 h-full w-full", className)}
      decoding={priority ? "sync" : "async"}
      height={fill ? undefined : height}
      loading={priority ? "eager" : props.loading}
      src={src}
      width={fill ? undefined : width}
      {...props}
    />
  ),
);

Image.displayName = "Image";
