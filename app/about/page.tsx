import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { AboutSection } from "@/components/about-section";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="relative isolate pb-24 pt-12">
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
      </div>

      <AboutSection />
    </div>
  );
}
