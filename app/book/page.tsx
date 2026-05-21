import { Suspense } from "react";

import { BookingWizard } from "@/components/booking/booking-wizard";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata = {
  title: "Book your flight",
};

function BookingFallback() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-16">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-96 w-full rounded-2xl" />
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<BookingFallback />}>
      <BookingWizard />
    </Suspense>
  );
}
