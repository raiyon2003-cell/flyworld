"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Plane, Star } from "lucide-react";

import type { Deal } from "@/lib/types";
import { formatGbp } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/**
 * Full gradient class strings as literals so Tailwind JIT includes them.
 * Dynamic `deal.gradient` alone is purged and cards render with no background.
 */
const DEAL_GRADIENTS: Record<string, string> = {
  paris: "from-slate-950 via-rose-950 to-red-950",
  bali: "from-emerald-950 via-teal-950 to-cyan-950",
  "new-york": "from-zinc-950 via-slate-900 to-blue-950",
  dubai: "from-amber-950 via-orange-950 to-amber-900",
  thailand: "from-teal-950 via-emerald-950 to-green-950",
  maldives: "from-cyan-950 via-blue-950 to-indigo-950",
  kenya: "from-stone-950 via-amber-950 to-orange-950",
  barbados: "from-orange-950 via-amber-900 to-yellow-950",
};

export function DealCard({
  deal,
  index = 0,
  compact = false,
}: {
  deal: Deal;
  index?: number;
  compact?: boolean;
}) {
  const save = deal.priceWas - deal.priceNow;
  const pct = Math.round((save / deal.priceWas) * 100);
  const gradientStops =
    DEAL_GRADIENTS[deal.id] ?? "from-slate-950 via-slate-900 to-slate-950";

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className={cn(
        "relative flex min-h-[280px] flex-col overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br text-white shadow-xl transition-shadow duration-300 hover:shadow-2xl dark:border-white/10",
        gradientStops,
      )}
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        {deal.image ? (
          <>
            <Image
              src={deal.image}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/55 to-black/80" />
          </>
        ) : (
          <div className="absolute inset-0 bg-black/25" />
        )}
      </div>

      <div
        className={cn(
          "relative z-10 flex flex-1 flex-col gap-4",
          compact ? "p-5" : "p-6 sm:p-8",
        )}
      >
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="shrink-0 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
            {deal.badge}
          </span>
          {pct > 0 ? (
            <span className="shrink-0 rounded-full bg-amber-500 px-2.5 py-1 text-[10px] font-bold text-amber-950">
              Save {formatGbp(save)}
            </span>
          ) : null}
        </div>

        <div>
          <p className="text-xs font-semibold text-white/90">
            {deal.flag} {deal.country}
          </p>
          <h3
            className={cn(
              "mt-1 font-display font-black text-white drop-shadow-md",
              compact ? "text-lg" : "text-xl sm:text-2xl",
            )}
          >
            {deal.title}
          </h3>
          {!compact ? (
            <p className="mt-2 text-sm leading-relaxed text-white/90">
              {deal.description}
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-3 text-[11px] font-semibold text-white/90">
          <span className="inline-flex items-center gap-1">
            <Plane className="h-3.5 w-3.5" />
            {deal.flightType}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {deal.nights} Nights
          </span>
          <span className="inline-flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {deal.stars}-Star
          </span>
        </div>

        <div className="mt-auto flex flex-col gap-4 border-t border-white/20 pt-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm text-white/70 line-through">
              {formatGbp(deal.priceWas)}
            </p>
            <p className="font-display text-3xl font-black tracking-tight text-white drop-shadow-sm">
              {formatGbp(deal.priceNow)}
              <span className="ml-1 text-base font-semibold text-white/90">
                / pp
              </span>
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="w-full shrink-0 rounded-xl border-white/40 bg-white/20 text-white shadow-md backdrop-blur-sm hover:bg-white/30 hover:text-white sm:w-auto"
          >
            <Link href="/deals">Book This Deal →</Link>
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
