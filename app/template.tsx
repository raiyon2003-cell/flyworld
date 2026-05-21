"use client";

import { motion } from "framer-motion";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();

  // Never use `initial={{ opacity: 0 }}` here: SSR output would be invisible until
  // hydration, which reads as a blank page if JS is slow, blocked, or chunks fail.
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduced
          ? { duration: 0 }
          : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </motion.div>
  );
}
