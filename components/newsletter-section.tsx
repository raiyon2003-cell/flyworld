"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Loader2, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
  const [pending, setPending] = React.useState(false);
  const [done, setDone] = React.useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    await new Promise((r) => setTimeout(r, 800));
    setPending(false);
    setDone(true);
  }

  return (
    <section className="relative isolate py-20 sm:py-28">
      <motion.div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-muted/40 via-background to-background" />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-primary">
            Stay in the Loop
          </p>
          <h2 className="mt-4 font-display text-3xl font-black tracking-tight md:text-4xl">
            Get Exclusive Deals First
          </h2>
          <p className="mt-4 text-muted-foreground">
            Join 180,000+ savvy travellers receiving our weekly deal alerts.
            Unsubscribe anytime.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            ✓ No spam, ever · ✓ Weekly deals digest
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center"
        >
          <div className="relative flex-1 sm:max-w-md">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="email"
              required
              placeholder="you@email.com"
              className="h-12 rounded-xl pl-10"
              disabled={done}
            />
          </div>
          <Button
            type="submit"
            variant="premium"
            disabled={pending || done}
            className="h-12 rounded-xl px-8 font-semibold shadow-lg"
          >
            {pending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : done ? (
              "Subscribed ✓"
            ) : (
              "Subscribe →"
            )}
          </Button>
        </motion.form>
      </div>
    </section>
  );
}
