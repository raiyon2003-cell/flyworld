"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Flame } from "lucide-react";

import { DealCard } from "@/components/deal-card";
import { DEALS, FEATURED_DEALS } from "@/data/deals";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function DealsSection({ showAll = false }: { showAll?: boolean }) {
  const list = showAll ? DEALS : FEATURED_DEALS;

  return (
    <section id="deals" className="relative isolate py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_hsl(var(--primary)_/_0.12),_transparent_55%)]" />

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
              Limited Time Offers
            </Badge>
            <h2 className="mt-4 font-display text-3xl font-black tracking-tight md:text-4xl">
              {showAll ? "All Current Offers" : "Featured Travel Deals"}
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Hand-picked deals updated daily — prices won&apos;t last long.
            </p>
          </div>
          {!showAll ? (
            <Button
              asChild
              variant="premium"
              className="rounded-2xl px-7 shadow-xl md:self-center"
            >
              <Link href="/deals">
                See All Deals
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          ) : null}
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {list.map((deal, index) => (
            <DealCard key={deal.id} deal={deal} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
