"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, Globe2, ShieldCheck, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pb-16 pt-10 sm:pb-24 sm:pt-14 lg:pb-28 lg:pt-16">
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-95" />
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-primary/35 blur-[120px]" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-accent/35 blur-[130px]" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.22] dark:opacity-[0.14]">
        <Image
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=2200&q=85"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:flex-row lg:items-center lg:gap-16 lg:px-8">
        <div className="max-w-3xl flex-1">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-lg backdrop-blur-xl dark:border-white/15 dark:bg-black/25"
          >
            <Sparkles className="h-4 w-4" />
            Fly smarter · Book bolder
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 font-display text-4xl font-black tracking-tight text-white drop-shadow-sm sm:text-5xl lg:text-6xl"
          >
            Find Cheap Flights{" "}
            <span className="bg-gradient-to-r from-white via-sky-100 to-indigo-100 bg-clip-text text-transparent">
              Worldwide
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90"
          >
            Compare thousands of flights and book your perfect trip with FlyWorld.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Button
              asChild
              size="lg"
              variant="premium"
              className="rounded-2xl px-8 text-base shadow-2xl"
            >
              <Link href="/search">Search flights</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-2xl border-white/35 bg-white/10 px-8 text-base font-semibold text-white backdrop-blur-xl hover:bg-white/20 hover:text-white dark:border-white/20"
            >
              <Link href="/deals">Explore deals</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.26 }}
            className="mt-10 grid gap-4 sm:grid-cols-3"
          >
            {[
              {
                title: "Live comparisons",
                icon: Globe2,
                body: "Airlines, alliances, and OTAs in one crystal-clear grid.",
              },
              {
                title: "Built for trust",
                icon: ShieldCheck,
                body: "Transparent fare families with baggage cues upfront.",
              },
              {
                title: "Destinations galore",
                icon: Compass,
                body: "From weekend hops to around-the-world itineraries.",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/20 bg-white/10 p-4 text-white shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-black/30"
              >
                <item.icon className="h-5 w-5 text-white/90" />
                <p className="mt-3 text-sm font-bold">{item.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-white/80">
                  {item.body}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.75, delay: 0.18 }}
          className="relative mx-auto w-full max-w-md flex-1 lg:mx-0"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
            className="glass-panel relative overflow-hidden rounded-[2rem] border-white/25 bg-white/10 p-6 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-black/35"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-white/70">
                  Trending route
                </p>
                <p className="font-display text-2xl font-black text-white">
                  DXB → JFK
                </p>
              </div>
              <span className="rounded-full bg-emerald-400/90 px-3 py-1 text-xs font-bold text-emerald-950 shadow-md">
                Save 18%
              </span>
            </div>
            <div className="mt-6 grid gap-3">
              <div className="flex items-center justify-between rounded-xl bg-white/15 px-4 py-3 text-sm font-semibold text-white backdrop-blur-md dark:bg-white/10">
                <span>Nonstop · Apr 12–26</span>
                <span>$642</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3 text-sm font-medium text-white/90 backdrop-blur-md">
                <span>1 stop · Flexible dates</span>
                <span>$519</span>
              </div>
            </div>
            <p className="mt-4 text-[11px] text-white/70">
              Illustrative pricing · Frontend demonstration only.
            </p>
          </motion.div>

          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{
              repeat: Infinity,
              duration: 8,
              ease: "easeInOut",
              delay: 0.8,
            }}
            className="absolute -left-6 top-10 hidden rounded-2xl border border-white/30 bg-gradient-to-br from-primary/90 to-accent/80 px-4 py-3 text-xs font-bold text-white shadow-xl backdrop-blur-xl md:block"
          >
            ✈️ Weekend flash fares live
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 6.5,
              ease: "easeInOut",
              delay: 0.4,
            }}
            className="absolute -right-4 bottom-8 hidden rounded-2xl border border-white/25 bg-white/15 px-4 py-3 text-xs font-semibold text-white shadow-xl backdrop-blur-xl md:block"
          >
            Lounge access on select carriers
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
