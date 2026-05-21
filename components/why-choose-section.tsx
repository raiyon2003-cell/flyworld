"use client";

import { motion } from "framer-motion";

import { WHY_US } from "@/data/why-us";

export function WhyChooseSection() {
  return (
    <section id="why-us" className="relative isolate py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 h-72 bg-gradient-to-r from-primary/15 via-accent/15 to-amber-400/12 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-primary">
            Why FlyWorld
          </p>
          <h2 className="mt-4 font-display text-3xl font-black tracking-tight md:text-4xl">
            Travel Smarter With Us
          </h2>
          <p className="mt-4 text-muted-foreground">
            Cutting-edge technology meets human expertise — seamless travel for every
            budget.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {WHY_US.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="glass-card rounded-[1.75rem] border-white/15 p-6 shadow-xl dark:border-white/10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
