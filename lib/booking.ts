import { generateMockFlights } from "@/data/flights";
import type { CabinClass, MockFlight, TripType } from "@/lib/types";

import type {
  BookingExtras,
  BookingSearchContext,
  CompletedBooking,
  PassengerDetails,
  PaymentDetails,
  PriceBreakdown,
} from "./booking-types";

const STORAGE_KEY = "flyworld-booking-draft";
const FLIGHT_KEY = "flyworld-booking-flight";

export const EXTRA_PRICES = {
  extraBaggage: 45,
  seatSelection: 28,
  travelInsurance: 24,
  mealUpgrade: 12,
} as const;

export const BOOKING_STEPS = [
  { step: 1 as const, label: "Flight review" },
  { step: 2 as const, label: "Passengers" },
  { step: 3 as const, label: "Extras" },
  { step: 4 as const, label: "Payment" },
  { step: 5 as const, label: "Confirmation" },
];

export function createEmptyPassengers(count: number): PassengerDetails[] {
  return Array.from({ length: Math.max(1, Math.min(9, count)) }, () => ({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    passportNumber: "",
    passportExpiry: "",
    email: "",
    phone: "",
  }));
}

export function parseSearchContext(
  params: Record<string, string | string[] | undefined>,
): BookingSearchContext {
  const pick = (k: string) => {
    const v = params[k];
    return Array.isArray(v) ? v[0] : v;
  };
  const paxRaw = pick("pax");
  const pax = paxRaw ? Number.parseInt(paxRaw, 10) : 1;

  return {
    from: pick("from"),
    to: pick("to"),
    depart: pick("depart"),
    return: pick("return"),
    trip: ((): TripType => {
      const t = pick("trip");
      if (t === "one-way" || t === "multi-city") return t;
      return "round-trip";
    })(),
    cabin: ((): CabinClass | undefined => {
      const c = pick("cabin");
      if (c === "economy" || c === "business" || c === "first") return c;
      return undefined;
    })(),
    pax: Number.isFinite(pax) && pax > 0 ? Math.min(9, pax) : 1,
    seed: pick("seed"),
  };
}

export function buildBookingHref(
  flight: MockFlight,
  search: BookingSearchContext,
): string {
  const q = new URLSearchParams();
  q.set("flightId", flight.id);
  if (search.from) q.set("from", search.from);
  if (search.to) q.set("to", search.to);
  if (search.depart) q.set("depart", search.depart);
  if (search.return) q.set("return", search.return);
  if (search.trip) q.set("trip", search.trip);
  if (search.cabin) q.set("cabin", search.cabin);
  q.set("pax", String(search.pax));
  if (search.seed) q.set("seed", search.seed);
  return `/book?${q.toString()}`;
}

export function persistBookingFlight(
  flight: MockFlight,
  search: BookingSearchContext,
): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(
    FLIGHT_KEY,
    JSON.stringify({ flight, search, savedAt: Date.now() }),
  );
}

export function resolveBookingFlight(
  flightId: string,
  search: BookingSearchContext,
): MockFlight | null {
  if (typeof window !== "undefined") {
    try {
      const raw = sessionStorage.getItem(FLIGHT_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as {
          flight: MockFlight;
          search: BookingSearchContext;
        };
        if (parsed.flight?.id === flightId) return parsed.flight;
      }
    } catch {
      /* ignore */
    }
  }

  const flights = generateMockFlights({
    from: search.from,
    to: search.to,
    seed: search.seed ?? `${search.from}-${search.to}`,
  });
  return flights.find((f) => f.id === flightId) ?? null;
}

export function calculatePricing(
  flight: MockFlight,
  passengerCount: number,
  extras: BookingExtras,
): PriceBreakdown {
  const baseFare = flight.priceGbp * passengerCount;
  let extrasTotal = 0;
  if (extras.extraBaggage) extrasTotal += EXTRA_PRICES.extraBaggage * passengerCount;
  if (extras.seatSelection) extrasTotal += EXTRA_PRICES.seatSelection * passengerCount;
  if (extras.travelInsurance)
    extrasTotal += EXTRA_PRICES.travelInsurance * passengerCount;
  if (extras.mealPreference !== "standard")
    extrasTotal += EXTRA_PRICES.mealUpgrade * passengerCount;

  const taxes = Math.round((baseFare + extrasTotal) * 0.12);
  const bookingFee = 15 * passengerCount;
  const total = baseFare + extrasTotal + taxes + bookingFee;

  return {
    baseFare,
    taxes,
    bookingFee,
    extrasTotal,
    total,
    perPassenger: Math.round(total / passengerCount),
  };
}

export function generateBookingId(): string {
  const part = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `FW-${part}-${rand}`;
}

export type FieldErrors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validatePassengers(passengers: PassengerDetails[]): FieldErrors {
  const errors: FieldErrors = {};
  passengers.forEach((p, i) => {
    const prefix = `passenger-${i}`;
    if (!p.firstName.trim()) errors[`${prefix}-firstName`] = "First name is required";
    if (!p.lastName.trim()) errors[`${prefix}-lastName`] = "Last name is required";
    if (!p.dateOfBirth) errors[`${prefix}-dateOfBirth`] = "Date of birth is required";
    if (!p.gender) errors[`${prefix}-gender`] = "Please select gender";
    if (!p.nationality.trim())
      errors[`${prefix}-nationality`] = "Nationality is required";
    if (!p.passportNumber.trim())
      errors[`${prefix}-passportNumber`] = "Passport number is required";
    if (!p.passportExpiry)
      errors[`${prefix}-passportExpiry`] = "Passport expiry is required";
    else if (new Date(p.passportExpiry) <= new Date())
      errors[`${prefix}-passportExpiry`] = "Passport must be valid";
    if (!p.email.trim()) errors[`${prefix}-email`] = "Email is required";
    else if (!EMAIL_RE.test(p.email))
      errors[`${prefix}-email`] = "Enter a valid email";
    if (!p.phone.trim()) errors[`${prefix}-phone`] = "Phone number is required";
    else if (p.phone.replace(/\D/g, "").length < 10)
      errors[`${prefix}-phone`] = "Enter a valid phone number";
  });
  return errors;
}

export function validatePayment(
  payment: PaymentDetails,
  method: PaymentDetails["method"],
): FieldErrors {
  const errors: FieldErrors = {};
  if (method !== "card") return errors;

  if (!payment.cardholderName.trim())
    errors.cardholderName = "Cardholder name is required";
  const digits = payment.cardNumber.replace(/\s/g, "");
  if (digits.length < 15) errors.cardNumber = "Enter a valid card number";
  if (!/^\d{2}\/\d{2}$/.test(payment.expiry.trim()))
    errors.expiry = "Use MM/YY format";
  if (payment.cvv.length < 3) errors.cvv = "Enter a valid CVV";
  return errors;
}

export function saveCompletedBooking(booking: CompletedBooking): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(booking));
}

export function loadCompletedBooking(): CompletedBooking | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CompletedBooking;
  } catch {
    return null;
  }
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m.toString().padStart(2, "0")}m`;
}

export function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

export function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}
