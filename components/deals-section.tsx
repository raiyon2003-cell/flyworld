"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Flame } from "lucide-react";

import { DEALS } from "@/data/deals";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function DealsSection() {
  return (
    <section id="deals" className="relative isolate py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_hsl(var(--primary)_/_0.12),_transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_hsl(var(--primary)_/_0.16),_transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <Badge variant="glass" className="rounded-full px-3 py-1">
              <Flame className="mr-2 h-3.5 w-3.5 text-orange-500" />
              Curated offers
            </Badge>
            <h2 className="mt-4 font-display text-3xl font-black tracking-tight md:text-4xl">
              Deals engineered for every kind of traveler
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Animated gradients, tactile depth, and crisp typography — each card is
              designed to feel alive without overwhelming the itinerary below.
            </p>
          </div>
          <Button
            asChild
            variant="premium"
            className="rounded-2xl px-7 shadow-xl md:self-center"
          >
            <Link href="/deals">
              Browse all deals
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {DEALS.map((deal, index) => (
            <motion.article
              key={deal.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              whileHover={{ y: -6 }}
              className={cn(
                "relative overflow-hidden rounded-[1.75rem] border border-white/20 p-8 text-white shadow-2xl dark:border-white/15",
                "bg-gradient-to-br",
                deal.gradient,
              )}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-black/35" />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
              <div className="relative flex flex-col gap-5">
                <Badge className="w-fit rounded-full bg-black/40 px-3 py-1 text-[11px] uppercase tracking-wide text-white backdrop-blur-md">
                  {deal.badge}
                </Badge>
                <div>
                  <h3 className="font-display text-2xl font-black text-white drop-shadow-sm">
                    {deal.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-white/90">
                    {deal.description}
                  </p>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="mt-2 w-fit rounded-xl border-white/35 bg-white/15 text-white hover:bg-white/25 hover:text-white"
                >
                  <Link href="/deals">Unlock offer</Link>
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
