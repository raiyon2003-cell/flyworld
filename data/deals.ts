import type { Deal } from "@/lib/types";

export const DEALS: Deal[] = [
  {
    id: "weekend",
    title: "Weekend Deals",
    description: "Save up to 35% on short city breaks departing Thu–Sun.",
    badge: "Trending",
    gradient: "from-violet-600/90 via-fuchsia-600/85 to-indigo-600/90",
  },
  {
    id: "summer",
    title: "Summer Offers",
    description: "Early-bird fares to beaches and islands across three continents.",
    badge: "Limited",
    gradient: "from-sky-600/90 via-cyan-500/85 to-teal-600/90",
  },
  {
    id: "student",
    title: "Student Discounts",
    description: "Verified students unlock extra baggage and flexible dates.",
    badge: "Exclusive",
    gradient: "from-amber-600/90 via-orange-500/85 to-rose-600/90",
  },
  {
    id: "family",
    title: "Family Packages",
    description: "Bundle flights + seats together with priority boarding options.",
    badge: "Popular",
    gradient: "from-emerald-600/90 via-teal-500/85 to-blue-600/90",
  },
];
