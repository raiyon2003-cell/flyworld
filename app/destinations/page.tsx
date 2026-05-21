import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { DESTINATIONS } from "@/data/destinations";
import { DestinationCard } from "@/components/destination-card";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Destinations",
};

export default function DestinationsPage() {
  return (
    <div className="relative isolate pb-24 pt-12">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.18),_transparent_55%)]" />

      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <Button
          asChild
          variant="ghost"
          className="w-fit rounded-xl px-0 text-sm font-semibold text-muted-foreground hover:text-foreground"
        >
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
        </Button>

        <header className="max-w-3xl space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-primary">
            Explore the World
          </p>
          <h1 className="font-display text-4xl font-black tracking-tight md:text-5xl">
            500+ Destinations
          </h1>
          <p className="text-lg text-muted-foreground">
            From the arctic to the equator — discover your perfect destination and
            plan your next unforgettable journey.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {DESTINATIONS.map((destination, index) => (
            <DestinationCard
              key={destination.slug}
              destination={destination}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
