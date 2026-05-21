"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Download, Home, Mail } from "lucide-react";

import { formatDuration } from "@/lib/booking";
import type { CompletedBooking } from "@/lib/booking-types";
import { formatGbp } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function ConfirmationStep({
  booking,
  onDownload,
}: {
  booking: CompletedBooking;
  onDownload: () => void;
}) {
  const lead = booking.passengers[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15"
        >
          <CheckCircle2 className="h-12 w-12 text-emerald-500" />
        </motion.div>
        <h2 className="mt-6 font-display text-3xl font-black tracking-tight sm:text-4xl">
          Booking confirmed!
        </h2>
        <p className="mt-3 text-muted-foreground">
          Your reservation is secured. A confirmation has been sent to{" "}
          <span className="font-semibold text-foreground">{lead?.email}</span>.
        </p>
        <p className="mt-4 font-mono text-lg font-bold text-primary">
          {booking.bookingId}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-2xl p-6">
          <p className="text-xs font-bold uppercase text-muted-foreground">Flight</p>
          <p className="mt-2 font-display text-xl font-bold">
            {booking.flight.departAirport} → {booking.flight.arriveAirport}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {booking.flight.airlineName} · {booking.flight.flightNumber} ·{" "}
            {formatDuration(booking.flight.durationMinutes)}
          </p>
          <p className="mt-4 text-sm">
            {booking.flight.departureTime} – {booking.flight.arrivalTime}
          </p>
        </Card>

        <Card className="rounded-2xl p-6">
          <p className="text-xs font-bold uppercase text-muted-foreground">Passengers</p>
          <ul className="mt-3 space-y-2">
            {booking.passengers.map((p, i) => (
              <li key={i} className="text-sm font-medium">
                {p.firstName} {p.lastName}
                <span className="text-muted-foreground"> · {p.nationality}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-border/60 pt-4 font-display text-2xl font-black">
            {formatGbp(booking.pricing.total)}
          </p>
          <p className="text-xs text-muted-foreground">Total paid (incl. taxes & fees)</p>
        </Card>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Button variant="premium" className="rounded-xl gap-2" onClick={onDownload}>
          <Download className="h-4 w-4" />
          Download e-ticket
        </Button>
        <Button variant="outline" className="rounded-xl gap-2" asChild>
          <Link href="/">
            <Home className="h-4 w-4" />
            Return home
          </Link>
        </Button>
      </div>

      <p className="flex items-center justify-center gap-2 text-center text-sm text-muted-foreground">
        <Mail className="h-4 w-4" />
        Confirmation email sent (demo) · Fly World
      </p>
    </motion.div>
  );
}
