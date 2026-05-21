"use client";

import { ArrowRight, Briefcase, Clock } from "lucide-react";

import { formatGbp } from "@/lib/format";
import { formatDuration } from "@/lib/booking";
import type { BookingSearchContext } from "@/lib/booking-types";
import type { MockFlight } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

function stopsLabel(stops: number): string {
  if (stops <= 0) return "Nonstop";
  if (stops === 1) return "1 stop";
  return `${stops} stops`;
}

export function FlightReviewStep({
  flight,
  search,
  onContinue,
}: {
  flight: MockFlight;
  search: BookingSearchContext;
  onContinue: () => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          Review your flight
        </h2>
        <p className="mt-2 text-muted-foreground">
          Confirm itinerary details before entering passenger information.
        </p>
      </div>

      <Card className="overflow-hidden rounded-2xl border-white/10 shadow-xl">
        <div className="bg-gradient-to-r from-primary/90 via-primary to-accent/90 px-6 py-4 text-primary-foreground">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-sm font-black">
                {flight.airlineCode}
              </div>
              <div>
                <p className="font-display text-lg font-bold">{flight.airlineName}</p>
                <p className="text-sm text-white/80">{flight.flightNumber}</p>
              </div>
            </div>
            <Badge className="bg-white/20 text-white hover:bg-white/25">
              {search.cabin ?? "Economy"}
            </Badge>
          </div>
        </div>

        <div className="space-y-6 p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-8">
            <div>
              <p className="text-3xl font-bold">{flight.departureTime}</p>
              <p className="text-sm font-semibold text-muted-foreground">
                {flight.departAirport}
              </p>
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <span className="flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {formatDuration(flight.durationMinutes)}
              </span>
              <ArrowRight className="h-5 w-5 text-primary" />
              <Badge variant="secondary">{stopsLabel(flight.stops)}</Badge>
            </div>
            <div>
              <p className="text-3xl font-bold">{flight.arrivalTime}</p>
              <p className="text-sm font-semibold text-muted-foreground">
                {flight.arriveAirport}
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border/60 bg-muted/25 p-4">
              <p className="flex items-center gap-2 text-xs font-bold uppercase text-muted-foreground">
                <Briefcase className="h-4 w-4" />
                Baggage
              </p>
              <p className="mt-2 text-sm font-medium">{flight.baggage}</p>
            </div>
            <div className="rounded-xl border border-border/60 bg-muted/25 p-4">
              <p className="text-xs font-bold uppercase text-muted-foreground">
                Fare rules
              </p>
              <p className="mt-2 text-sm font-medium">
                {flight.refundable ? "Refundable fare" : "Non-refundable fare"} ·
                Demo booking
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-4 border-t border-border/60 pt-6">
            <div>
              <p className="text-sm text-muted-foreground">Total per booking</p>
              <p className="font-display text-4xl font-black">
                {formatGbp(flight.priceGbp * search.pax)}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatGbp(flight.priceGbp)} × {search.pax} passenger
                {search.pax > 1 ? "s" : ""} (before extras)
              </p>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button variant="premium" size="lg" className="rounded-xl px-10" onClick={onContinue}>
          Continue to passengers
        </Button>
      </div>
    </div>
  );
}
