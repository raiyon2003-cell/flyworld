"use client";

import * as React from "react";
import { Filter, SlidersHorizontal, Sparkles, Zap } from "lucide-react";

import type { BookingSearchContext } from "@/lib/booking-types";
import type { MockFlight } from "@/lib/types";
import { formatGbp } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Skeleton } from "@/components/ui/skeleton";
import { FlightCard } from "@/components/flight-card";

type SortMode = "cheapest" | "fastest" | "best";

function parseClock(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h + (m || 0) / 60;
}

function timeBucket(hour: number): "morning" | "afternoon" | "evening" {
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
}

export function FlightResultsSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <Card key={i} className="overflow-hidden rounded-2xl border-white/10 p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-1 gap-4">
              <Skeleton className="h-14 w-14 rounded-2xl" />
              <div className="flex flex-1 flex-col gap-3">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-10 w-full max-w-md" />
              </div>
            </div>
            <Skeleton className="h-24 w-full rounded-xl lg:w-48" />
          </div>
        </Card>
      ))}
    </div>
  );
}

export function FlightResults({
  flights,
  loading,
  searchContext,
}: {
  flights: MockFlight[];
  loading?: boolean;
  searchContext?: BookingSearchContext;
}) {
  const [sortBy, setSortBy] = React.useState<SortMode>("best");

  const bounds = React.useMemo(() => {
    if (!flights.length) return { min: 0, max: 1000 };
    const prices = flights.map((f) => f.priceGbp);
    const rawMin = Math.min(...prices);
    const rawMax = Math.max(...prices);
    const max = rawMax <= rawMin ? rawMin + 120 : rawMax;
    return { min: rawMin, max };
  }, [flights]);

  const [priceRange, setPriceRange] = React.useState<[number, number]>([
    bounds.min,
    bounds.max,
  ]);

  React.useEffect(() => {
    setPriceRange([bounds.min, bounds.max]);
  }, [bounds.min, bounds.max]);

  const airlines = React.useMemo(() => {
    const names = Array.from(new Set(flights.map((f) => f.airlineName))).sort();
    return names;
  }, [flights]);

  /** Airlines explicitly unchecked by the user */
  const [blockedAirlines, setBlockedAirlines] = React.useState<Set<string>>(
    () => new Set(),
  );

  React.useEffect(() => {
    setBlockedAirlines((prev) => {
      const next = new Set<string>();
      prev.forEach((name) => {
        if (airlines.includes(name)) next.add(name);
      });
      return next;
    });
  }, [airlines]);

  const [stopsFilter, setStopsFilter] = React.useState<string>("any");
  const [departDaypart, setDepartDaypart] = React.useState<string>("any");
  const [arriveDaypart, setArriveDaypart] = React.useState<string>("any");

  const filtered = React.useMemo(() => {
    return flights.filter((f) => {
      if (f.priceGbp < priceRange[0] || f.priceGbp > priceRange[1]) return false;
      if (blockedAirlines.has(f.airlineName)) return false;
      if (stopsFilter === "nonstop" && f.stops !== 0) return false;
      if (stopsFilter === "one" && f.stops !== 1) return false;
      if (stopsFilter === "two" && f.stops < 2) return false;

      if (departDaypart !== "any") {
        const b = timeBucket(parseClock(f.departureTime));
        if (b !== departDaypart) return false;
      }
      if (arriveDaypart !== "any") {
        const b = timeBucket(parseClock(f.arrivalTime));
        if (b !== arriveDaypart) return false;
      }
      return true;
    });
  }, [
    flights,
    priceRange,
    blockedAirlines,
    stopsFilter,
    departDaypart,
    arriveDaypart,
  ]);

  const sorted = React.useMemo(() => {
    const copy = [...filtered];
    if (sortBy === "cheapest") copy.sort((a, b) => a.priceGbp - b.priceGbp);
    else if (sortBy === "fastest")
      copy.sort((a, b) => a.durationMinutes - b.durationMinutes);
    else copy.sort((a, b) => b.score - a.score);
    return copy;
  }, [filtered, sortBy]);

  const toggleAirline = (name: string) => {
    setBlockedAirlines((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-card/60 px-3 py-1 text-xs font-semibold text-muted-foreground backdrop-blur-md dark:border-white/10">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Smart fare ranking tuned for value & comfort
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Flight results
          </h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Transparent totals, realistic schedules, and polished filters — this
            is a premium frontend mock inspired by leading OTAs.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-card/50 p-2 backdrop-blur-xl dark:border-white/10">
          {(
            [
              ["best", "Best", Sparkles],
              ["cheapest", "Cheapest", SlidersHorizontal],
              ["fastest", "Fastest", Zap],
            ] as const
          ).map(([key, label, Icon]) => (
            <Button
              key={key}
              type="button"
              variant={sortBy === key ? "default" : "ghost"}
              className={cn(
                "rounded-xl",
                sortBy === key && "shadow-md",
              )}
              onClick={() => setSortBy(key)}
            >
              <Icon className="mr-2 h-4 w-4" />
              {label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-6">
          <Card className="glass-card sticky top-24 space-y-6 rounded-2xl p-5">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-primary" />
              <p className="font-display text-lg font-bold">Filters</p>
            </div>

            <div className="space-y-3">
              <Label className="text-xs uppercase text-muted-foreground">
                Price range (GBP)
              </Label>
              <Slider
                min={bounds.min}
                max={bounds.max}
                step={10}
                value={priceRange}
                onValueChange={(v) => setPriceRange(v as [number, number])}
                disabled={loading || !flights.length}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatGbp(priceRange[0], { compact: true })}</span>
                <span>{formatGbp(priceRange[1], { compact: true })}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs uppercase text-muted-foreground">
                Airlines
              </Label>
              <div className="space-y-2">
                {airlines.map((name) => (
                  <label
                    key={name}
                    className="flex cursor-pointer items-center gap-2 rounded-xl border border-transparent px-2 py-2 text-sm hover:bg-muted/60"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-input accent-primary"
                      checked={!blockedAirlines.has(name)}
                      onChange={() => toggleAirline(name)}
                    />
                    <span className="flex-1 truncate">{name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs uppercase text-muted-foreground">
                Stops
              </Label>
              <Select value={stopsFilter} onValueChange={setStopsFilter}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Any stops" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any stops</SelectItem>
                  <SelectItem value="nonstop">Nonstop only</SelectItem>
                  <SelectItem value="one">1 stop</SelectItem>
                  <SelectItem value="two">2+ stops</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs uppercase text-muted-foreground">
                Departure time
              </Label>
              <Select value={departDaypart} onValueChange={setDepartDaypart}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any time</SelectItem>
                  <SelectItem value="morning">Morning</SelectItem>
                  <SelectItem value="afternoon">Afternoon</SelectItem>
                  <SelectItem value="evening">Evening</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs uppercase text-muted-foreground">
                Arrival time
              </Label>
              <Select value={arriveDaypart} onValueChange={setArriveDaypart}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any time</SelectItem>
                  <SelectItem value="morning">Morning</SelectItem>
                  <SelectItem value="afternoon">Afternoon</SelectItem>
                  <SelectItem value="evening">Evening</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full rounded-xl"
              onClick={() => {
                setStopsFilter("any");
                setDepartDaypart("any");
                setArriveDaypart("any");
                setPriceRange([bounds.min, bounds.max]);
                setBlockedAirlines(new Set());
              }}
            >
              Reset filters
            </Button>
          </Card>
        </aside>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              {loading
                ? "Scanning live inventories…"
                : `${sorted.length} flights · Mock dataset`}
            </p>
            {!loading && sorted.length > 0 && (
              <Badge variant="glass">
                Sorted by{" "}
                {sortBy === "best"
                  ? "FlyWorld Best"
                  : sortBy === "cheapest"
                    ? "price"
                    : "duration"}
              </Badge>
            )}
          </div>

          {loading ? (
            <FlightResultsSkeleton />
          ) : sorted.length === 0 ? (
            <Card className="rounded-2xl border-dashed p-10 text-center">
              <p className="font-display text-xl font-semibold">
                No flights match these filters
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try widening the price range or including more airlines.
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {sorted.map((f, i) => (
                <FlightCard
                  key={f.id}
                  flight={f}
                  index={i}
                  searchContext={searchContext}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
