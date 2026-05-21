"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import {
  calculatePricing,
  createEmptyPassengers,
  generateBookingId,
  parseSearchContext,
  resolveBookingFlight,
  saveCompletedBooking,
  validatePassengers,
  validatePayment,
} from "@/lib/booking";
import {
  DEFAULT_EXTRAS,
  DEFAULT_PAYMENT,
  type BookingExtras,
  type BookingSearchContext,
  type BookingStep,
  type CompletedBooking,
  type PassengerDetails,
  type PaymentDetails,
} from "@/lib/booking-types";
import type { MockFlight } from "@/lib/types";
import { BookingStepper } from "@/components/booking/booking-stepper";
import { BookingSummary } from "@/components/booking/booking-summary";
import { ConfirmationStep } from "@/components/booking/steps/confirmation";
import { ExtrasStep } from "@/components/booking/steps/extras";
import { FlightReviewStep } from "@/components/booking/steps/flight-review";
import { PassengersStep } from "@/components/booking/steps/passengers";
import { PaymentStep } from "@/components/booking/steps/payment";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

function buildTicketText(booking: CompletedBooking): string {
  const lines = [
    "FLY WORLD — E-TICKET (DEMO)",
    "============================",
    `Booking ID: ${booking.bookingId}`,
    `Confirmed: ${new Date(booking.confirmedAt).toLocaleString("en-GB")}`,
    "",
    "FLIGHT",
    `${booking.flight.airlineName} ${booking.flight.flightNumber}`,
    `${booking.flight.departAirport} → ${booking.flight.arriveAirport}`,
    `${booking.flight.departureTime} - ${booking.flight.arrivalTime}`,
    "",
    "PASSENGERS",
    ...booking.passengers.map(
      (p, i) =>
        `${i + 1}. ${p.firstName} ${p.lastName} · Passport ${p.passportNumber}`,
    ),
    "",
    `TOTAL: £${booking.pricing.total}`,
    "",
    "This is a demonstration ticket. Not valid for travel.",
  ];
  return lines.join("\n");
}

export function BookingWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = React.useMemo(() => {
    const o: Record<string, string> = {};
    searchParams.forEach((v, k) => {
      o[k] = v;
    });
    return o;
  }, [searchParams]);

  const flightId = params.flightId;
  const search = React.useMemo(
    () => parseSearchContext(params as Record<string, string | undefined>),
    [params],
  );

  const [flight, setFlight] = React.useState<MockFlight | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [step, setStep] = React.useState<BookingStep>(1);
  const [passengers, setPassengers] = React.useState<PassengerDetails[]>(() =>
    createEmptyPassengers(search.pax),
  );
  const [extras, setExtras] = React.useState<BookingExtras>(DEFAULT_EXTRAS);
  const [payment, setPayment] = React.useState<PaymentDetails>(DEFAULT_PAYMENT);
  const [passengerErrors, setPassengerErrors] = React.useState<
    Record<string, string>
  >({});
  const [paymentErrors, setPaymentErrors] = React.useState<Record<string, string>>(
    {},
  );
  const [processing, setProcessing] = React.useState(false);
  const [completed, setCompleted] = React.useState<CompletedBooking | null>(null);

  React.useEffect(() => {
    if (!flightId) {
      setLoading(false);
      return;
    }
    const resolved = resolveBookingFlight(flightId, search);
    setFlight(resolved);
    setLoading(false);
  }, [flightId, search]);

  React.useEffect(() => {
    setPassengers(createEmptyPassengers(search.pax));
  }, [search.pax]);

  const pricing = React.useMemo(() => {
    if (!flight) return null;
    return calculatePricing(flight, search.pax, extras);
  }, [flight, search.pax, extras]);

  const updatePassenger = (
    index: number,
    field: keyof PassengerDetails,
    value: string,
  ) => {
    setPassengers((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const updateExtras = <K extends keyof BookingExtras>(
    key: K,
    value: BookingExtras[K],
  ) => {
    setExtras((prev) => ({ ...prev, [key]: value }));
  };

  const handlePay = async () => {
    const errs = validatePayment(payment, payment.method);
    setPaymentErrors(errs);
    if (Object.keys(errs).length > 0 || !flight || !pricing) return;

    setProcessing(true);
    await new Promise((r) => setTimeout(r, 2200));

    const booking: CompletedBooking = {
      bookingId: generateBookingId(),
      confirmedAt: new Date().toISOString(),
      flight,
      search,
      passengers,
      extras,
      payment,
      pricing,
    };
    saveCompletedBooking(booking);
    setCompleted(booking);
    setStep(5);
    setProcessing(false);
  };

  const handleDownload = () => {
    if (!completed) return;
    const blob = new Blob([buildTicketText(completed)], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${completed.bookingId}-eticket.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl space-y-6 px-4 py-16">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-48 w-full rounded-2xl" />
        <Skeleton className="h-96 w-full rounded-2xl" />
      </div>
    );
  }

  if (!flightId || !flight) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-bold">Flight not found</h1>
        <p className="mt-3 text-muted-foreground">
          Start a new search and select a flight to book.
        </p>
        <Button asChild variant="premium" className="mt-8 rounded-xl">
          <Link href="/search">Search flights</Link>
        </Button>
      </div>
    );
  }

  const showSidebar = step < 5 && pricing;

  return (
    <div className="relative isolate min-h-[70vh] pb-24 pt-8 sm:pt-12">
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-40" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {step < 5 ? (
          <Button
            variant="ghost"
            className="mb-6 rounded-xl"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to results
          </Button>
        ) : null}

        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Secure checkout
          </p>
          <h1 className="mt-2 font-display text-3xl font-black tracking-tight md:text-4xl">
            Complete your booking
          </h1>
        </div>

        {step < 5 ? <BookingStepper current={step} /> : null}

        <div className={showSidebar ? "mt-10 grid gap-10 lg:grid-cols-[1fr_320px]" : "mt-10"}>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.3 }}
            >
              {step === 1 && (
                <FlightReviewStep
                  flight={flight}
                  search={search}
                  onContinue={() => setStep(2)}
                />
              )}
              {step === 2 && (
                <PassengersStep
                  passengers={passengers}
                  errors={passengerErrors}
                  onChange={updatePassenger}
                  onBack={() => setStep(1)}
                  onContinue={() => {
                    const errs = validatePassengers(passengers);
                    setPassengerErrors(errs);
                    if (Object.keys(errs).length === 0) setStep(3);
                  }}
                />
              )}
              {step === 3 && (
                <ExtrasStep
                  extras={extras}
                  passengerCount={search.pax}
                  onChange={updateExtras}
                  onBack={() => setStep(2)}
                  onContinue={() => setStep(4)}
                />
              )}
              {step === 4 && pricing && (
                <PaymentStep
                  payment={payment}
                  total={pricing.total}
                  errors={paymentErrors}
                  processing={processing}
                  onChange={(field, value) =>
                    setPayment((p) => ({ ...p, [field]: value }))
                  }
                  onMethodChange={(method) => {
                    setPayment((p) => ({ ...p, method }));
                    setPaymentErrors({});
                  }}
                  onBack={() => setStep(3)}
                  onSubmit={handlePay}
                />
              )}
              {step === 5 && completed && (
                <ConfirmationStep booking={completed} onDownload={handleDownload} />
              )}
            </motion.div>
          </AnimatePresence>

          {showSidebar && pricing ? (
            <BookingSummary
              flight={flight}
              search={search}
              pricing={pricing}
              extras={extras}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
