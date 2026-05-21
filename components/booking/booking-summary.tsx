"use client";

import { Lock, Plane, ShieldCheck } from "lucide-react";

import { formatGbp } from "@/lib/format";
import type { BookingExtras, BookingSearchContext, PriceBreakdown } from "@/lib/booking-types";
import type { MockFlight } from "@/lib/types";
import { formatDuration } from "@/lib/booking";
import { Card } from "@/components/ui/card";

export function BookingSummary({
  flight,
  search,
  pricing,
  extras,
}: {
  flight: MockFlight;
  search: BookingSearchContext;
  pricing: PriceBreakdown;
  extras: BookingExtras;
}) {
  return (
    <Card className="glass-card sticky top-24 space-y-5 rounded-2xl p-5 lg:top-28">
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
          Price summary
        </p>
        <p className="mt-1 font-display text-2xl font-black">
          {formatGbp(pricing.total)}
        </p>
        <p className="text-xs text-muted-foreground">
          {search.pax} passenger{search.pax > 1 ? "s" : ""} · GBP incl. taxes*
        </p>
      </div>

      <div className="space-y-2 rounded-xl border border-border/60 bg-muted/30 p-3 text-sm">
        <div className="flex items-start gap-2">
          <Plane className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <div>
            <p className="font-semibold">
              {flight.departAirport} → {flight.arriveAirport}
            </p>
            <p className="text-xs text-muted-foreground">
              {flight.airlineName} · {formatDuration(flight.durationMinutes)}
            </p>
          </div>
        </div>
      </div>

      <dl className="space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Base fare</dt>
          <dd className="font-semibold">{formatGbp(pricing.baseFare)}</dd>
        </div>
        {pricing.extrasTotal > 0 ? (
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Extras</dt>
            <dd className="font-semibold">{formatGbp(pricing.extrasTotal)}</dd>
          </div>
        ) : null}
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Taxes & fees</dt>
          <dd className="font-semibold">
            {formatGbp(pricing.taxes + pricing.bookingFee)}
          </dd>
        </div>
        <div className="flex justify-between border-t border-border/60 pt-2 font-bold">
          <dt>Total</dt>
          <dd className="font-display text-lg">{formatGbp(pricing.total)}</dd>
        </div>
      </dl>

      {(extras.travelInsurance || extras.extraBaggage) && (
        <ul className="space-y-1 text-xs text-muted-foreground">
          {extras.extraBaggage && <li>· Extra baggage selected</li>}
          {extras.seatSelection && <li>· Seat selection</li>}
          {extras.travelInsurance && <li>· Travel insurance</li>}
          {extras.mealPreference !== "standard" && (
            <li>· Meal: {extras.mealPreference}</li>
          )}
        </ul>
      )}

      <div className="flex flex-wrap gap-2 border-t border-border/60 pt-4 text-[11px] font-semibold text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <Lock className="h-3.5 w-3.5 text-primary" />
          SSL secured
        </span>
        <span className="inline-flex items-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          ATOL protected*
        </span>
      </div>
    </Card>
  );
}
