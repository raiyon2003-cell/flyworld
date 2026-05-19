"use client";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Lightweight backdrop for content sections (no interaction).
 */
export function SectionAtmosphere() {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-[0.12] dark:opacity-[0.08]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary) / 0.25) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />
      {!reduced ? (
        <>
          <div className="absolute -left-[5%] top-[15%] h-32 w-[45%] rounded-full bg-primary/10 blur-3xl motion-reduce:hidden animate-cloud-a" />
          <div className="absolute -right-[10%] bottom-[10%] h-28 w-[40%] rounded-full bg-accent/10 blur-3xl motion-reduce:hidden animate-cloud-b" />
          <svg
            className="absolute inset-0 h-full w-full text-primary/20 motion-reduce:hidden dark:text-primary/15"
            preserveAspectRatio="none"
          >
            <path
              d="M 0 70 Q 120 30 260 65 T 520 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="5 12"
              vectorEffect="non-scaling-stroke"
              className="hero-route-b motion-reduce:animate-none"
            />
            <path
              d="M 0 90 Q 200 110 400 75 T 800 95"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.5"
              strokeWidth="0.8"
              strokeDasharray="4 10"
              className="hero-route-a motion-reduce:animate-none"
            />
          </svg>
        </>
      ) : null}
    </div>
  );
}
