import { FlightSearch } from "@/components/flight-search";
import { Hero } from "@/components/hero";
import { DestinationsSection } from "@/components/destinations-section";
import { DealsSection } from "@/components/deals-section";
import { WhyChooseSection } from "@/components/why-choose-section";
import { Testimonials } from "@/components/testimonials";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section
        id="search"
        className="relative -mt-16 pb-20 sm:-mt-20 sm:pb-28 lg:-mt-24"
      >
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FlightSearch />
        </div>
      </section>

      <DestinationsSection />
      <DealsSection />
      <WhyChooseSection />
      <Testimonials />
      <AboutSection />
      <ContactSection />
    </>
  );
}
