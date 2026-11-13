import { cn } from "@/lib/utils";

export function ChiaOSMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden className={cn("h-7 w-7 shrink-0", className)}>
      <rect width="64" height="64" rx="14" fill="#0B0F17" />
      <path
        d="M44.02 19.98A17 17 0 1 0 44.02 44.02"
        stroke="#00D9FF"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="32" cy="32" r="5.5" fill="#FFD400" />
    </svg>
  );
}
