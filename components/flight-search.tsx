"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { format, isBefore, startOfDay } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeftRight,
  Loader2,
  Minus,
  Plus,
  Search,
  Users,
} from "lucide-react";

import type { Airport, CabinClass, TripType } from "@/lib/types";
import { AIRPORTS } from "@/data/airports";
import { cn } from "@/lib/utils";
import { AirportCombobox } from "@/components/airport-combobox";
import { DatePickerField } from "@/components/date-picker-field";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function airportByCode(code: string | undefined): Airport | null {
  if (!code) return null;
  return AIRPORTS.find((a) => a.code === code) ?? null;
}

export interface FlightSearchInitialValues {
  trip?: TripType;
  from?: string;
  to?: string;
  depart?: string;
  return?: string;
  pax?: number;
  cabin?: CabinClass;
  multi?: string;
}

interface FlightSearchProps {
  variant?: "hero" | "page";
  className?: string;
  initialValues?: FlightSearchInitialValues;
}

interface MultiLeg {
  id: string;
  from: Airport | null;
  to: Airport | null;
  date?: Date;
}

export function FlightSearch({
  variant = "hero",
  className,
  initialValues,
}: FlightSearchProps) {
  const router = useRouter();
  const [tripType, setTripType] = React.useState<TripType>(
    initialValues?.trip ?? "round-trip",
  );

  const [from, setFrom] = React.useState<Airport | null>(() =>
    airportByCode(initialValues?.from) ??
    airportByCode("DXB"),
  );
  const [to, setTo] = React.useState<Airport | null>(() =>
    airportByCode(initialValues?.to) ??
    airportByCode("LHR"),
  );

  const [departureDate, setDepartureDate] = React.useState<Date | undefined>(
    () =>
      initialValues?.depart ? new Date(initialValues.depart) : addDays(new Date(), 14),
  );
  const [returnDate, setReturnDate] = React.useState<Date | undefined>(() =>
    initialValues?.return ? new Date(initialValues.return) : addDays(new Date(), 21),
  );

  const [travelers, setTravelers] = React.useState(initialValues?.pax ?? 2);
  const [cabin, setCabin] = React.useState<CabinClass>(
    initialValues?.cabin ?? "economy",
  );

  const [multiLegs, setMultiLegs] = React.useState<MultiLeg[]>(() => {
    if (initialValues?.multi) {
      try {
        const parsed = JSON.parse(initialValues.multi) as Array<{
          from?: string;
          to?: string;
          d?: string;
        }>;
        return parsed.map((row, index) => ({
          id: `seg-${index}`,
          from: airportByCode(row.from),
          to: airportByCode(row.to),
          date: row.d ? new Date(row.d) : undefined,
        }));
      } catch {
        // fall through
      }
    }
    return [
      {
        id: "seg-0",
        from: airportByCode("DXB"),
        to: airportByCode("IST"),
        date: addDays(new Date(), 10),
      },
      {
        id: "seg-1",
        from: airportByCode("IST"),
        to: airportByCode("CDG"),
        date: addDays(new Date(), 17),
      },
    ];
  });

  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  function swapDestinations() {
    const prevFrom = from;
    setFrom(to);
    setTo(prevFrom);
  }

  function updateLeg(id: string, patch: Partial<MultiLeg>) {
    setMultiLegs((prev) =>
      prev.map((leg) => (leg.id === id ? { ...leg, ...patch } : leg)),
    );
  }

  function addLeg() {
    setMultiLegs((prev) => {
      const nextIndex =
        prev.reduce((max, leg) => {
          const n = Number.parseInt(leg.id.replace("seg-", ""), 10);
          return Number.isFinite(n) ? Math.max(max, n) : max;
        }, -1) + 1;
      return [
        ...prev,
        {
          id: `seg-${nextIndex}`,
          from: prev[prev.length - 1]?.to ?? airportByCode("CDG"),
          to: airportByCode("NRT"),
          date: addDays(prev[prev.length - 1]?.date ?? new Date(), 7),
        },
      ];
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (tripType !== "multi-city") {
      if (!from || !to) {
        setError("Please choose both origin and destination airports.");
        return;
      }
      if (from.code === to.code) {
        setError("Origin and destination must be different.");
        return;
      }
      if (!departureDate) {
        setError("Please select a departure date.");
        return;
      }
      if (tripType === "round-trip") {
        if (!returnDate) {
          setError("Please select a return date.");
          return;
        }
        if (returnDate < departureDate) {
          setError("Return date must be on or after departure.");
          return;
        }
      }
    } else {
      for (const leg of multiLegs) {
        if (!leg.from || !leg.to || !leg.date) {
          setError("Each multi-city segment needs airports and a date.");
          return;
        }
        if (leg.from.code === leg.to.code) {
          setError("Segment airports must be different.");
          return;
        }
      }
    }

    const params = new URLSearchParams();
    params.set("trip", tripType);
    params.set("pax", String(travelers));
    params.set("cabin", cabin);

    if (tripType === "multi-city") {
      params.set(
        "multi",
        JSON.stringify(
          multiLegs.map((leg) => ({
            from: leg.from?.code,
            to: leg.to?.code,
            d: leg.date ? format(leg.date, "yyyy-MM-dd") : "",
          })),
        ),
      );
      const first = multiLegs[0];
      if (first?.from && first?.to && first.date) {
        params.set("from", first.from.code);
        params.set("to", first.to.code);
        params.set("depart", format(first.date, "yyyy-MM-dd"));
      }
    } else {
      params.set("from", from!.code);
      params.set("to", to!.code);
      params.set("depart", format(departureDate!, "yyyy-MM-dd"));
      if (tripType === "round-trip" && returnDate) {
        params.set("return", format(returnDate, "yyyy-MM-dd"));
      }
    }

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 420));
    router.push(`/search?${params.toString()}`);
    setSubmitting(false);
  }

  const padClass =
    variant === "hero"
      ? "p-6 sm:p-8 md:p-10"
      : "p-5 sm:p-7 md:p-9";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={cn("relative mx-auto w-full max-w-6xl", className)}
    >
      <div className="pointer-events-none absolute -inset-8 rounded-[2rem] bg-gradient-to-r from-primary/25 via-transparent to-accent/25 blur-3xl" />

      <div className={cn("glass-card relative rounded-[2rem]", padClass)}>
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="glass" className="rounded-full px-3 py-1">
                Intelligent routing
              </Badge>
              <Badge variant="secondary" className="rounded-full px-3 py-1">
                Glass UI · Live-ready frontend
              </Badge>
            </div>
            <h3 className="mt-3 font-display text-2xl font-bold md:text-3xl">
              Where would you like to fly next?
            </h3>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Powerful filters, polished calendars, and cinematic motion —
              optimized for desktop and mobile travelers alike.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 md:justify-end">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 rounded-xl bg-background/60 backdrop-blur"
                >
                  <Users className="mr-2 h-4 w-4 text-primary" />
                  {travelers} traveler{travelers > 1 ? "s" : ""}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72 rounded-2xl p-4" align="end">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">Travelers</p>
                    <p className="text-xs text-muted-foreground">
                      Adults 18–64 (demo counter)
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="rounded-xl"
                      disabled={travelers <= 1}
                      onClick={() =>
                        setTravelers((n) => Math.max(1, n - 1))
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-6 text-center text-sm font-bold">
                      {travelers}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="rounded-xl"
                      disabled={travelers >= 9}
                      onClick={() =>
                        setTravelers((n) => Math.min(9, n + 1))
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Select
              value={cabin}
              onValueChange={(v) => setCabin(v as CabinClass)}
            >
              <SelectTrigger className="h-11 w-[180px] rounded-xl bg-background/60 backdrop-blur">
                <SelectValue placeholder="Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="economy">Economy</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="first">First Class</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs
          value={tripType}
          onValueChange={(v) => setTripType(v as TripType)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 rounded-2xl bg-muted/70 dark:bg-muted/40">
            <TabsTrigger value="round-trip" className="rounded-xl">
              Round trip
            </TabsTrigger>
            <TabsTrigger value="one-way" className="rounded-xl">
              One way
            </TabsTrigger>
            <TabsTrigger value="multi-city" className="rounded-xl">
              Multi-city
            </TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <TabsContent value="round-trip" className="mt-0 space-y-6">
              <ClassicRouteFields
                from={from}
                to={to}
                swap={swapDestinations}
                setFrom={setFrom}
                setTo={setTo}
                departureDate={departureDate}
                setDepartureDate={setDepartureDate}
                returnDate={returnDate}
                setReturnDate={setReturnDate}
                showReturn
              />
            </TabsContent>

            <TabsContent value="one-way" className="mt-0 space-y-6">
              <ClassicRouteFields
                from={from}
                to={to}
                swap={swapDestinations}
                setFrom={setFrom}
                setTo={setTo}
                departureDate={departureDate}
                setDepartureDate={setDepartureDate}
                returnDate={returnDate}
                setReturnDate={setReturnDate}
                showReturn={false}
              />
            </TabsContent>

            <TabsContent value="multi-city" className="mt-0 space-y-6">
              <AnimatePresence initial={false}>
                {multiLegs.map((leg, idx) => (
                  <motion.div
                    key={leg.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35 }}
                    className="rounded-2xl border border-white/10 bg-background/40 p-4 backdrop-blur-md dark:bg-background/25"
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                        Segment {idx + 1}
                      </p>
                      {multiLegs.length > 2 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="rounded-xl text-xs"
                          onClick={() =>
                            setMultiLegs((prev) =>
                              prev.filter((l) => l.id !== leg.id),
                            )
                          }
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                    <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto] lg:items-end">
                      <AirportCombobox
                        label="From"
                        value={leg.from}
                        onChange={(a) => updateLeg(leg.id, { from: a })}
                      />
                      <div className="hidden lg:block" />
                      <AirportCombobox
                        label="To"
                        value={leg.to}
                        onChange={(a) => updateLeg(leg.id, { to: a })}
                      />
                      <DatePickerField
                        label="Date"
                        date={leg.date}
                        onChange={(d) => updateLeg(leg.id, { date: d })}
                        disabled={(date) =>
                          isBefore(date, startOfDay(new Date()))
                        }
                      />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <div className="flex flex-wrap gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-xl"
                  onClick={addLeg}
                  disabled={multiLegs.length >= 4}
                >
                  Add another city
                </Button>
                <p className="text-xs text-muted-foreground">
                  Up to four segments — perfect for open-jaw adventures.
                </p>
              </div>
            </TabsContent>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <div className="flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground">
                * Displayed fares are illustrative mock data for this frontend demo.
              </p>
              <Button
                type="submit"
                variant="premium"
                size="lg"
                disabled={submitting}
                className="rounded-2xl px-10 text-base shadow-xl"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Searching…
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-5 w-5" />
                    Search flights
                  </>
                )}
              </Button>
            </div>
          </form>
        </Tabs>
      </div>
    </motion.div>
  );
}

function ClassicRouteFields({
  from,
  to,
  swap,
  setFrom,
  setTo,
  departureDate,
  setDepartureDate,
  returnDate,
  setReturnDate,
  showReturn,
}: {
  from: Airport | null;
  to: Airport | null;
  swap: () => void;
  setFrom: (a: Airport | null) => void;
  setTo: (a: Airport | null) => void;
  departureDate?: Date;
  setDepartureDate: (d: Date | undefined) => void;
  returnDate?: Date;
  setReturnDate: (d: Date | undefined) => void;
  showReturn: boolean;
}) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-end">
        <AirportCombobox label="From" value={from} onChange={setFrom} />
        <div className="flex justify-center lg:pb-1">
          <Button
            type="button"
            size="icon"
            variant="outline"
            aria-label="Swap departure and arrival airports"
            className="h-12 w-12 rounded-2xl border-white/20 bg-background/60 shadow-inner backdrop-blur hover:bg-accent"
            onClick={swap}
          >
            <ArrowLeftRight className="h-5 w-5" />
          </Button>
        </div>
        <AirportCombobox label="To" value={to} onChange={setTo} />
      </div>

      <div
        className={cn(
          "grid gap-4",
          showReturn ? "md:grid-cols-2" : "md:grid-cols-1",
        )}
      >
        <DatePickerField
          label="Departure date"
          date={departureDate}
          onChange={setDepartureDate}
          disabled={(date) => isBefore(date, startOfDay(new Date()))}
        />
        {showReturn && (
          <DatePickerField
            label="Return date"
            date={returnDate}
            onChange={setReturnDate}
            disabled={(date) =>
              isBefore(
                date,
                startOfDay(departureDate ?? new Date()),
              )
            }
          />
        )}
      </div>
    </div>
  );
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}
