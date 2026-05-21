import type { CabinClass, MockFlight, TripType } from "@/lib/types";

export type BookingStep = 1 | 2 | 3 | 4 | 5;

export type Gender = "male" | "female" | "other" | "prefer-not";

export type PaymentMethod = "card" | "paypal" | "apple" | "google";

export type MealPreference = "standard" | "vegetarian" | "vegan" | "halal" | "kosher";

export interface BookingSearchContext {
  from?: string;
  to?: string;
  depart?: string;
  return?: string;
  trip?: TripType;
  cabin?: CabinClass;
  pax: number;
  seed?: string;
}

export interface PassengerDetails {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender | "";
  nationality: string;
  passportNumber: string;
  passportExpiry: string;
  email: string;
  phone: string;
}

export interface BookingExtras {
  extraBaggage: boolean;
  seatSelection: boolean;
  travelInsurance: boolean;
  mealPreference: MealPreference;
}

export interface PaymentDetails {
  method: PaymentMethod;
  cardholderName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export interface PriceBreakdown {
  baseFare: number;
  taxes: number;
  bookingFee: number;
  extrasTotal: number;
  total: number;
  perPassenger: number;
}

export interface CompletedBooking {
  bookingId: string;
  confirmedAt: string;
  flight: MockFlight;
  search: BookingSearchContext;
  passengers: PassengerDetails[];
  extras: BookingExtras;
  payment: PaymentDetails;
  pricing: PriceBreakdown;
}

export const EMPTY_PASSENGER: PassengerDetails = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  nationality: "",
  passportNumber: "",
  passportExpiry: "",
  email: "",
  phone: "",
};

export const DEFAULT_EXTRAS: BookingExtras = {
  extraBaggage: false,
  seatSelection: false,
  travelInsurance: false,
  mealPreference: "standard",
};

export const DEFAULT_PAYMENT: PaymentDetails = {
  method: "card",
  cardholderName: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
};
