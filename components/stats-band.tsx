"use client";

import { motion } from "framer-motion";

import { SITE } from "@/lib/site";

const extendedStats = [
  { value: "2M+", label: "Passengers Flown" },
  { value: "500+", label: "Destinations Covered" },
  { value: "98%", label: "Customer Satisfaction" },
  { value: "15", label: "Trusted Experience" },
];

export function StatsBand({ variant = "hero" }: { variant?: "hero" | "section" }) {
  const stats = variant === "hero" ? SITE.stats : extendedStats;
  const isHero = variant === "hero";

  return (
    <motion.div
      {...(isHero
        ? { initial: false as const, animate: { opacity: 1, y: 0 } }
        : {
            initial: { opacity: 0, y: 16 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
          })}
      transition={{ duration: 0.45 }}
      className={
        variant === "hero"
          ? "mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4"
          : "grid grid-cols-2 gap-6 rounded-2xl border border-border/60 bg-card/80 p-6 shadow-lg backdrop-blur-md sm:grid-cols-4 sm:p-8"
      }
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          className={
            variant === "hero"
              ? "rounded-xl border border-white/20 bg-white/10 px-3 py-4 text-center backdrop-blur-md dark:border-white/10 dark:bg-black/25"
              : "text-center"
          }
        >
          <p
            className={
              variant === "hero"
                ? "font-display text-2xl font-black text-white sm:text-3xl"
                : "font-display text-3xl font-black text-primary"
            }
          >
            {stat.value}
          </p>
          <p
            className={
              variant === "hero"
                ? "mt-1 text-[11px] font-semibold uppercase tracking-wide text-white/75 sm:text-xs"
                : "mt-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
            }
          >
            {stat.label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
