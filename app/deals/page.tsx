import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { DealsSection } from "@/components/deals-section";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Deals",
};

export default function DealsPage() {
  return (
    <div className="relative isolate pb-24 pt-12">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-primary/15 via-transparent to-transparent" />

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
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

        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-primary">
            FlyWorld Deals Desk
          </p>
          <h1 className="font-display text-4xl font-black tracking-tight md:text-5xl">
            Offers engineered for spontaneous travelers
          </h1>
          <p className="text-lg text-muted-foreground">
            Browse rotating promotions — each tile animates with depth so your brand
            feels alive while staying enterprise-clean.
          </p>
        </div>
      </div>

      <DealsSection />
    </div>
  );
}
