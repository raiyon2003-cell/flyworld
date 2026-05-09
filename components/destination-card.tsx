"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";

import type { Destination } from "@/lib/types";
import { Button } from "@/components/ui/button";

export function DestinationCard({
  destination,
  index = 0,
}: {
  destination: Destination;
  index?: number;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="group relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-card shadow-xl backdrop-blur-xl dark:border-white/10"
    >
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={destination.image}
          alt={`${destination.city}, ${destination.country}`}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width:768px) 100vw, 400px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-white/75">
              <MapPin className="h-3.5 w-3.5" />
              {destination.country}
            </p>
            <p className="font-display text-3xl font-black text-white">
              {destination.city}
            </p>
          </div>
          <div className="rounded-2xl bg-white/15 px-3 py-2 text-right text-xs font-semibold text-white backdrop-blur-xl">
            <p className="text-[11px] uppercase tracking-wide text-white/70">
              From
            </p>
            <p className="text-lg font-black">${destination.priceFrom}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 p-5">
        <div>
          <p className="text-xs text-muted-foreground">
            Round-trip estimates · Economy
          </p>
          <p className="mt-1 text-sm font-semibold">
            Curated fares refreshed hourly (demo).
          </p>
        </div>
        <Button
          asChild
          variant="premium"
          size="sm"
          className="rounded-xl px-4 shadow-lg"
        >
          <Link href={`/search?from=DXB&to=${slugToAirport(destination.slug)}`}>
            Explore
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </motion.article>
  );
}

function slugToAirport(slug: string): string {
  const map: Record<string, string> = {
    dubai: "DXB",
    london: "LHR",
    paris: "CDG",
    istanbul: "IST",
    "new-york": "JFK",
    tokyo: "NRT",
  };
  return map[slug] ?? "LHR";
}
