import {
  Award,
  Headphones,
  Plane,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Wallet,
  Zap,
  type LucideIcon,
} from "lucide-react";

export interface WhyUsItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const WHY_US: WhyUsItem[] = [
  {
    title: "Best Price Guarantee",
    description:
      "Found it cheaper elsewhere? We'll match it and give you £25 off. No hidden fees, ever.",
    icon: Wallet,
  },
  {
    title: "ATOL Protected",
    description:
      "Every package holiday fully ATOL protected. Complete financial security and peace of mind.",
    icon: ShieldCheck,
  },
  {
    title: "24/7 Expert Support",
    description:
      "Travel experts available around the clock by phone, chat, or email — wherever you are.",
    icon: Headphones,
  },
  {
    title: "Flexible Cancellation",
    description:
      "Plans change. Free amendments and hassle-free cancellations on most bookings up to 24 hours before.",
    icon: RefreshCw,
  },
  {
    title: "500+ Airlines",
    description:
      "Access to 500+ airlines worldwide — from budget carriers to premium business class lounges.",
    icon: Plane,
  },
  {
    title: "Curated Experiences",
    description:
      "Every deal hand-selected by our team. No algorithm, no filler — just the best experiences.",
    icon: Sparkles,
  },
  {
    title: "Instant Booking",
    description:
      "Book in under 3 minutes with instant confirmation. E-tickets land in your inbox immediately.",
    icon: Zap,
  },
  {
    title: "Award-Winning",
    description:
      "UK Travel Agency of the Year 2023 & 2024. Trusted by over 2 million travellers.",
    icon: Award,
  },
];
