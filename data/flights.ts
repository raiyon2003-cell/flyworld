import type { MockFlight } from "@/lib/types";

const airlines = [
  { code: "EK", name: "Emirates" },
  { code: "QR", name: "Qatar Airways" },
  { code: "BA", name: "British Airways" },
  { code: "AF", name: "Air France" },
  { code: "TK", name: "Turkish Airlines" },
  { code: "UA", name: "United Airlines" },
  { code: "JL", name: "Japan Airlines" },
  { code: "SQ", name: "Singapore Airlines" },
  { code: "DL", name: "Delta Air Lines" },
  { code: "LH", name: "Lufthansa" },
];

function flightScore(price: number, durationMinutes: number, stops: number): number {
  return Math.round(100 - price / 12 - durationMinutes / 45 - stops * 18);
}

function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Deterministic PRNG for stable SSR/client mock data */
function createRng(seed: string) {
  let state = hashSeed(seed) || 1;
  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle<T>(arr: T[], rng: () => number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function randInt(rng: () => number, min: number, max: number): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}

export function generateMockFlights(params: {
  from?: string;
  to?: string;
  seed?: string;
}): MockFlight[] {
  const seed = `${params.from ?? "ANY"}-${params.to ?? "ANY"}-${params.seed ?? "home"}`;
  const rng = createRng(seed);
  const order = seededShuffle(airlines, rng).slice(0, 9);
  const basePrice = randInt(rng, 280, 520);

  return order.map((airline, i) => {
    const stops = i % 4 === 0 ? 0 : i % 3;
    const durationMinutes = randInt(rng, 320, 920) + stops * 90;
    const priceGbp = basePrice + i * 37 + stops * 55 + randInt(rng, 0, 40);

    return {
      id: `${seed}-${airline.code}-${i}`,
      airlineCode: airline.code,
      airlineName: airline.name,
      departAirport: params.from ?? "DXB",
      arriveAirport: params.to ?? "LHR",
      departureTime: `${String(6 + (i % 12)).padStart(2, "0")}:${i % 2 === 0 ? "15" : "45"}`,
      arrivalTime: `${String((14 + i) % 24).padStart(2, "0")}:${i % 3 === 0 ? "20" : "05"}`,
      durationMinutes,
      stops,
      priceGbp,
      flightNumber: `${airline.code} ${100 + i * 17}`,
      baggage:
        i % 2 === 0
          ? "2 pc checked · Carry-on included"
          : "1 pc checked · Carry-on included",
      refundable: i % 3 !== 0,
      score: flightScore(priceGbp, durationMinutes, stops),
    };
  });
}
