import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-white/75 px-3 py-1 text-xs font-medium text-ink-soft shadow-xs backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </span>
  );
}
