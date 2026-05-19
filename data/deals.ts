import type { Deal } from "@/lib/types";

export const DEALS: Deal[] = [
  {
    id: "weekend",
    title: "Weekend Deals",
    description: "Save up to 35% on short city breaks departing Thu–Sun.",
    badge: "Trending",
    gradient: "from-slate-950 via-emerald-950 to-teal-900",
  },
  {
    id: "summer",
    title: "Summer Offers",
    description: "Early-bird fares to beaches and islands across three continents.",
    badge: "Limited",
    gradient: "from-orange-950 via-red-900 to-rose-950",
  },
  {
    id: "student",
    title: "Student Discounts",
    description: "Verified students unlock extra baggage and flexible dates.",
    badge: "Exclusive",
    gradient: "from-violet-950 via-purple-900 to-fuchsia-950",
  },
  {
    id: "family",
    title: "Family Packages",
    description: "Bundle flights + seats together with priority boarding options.",
    badge: "Popular",
    gradient: "from-zinc-950 via-emerald-950 to-green-950",
  },
];
