export type TripType = "round-trip" | "one-way" | "multi-city";

export type CabinClass = "economy" | "business" | "first";

export interface Airport {
  code: string;
  city: string;
  country: string;
  name: string;
}

export interface FlightLeg {
  flightNumber: string;
  airlineCode: string;
  airlineName: string;
  departTime: string;
  arriveTime: string;
  durationMinutes: number;
  stops: number;
}

export interface MockFlight {
  id: string;
  airlineCode: string;
  airlineName: string;
  departAirport: string;
  arriveAirport: string;
  departureTime: string;
  arrivalTime: string;
  durationMinutes: number;
  stops: number;
  /** Total in GBP (whole pounds) for mock display */
  priceGbp: number;
  flightNumber: string;
  baggage: string;
  refundable: boolean;
  score: number;
}

export interface Destination {
  slug: string;
  city: string;
  country: string;
  image: string;
  /** Lowest “from” price in GBP (whole pounds) */
  priceFrom: number;
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  badge: string;
  /** Tailwind gradient stops (from/via/to) — applied via deal-card map for JIT */
  gradient: string;
  /** Optional hero photo (Unsplash) */
  image?: string;
  country: string;
  flag: string;
  priceWas: number;
  priceNow: number;
  nights: number;
  stars: number;
  flightType: "Direct" | "1 Stop";
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  country: string;
  image: string;
  review: string;
  rating: number;
}
