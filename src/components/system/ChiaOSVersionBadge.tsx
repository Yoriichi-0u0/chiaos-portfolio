"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { getChiaOSVersion, type ChiaOSVersion } from "@/lib/version";

type ChiaOSVersionBadgeProps = {
  tone?: "light" | "dark";
  showHint?: boolean;
  className?: string;
};

const tooltip = "Version follows my real age. The system updates as I do.";

export function ChiaOSVersionBadge({
  tone = "dark",
  showHint = false,
  className,
}: ChiaOSVersionBadgeProps) {
  const [version, setVersion] = useState<ChiaOSVersion | null>(null);

  useEffect(() => {
    function syncVersion() {
      setVersion(getChiaOSVersion());
    }

    syncVersion();
    const intervalId = window.setInterval(syncVersion, 60 * 60 * 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  const label = version?.shortLabel ?? "v--";
  const accessibleLabel = version
    ? `${version.label}. ${version.tooltip}`
    : `ChiaOS version loading. ${tooltip}`;

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold",
        tone === "light"
          ? "border-[#D2D2D7] bg-white text-[#1D1D1F]"
          : "border-[#00D9FF]/30 bg-[#00D9FF]/10 text-[#B7F7FF]",
        className
      )}
      title={version?.tooltip ?? tooltip}
      aria-label={accessibleLabel}
      aria-live="polite"
    >
      <span>{label}</span>
      {showHint ? (
        <span
          className={cn(
            "hidden font-normal sm:inline",
            tone === "light" ? "text-[#6E6E73]" : "text-[#AAB4C0]"
          )}
        >
          live age build
        </span>
      ) : null}
    </span>
  );
}
