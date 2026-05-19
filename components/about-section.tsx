"use client";

import { motion } from "framer-motion";
import { Building2, Radar, Rocket } from "lucide-react";

import { SectionAtmosphere } from "@/components/ambient/section-atmosphere";

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative isolate overflow-hidden py-20 sm:py-28"
    >
      <SectionAtmosphere />
      <div className="pointer-events-none absolute inset-x-10 top-0 z-[1] h-64 rounded-full bg-gradient-to-r from-primary/25 via-accent/25 to-amber-400/20 blur-3xl" />

      <div className="relative z-[2] mx-auto grid max-w-7xl gap-14 px-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-primary">
            About FlyWorld
          </p>
          <h2 className="mt-4 font-display text-3xl font-black tracking-tight md:text-4xl">
            We&apos;re building the calmest way to plan international trips.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            FlyWorld is a premium frontend concept inspired by category-defining
            brands like Skyscanner, Airbnb, and Booking.com — pairing obsessive UX
            craft with the reassurance travelers expect before they tap “purchase”.
          </p>

          <div className="mt-10 grid gap-6">
            {[
              {
                title: "Mission",
                body: "Democratize global exploration through transparent fares and delightful interfaces.",
                icon: Rocket,
              },
              {
                title: "Flight comparison",
                body: "Surface itineraries across alliances with intuitive timelines and baggage cues.",
                icon: Radar,
              },
              {
                title: "Global scale",
                body: "Designed for localization, RTL-ready layouts, and continent-spanning route matrices.",
                icon: Building2,
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -3 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="flex gap-4 rounded-[1.5rem] border border-white/15 bg-card/70 p-5 shadow-lg backdrop-blur-xl transition-shadow duration-300 hover:shadow-xl dark:border-white/10"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-md">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-display text-lg font-bold">{item.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -4 }}
          className="glass-card relative overflow-hidden rounded-[2rem] border-white/15 p-10 shadow-2xl transition-shadow duration-300 hover:shadow-[0_24px_70px_rgba(0,0,0,0.12)] dark:border-white/10 dark:hover:shadow-[0_24px_70px_rgba(0,0,0,0.45)]"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/25 via-transparent to-accent/25" />
          <div className="relative space-y-6">
            <div>
              <p className="text-sm font-semibold text-muted-foreground">
                Affordable travel
              </p>
              <p className="mt-3 font-display text-4xl font-black tracking-tight">
                $180M+
              </p>
              <p className="text-sm text-muted-foreground">
                illustrative traveler savings unlocked (concept metric).
              </p>
            </div>
            <div className="grid gap-4 rounded-2xl bg-background/60 p-5 backdrop-blur-md dark:bg-background/40">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span>Average search time</span>
                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-emerald-700 dark:text-emerald-300">
                  02:14
                </span>
              </div>
              <div className="flex items-center justify-between text-sm font-semibold">
                <span>Global airports indexed</span>
                <span className="text-primary">4,200+</span>
              </div>
              <div className="flex items-center justify-between text-sm font-semibold">
                <span>Customer satisfaction</span>
                <span className="text-primary">4.9 / 5</span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Figures shown for storytelling purposes on this marketing frontend — swap
              with live analytics when your backend is wired in.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
