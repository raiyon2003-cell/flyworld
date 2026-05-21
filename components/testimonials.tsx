"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

import { TESTIMONIALS } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section id="testimonials" className="relative isolate py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-muted/40 via-background to-muted/40 dark:from-muted/15 dark:via-background dark:to-muted/15" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-primary">
            Real Stories
          </p>
          <h2 className="mt-4 font-display text-3xl font-black tracking-tight md:text-4xl">
            What Our Travellers Say
          </h2>
          <p className="mt-4 text-muted-foreground">
            Join 2 million+ satisfied travellers who trust FlyWorld for every journey.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, index) => (
            <motion.article
              key={t.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="glass-card relative overflow-hidden rounded-[1.75rem] border-white/15 p-7 shadow-xl dark:border-white/10"
            >
              <Quote className="absolute right-6 top-6 h-10 w-10 text-primary/15" />
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-2xl ring-2 ring-primary/25">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div>
                  <p className="font-display text-lg font-bold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.country}</p>
                </div>
              </div>

              <div className="mt-5 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < t.rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted-foreground/40"
                    }`}
                  />
                ))}
              </div>

              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                “{t.review}”
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
