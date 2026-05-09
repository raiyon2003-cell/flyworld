"use client";

import { motion } from "framer-motion";
import { ArrowRight, Briefcase, ShieldCheck } from "lucide-react";

import type { MockFlight } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m.toString().padStart(2, "0")}m`;
}

function stopsLabel(stops: number): string {
  if (stops <= 0) return "Nonstop";
  if (stops === 1) return "1 stop";
  return `${stops} stops`;
}

export function FlightCard({
  flight,
  index = 0,
}: {
  flight: MockFlight;
  index?: number;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-card/90 via-card/70 to-card/40 p-5 shadow-lg backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:shadow-2xl dark:border-white/10 dark:from-card/70 dark:via-card/50 dark:to-card/30",
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-60 transition-opacity group-hover:opacity-90">
        <div className="absolute -right-16 top-0 h-40 w-40 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -left-10 bottom-0 h-36 w-36 rounded-full bg-accent/15 blur-3xl" />
      </div>

      <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-lg font-black text-primary-foreground shadow-md"
              aria-hidden
            >
              {flight.airlineCode}
            </div>
            <div>
              <p className="font-display text-lg font-bold leading-tight">
                {flight.airlineName}
              </p>
              <p className="text-xs font-medium text-muted-foreground">
                {flight.flightNumber}
              </p>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-6">
              <div>
                <p className="text-2xl font-bold tracking-tight">
                  {flight.departureTime}
                </p>
                <p className="text-xs font-semibold text-muted-foreground">
                  {flight.departAirport}
                </p>
              </div>
              <div className="flex flex-col items-center gap-1 px-2">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {formatDuration(flight.durationMinutes)}
                </span>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="h-px w-10 bg-gradient-to-r from-transparent via-primary/60 to-transparent sm:w-16" />
                  <ArrowRight className="h-4 w-4 text-primary" />
                  <span className="h-px w-10 bg-gradient-to-r from-transparent via-primary/60 to-transparent sm:w-16" />
                </div>
                <Badge variant="glass" className="text-[11px]">
                  {stopsLabel(flight.stops)}
                </Badge>
              </div>
              <div>
                <p className="text-2xl font-bold tracking-tight">
                  {flight.arrivalTime}
                </p>
                <p className="text-xs font-semibold text-muted-foreground">
                  {flight.arriveAirport}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col gap-3 border-t border-white/10 pt-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0 lg:w-56">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="gap-1">
              <Briefcase className="h-3 w-3" />
              Baggage
            </Badge>
            <Badge variant={flight.refundable ? "default" : "outline"}>
              {flight.refundable ? "Refundable" : "Non-refundable"}
            </Badge>
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">
            {flight.baggage}
          </p>
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-xs text-muted-foreground">Total from</p>
              <p className="font-display text-3xl font-black tracking-tight">
                ${flight.priceUsd}
              </p>
              <p className="text-[11px] text-muted-foreground">USD · incl. taxes*</p>
            </div>
            <Button variant="premium" className="rounded-xl shadow-lg">
              Book now
            </Button>
          </div>
          <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            FlyWorld Price Lock™ on select fares
          </p>
        </div>
      </div>
    </motion.article>
  );
}
