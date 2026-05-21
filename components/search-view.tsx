"use client";

import * as React from "react";

import type { BookingSearchContext } from "@/lib/booking-types";
import type { CabinClass, TripType } from "@/lib/types";
import { generateMockFlights } from "@/data/flights";
import { FlightResults } from "@/components/flight-results";
import { FlightSearch, type FlightSearchInitialValues } from "@/components/flight-search";

function pickParam(
  value: string | string[] | undefined,
): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

function parseTrip(value?: string): TripType {
  if (value === "one-way" || value === "multi-city") return value;
  return "round-trip";
}

function parseCabin(value?: string): CabinClass | undefined {
  if (value === "economy" || value === "business" || value === "first") {
    return value;
  }
  return undefined;
}

export function SearchView({
  params,
}: {
  params: Record<string, string | string[] | undefined>;
}) {
  const serialized = React.useMemo(() => JSON.stringify(params), [params]);

  const initialValues = React.useMemo<FlightSearchInitialValues>(() => {
    const paxRaw = pickParam(params.pax);
    const pax = paxRaw ? Number.parseInt(paxRaw, 10) : undefined;

    return {
      trip: parseTrip(pickParam(params.trip)),
      from: pickParam(params.from),
      to: pickParam(params.to),
      depart: pickParam(params.depart),
      return: pickParam(params.return),
      pax: Number.isFinite(pax) ? pax : undefined,
      cabin: parseCabin(pickParam(params.cabin)),
      multi: pickParam(params.multi),
    };
  }, [params]);

  const searchContext = React.useMemo<BookingSearchContext>(() => {
    const paxRaw = pickParam(params.pax);
    const pax = paxRaw ? Number.parseInt(paxRaw, 10) : 1;
    return {
      from: pickParam(params.from),
      to: pickParam(params.to),
      depart: pickParam(params.depart),
      return: pickParam(params.return),
      trip: parseTrip(pickParam(params.trip)),
      cabin: parseCabin(pickParam(params.cabin)),
      pax: Number.isFinite(pax) && pax > 0 ? Math.min(9, pax) : 1,
      seed: serialized,
    };
  }, [params, serialized]);

  const flights = React.useMemo(() => {
    return generateMockFlights({
      from: searchContext.from,
      to: searchContext.to,
      seed: searchContext.seed,
    });
  }, [searchContext]);

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    const handle = window.setTimeout(() => setLoading(false), 780);
    return () => window.clearTimeout(handle);
  }, [serialized]);

  return (
    <div className="relative isolate overflow-hidden pb-24 pt-10">
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-60" />
      <div className="pointer-events-none absolute -left-32 top-40 h-72 w-72 rounded-full bg-primary/25 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-accent/25 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-primary">
            FlyWorld Search
          </p>
          <h1 className="mt-4 font-display text-4xl font-black tracking-tight md:text-5xl">
            Craft your itinerary with confidence
          </h1>
          <p className="mt-4 text-muted-foreground">
            Adjust routes, dates, and cabins — results refresh below with cinematic
            skeleton states while we “scan” mock inventories.
          </p>
        </header>

        <FlightSearch
          key={serialized}
          variant="page"
          initialValues={initialValues}
        />

        <FlightResults
          flights={flights}
          loading={loading}
          searchContext={searchContext}
        />
      </div>
    </div>
  );
}
