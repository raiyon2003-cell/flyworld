import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[50vh] max-w-7xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <p className="font-display text-6xl font-black text-primary sm:text-7xl">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold sm:text-3xl">
        This page could not be found
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        The link may be broken or the page may have moved. Head back home to search
        flights and explore deals.
      </p>
      <Button asChild variant="premium" className="mt-8 rounded-xl px-8">
        <Link href="/">Back to home</Link>
      </Button>
    </section>
  );
}
