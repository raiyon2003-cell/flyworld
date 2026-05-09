"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { DESTINATIONS } from "@/data/destinations";
import { Button } from "@/components/ui/button";
import { DestinationCard } from "@/components/destination-card";

export function DestinationsSection() {
  return (
    <section
      id="destinations"
      className="relative isolate overflow-hidden py-20 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-muted/40 to-background dark:via-muted/15" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="max-w-2xl"
          >
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
              Popular destinations
            </p>
            <h2 className="mt-3 font-display text-3xl font-black tracking-tight md:text-4xl">
              Discover where travelers are booking right now
            </h2>
            <p className="mt-4 text-muted-foreground">
              Immersive cards, tactile hover states, and realistic starting fares —
              tuned for conversion without feeling salesy.
            </p>
          </motion.div>

          <Button
            asChild
            variant="outline"
            className="self-start rounded-2xl border-white/15 bg-card/60 backdrop-blur lg:self-auto"
          >
            <Link href="/destinations">
              View all destinations
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {DESTINATIONS.map((d, i) => (
            <DestinationCard key={d.slug} destination={d} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
