"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Loader2, Mail, MapPin, Phone, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SITE } from "@/lib/site";

export function ContactSection({ embedded = true }: { embedded?: boolean }) {
  const [pending, setPending] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    await new Promise((r) => setTimeout(r, 900));
    setPending(false);
    setSent(true);
  }

  const shell = embedded ? "py-20 sm:py-28" : "py-10 sm:py-14";

  return (
    <section id="contact" className={`relative isolate ${shell}`}>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-primary">
            We&apos;re Here to Help
          </p>
          <h2 className="mt-4 font-display text-3xl font-black tracking-tight md:text-4xl">
            Get in Touch
          </h2>
          <p className="mt-4 text-muted-foreground">
            Questions, bookings, or travel inspiration — our expert team is available
            24/7 to help plan your perfect journey.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="glass-card space-y-6 rounded-[2rem] border-white/15 p-8 shadow-xl dark:border-white/10"
          >
            <div className="flex gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Support email
                </p>
                <p className="font-semibold">{SITE.email}</p>
                <p className="text-xs text-muted-foreground">Response within 2 hours</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Phone
                </p>
                <p className="font-semibold">
                  +442081504583
                  <br />
                  +442080445158
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  London (Head Office)
                </p>
                <p className="font-semibold">
                  86-90 Paul Street
                  <br />
                  London, UK
                  <br />
                  EC2A 4NE
                </p>
                <p className="mt-1 text-xs text-muted-foreground">Mon–Sat 9am–6pm</p>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 }}
            onSubmit={handleSubmit}
            className="glass-card space-y-5 rounded-[2rem] border-white/15 p-8 shadow-xl dark:border-white/10"
          >
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                required
                placeholder="Layla Hassan"
                className="rounded-xl"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@company.com"
                className="rounded-xl"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Tell us about your route, dates, and travelers..."
                className="w-full resize-none rounded-xl border border-input bg-background/70 px-3 py-3 text-sm shadow-sm backdrop-blur outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring dark:bg-background/40"
              />
            </div>

            {sent ? (
              <p className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                Thanks — your message is queued. We&apos;ll reply within one business
                day.
              </p>
            ) : null}

            <Button
              type="submit"
              variant="premium"
              disabled={pending || sent}
              className="w-full rounded-2xl py-6 text-base shadow-xl"
            >
              {pending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Send message
                </>
              )}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
