"use client";

import { Check } from "lucide-react";

import { BOOKING_STEPS } from "@/lib/booking";
import type { BookingStep } from "@/lib/booking-types";
import { cn } from "@/lib/utils";

export function BookingStepper({ current }: { current: BookingStep }) {
  return (
    <nav aria-label="Booking progress" className="w-full">
      <ol className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {BOOKING_STEPS.map(({ step, label }, index) => {
          const done = current > step;
          const active = current === step;
          return (
            <li
              key={step}
              className={cn(
                "flex flex-1 items-center gap-3",
                index < BOOKING_STEPS.length - 1 &&
                  "sm:after:mx-2 sm:after:h-px sm:after:flex-1 sm:after:bg-border/80 sm:after:content-['']",
              )}
            >
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors",
                  done && "bg-primary text-primary-foreground",
                  active && "bg-accent text-accent-foreground ring-2 ring-accent/30",
                  !done && !active && "bg-muted text-muted-foreground",
                )}
              >
                {done ? <Check className="h-4 w-4" /> : step}
              </span>
              <span
                className={cn(
                  "text-sm font-semibold",
                  active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
