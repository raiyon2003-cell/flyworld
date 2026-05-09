import {
  BadgePercent,
  Earth,
  Headphones,
  Plane,
  ShieldCheck,
  Undo2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface WhyUsItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const WHY_US: WhyUsItem[] = [
  {
    title: "Best Prices",
    description: "Meta-search across hundreds of carriers with fee-transparent totals.",
    icon: BadgePercent,
  },
  {
    title: "Secure Booking",
    description: "PCI-aligned flows, modern encryption, and fraud monitoring.",
    icon: ShieldCheck,
  },
  {
    title: "24/7 Support",
    description: "Human agents and AI assistants ready wherever you fly.",
    icon: Headphones,
  },
  {
    title: "Easy Refunds",
    description: "Clear refundable fares and guided change workflows.",
    icon: Undo2,
  },
  {
    title: "Global Flights",
    description: "Intercontinental routes with smart layover suggestions.",
    icon: Earth,
  },
  {
    title: "Trusted by Travelers",
    description: "Millions of searches monthly from explorers and road warriors.",
    icon: Plane,
  },
];
