"use client";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

function PlaneIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 72"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M4 38 L72 34 L108 22 L196 28 L118 40 L148 58 L128 60 L92 44 L4 46Z" />
    </svg>
  );
}

export function HeroAtmosphere() {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden select-none"
      aria-hidden
    >
      {/* Subtle world grid + slow drift */}
      <div
        className="absolute inset-0 opacity-[0.18] motion-reduce:animate-none dark:opacity-[0.12]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)`,
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className={`absolute -inset-[20%] opacity-30 mix-blend-screen motion-reduce:animate-none dark:opacity-20 ${reduced ? "" : "animate-ambient-drift"}`}
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 30% 40%, rgba(52,211,153,0.28), transparent 55%), radial-gradient(ellipse 70% 45% at 70% 60%, rgba(251,191,36,0.22), transparent 50%)",
        }}
      />

      {/* Floating clouds */}
      <div
        className={`absolute -left-[10%] top-[8%] h-24 w-[42%] rounded-full bg-white/10 blur-2xl motion-reduce:animate-none dark:bg-white/5 ${reduced ? "" : "animate-cloud-a"}`}
      />
      <div
        className={`absolute -right-[8%] top-[22%] h-20 w-[38%] rounded-full bg-amber-100/18 blur-2xl motion-reduce:animate-none dark:bg-amber-200/10 ${reduced ? "" : "animate-cloud-b"}`}
      />
      <div
        className={`absolute left-[20%] top-[38%] h-16 w-[30%] rounded-full bg-emerald-100/12 blur-xl motion-reduce:animate-none dark:bg-emerald-400/8 ${reduced ? "" : "animate-cloud-c"}`}
      />

      {/* Route arcs */}
      {!reduced ? (
        <svg
          className="absolute inset-0 h-full w-full text-white/25 motion-reduce:hidden dark:text-white/15"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="routeGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
              <stop offset="50%" stopColor="currentColor" stopOpacity="0.9" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M -5 55 Q 35 20 120 48 T 280 35"
            fill="none"
            stroke="url(#routeGlow)"
            strokeWidth="1.2"
            strokeDasharray="6 14"
            className="hero-route-a motion-reduce:animate-none"
          />
          <path
            d="M -20 78 Q 60 52 180 70 T 340 58"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.2"
            strokeWidth="0.9"
            strokeDasharray="4 12"
            className="hero-route-b motion-reduce:animate-none"
          />
        </svg>
      ) : null}

      {/* Airplanes — full-width travel, low opacity */}
      {!reduced ? (
        <>
          <div className="absolute left-0 top-[12%] w-32 text-white/28 blur-[0.5px] motion-reduce:hidden sm:top-[14%] sm:w-40 sm:text-white/32">
            <div className="animate-fly-slow">
              <PlaneIcon className="h-auto w-full" />
            </div>
          </div>
          <div className="absolute left-0 top-[30%] w-28 scale-x-[-1] text-white/22 blur-[0.5px] motion-reduce:hidden sm:top-[26%] sm:w-36 sm:text-white/26">
            <div className="animate-fly-slow-rev">
              <PlaneIcon className="h-auto w-full" />
            </div>
          </div>
          <div className="absolute left-0 top-[46%] hidden w-32 text-white/18 blur-[1px] motion-reduce:hidden md:block">
            <div className="animate-fly-slow-delayed">
              <PlaneIcon className="h-auto w-full" />
            </div>
          </div>
        </>
      ) : null}

      {/* Location pins */}
      {!reduced ? (
        <>
          <span className="absolute left-[12%] top-[58%] flex h-2 w-2 items-center justify-center motion-reduce:hidden md:left-[18%] md:top-[52%]">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300/45 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white/70 shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
          </span>
          <span className="absolute right-[20%] top-[42%] hidden h-2 w-2 rounded-full bg-white/60 shadow-[0_0_10px_rgba(255,255,255,0.5)] motion-reduce:hidden lg:block" />
        </>
      ) : null}

      {/* Sparse particles — opacity only, very light */}
      {!reduced ? (
        <div className="absolute inset-0 motion-reduce:hidden">
          {[11, 24, 38, 52, 67, 79, 91].map((left, i) => (
            <span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-white/25 shadow-[0_0_8px_rgba(255,255,255,0.35)] animate-pulse"
              style={{
                left: `${left}%`,
                top: `${18 + (i % 4) * 12}%`,
                animationDuration: `${3.2 + i * 0.35}s`,
                animationDelay: `${i * 0.45}s`,
              }}
            />
          ))}
        </div>
      ) : null}

      {/* Road + cars */}
      <div className="absolute inset-x-0 bottom-0 h-24 sm:h-28">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-14 overflow-hidden rounded-t-[2rem] border border-white/10 bg-gradient-to-b from-slate-900/80 to-slate-950/90 shadow-[0_-12px_40px_rgba(16,185,129,0.1)] backdrop-blur-[2px]">
          <div
            className={`absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[length:48px_2px] motion-reduce:animate-none ${reduced ? "opacity-40" : "animate-road-line opacity-50"}`}
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(255,255,255,0.5) 0 18px, transparent 18px 48px)",
            }}
          />
          {!reduced ? (
            <>
              <div className="absolute bottom-3 left-0 h-2.5 w-7 rounded-sm bg-gradient-to-r from-white/25 to-white/10 shadow-[0_0_20px_rgba(52,211,153,0.35)] motion-reduce:hidden animate-car-a" />
              <div className="absolute bottom-6 left-0 h-2 w-6 rounded-sm bg-gradient-to-r from-white/15 to-white/35 shadow-[0_0_16px_rgba(251,191,36,0.35)] motion-reduce:hidden animate-car-b" />
            </>
          ) : null}
          <div
            className={`pointer-events-none absolute inset-0 bg-gradient-to-r from-emerald-400/8 via-transparent to-amber-400/8 motion-reduce:animate-none ${reduced ? "opacity-50" : "animate-road-glow"}`}
          />
        </div>
      </div>

      {/* Cinematic vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,6,23,0.35)_100%)] opacity-70 dark:opacity-90" />
    </div>
  );
}
