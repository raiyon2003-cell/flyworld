"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Timer } from "lucide-react";

import { Button } from "@/components/ui/button";

function useCountdown(targetHours = 6) {
  const [left, setLeft] = React.useState({ h: 0, m: 0, s: 0 });

  React.useEffect(() => {
    const end = Date.now() + targetHours * 60 * 60 * 1000;
    const tick = () => {
      const diff = Math.max(0, end - Date.now());
      setLeft({
        h: Math.floor(diff / 3_600_000),
        m: Math.floor((diff % 3_600_000) / 60_000),
        s: Math.floor((diff % 60_000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetHours]);

  return left;
}

function TimeBox({ label, value }: { label: string; value: number }) {
  return (
    <motion.div
      className="flex flex-col items-center rounded-xl bg-white/10 px-3 py-2 backdrop-blur-md sm:px-4"
    >
      <span className="font-display text-2xl font-black tabular-nums text-white sm:text-3xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">
        {label}
      </span>
    </motion.div>
  );
}

export function FlashSaleBanner() {
  const { h, m, s } = useCountdown(6);

  return (
    <section className="relative isolate py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2rem] border border-amber-500/30 bg-gradient-to-br from-slate-950 via-amber-950/80 to-orange-950 p-8 shadow-2xl sm:p-12"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(251,191,36,0.25),_transparent_50%)]" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl space-y-4">
              <p className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-200">
                <Timer className="h-4 w-4" />
                Flash Sale Ends In
              </p>
              <h2 className="font-display text-3xl font-black tracking-tight text-white md:text-4xl">
                Up to 50% off selected holidays
              </h2>
              <p className="text-white/80">
                Book before midnight — hand-picked packages at prices that won&apos;t
                last.
              </p>
              <Button asChild variant="premium" className="rounded-2xl px-8 shadow-xl">
                <Link href="/deals">Grab the Deal →</Link>
              </Button>
            </div>
            <div className="flex gap-3 sm:gap-4">
              <TimeBox label="Hours" value={h} />
              <TimeBox label="Mins" value={m} />
              <TimeBox label="Secs" value={s} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
