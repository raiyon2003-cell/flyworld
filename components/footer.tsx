"use client";

import Link from "next/link";
import { Github, Instagram, Plane, Twitter } from "lucide-react";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/search", label: "Search flights" },
  { href: "/deals", label: "Deals" },
  { href: "/destinations", label: "Destinations" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="relative isolate border-t border-white/10 bg-gradient-to-b from-background via-muted/30 to-background pb-10 pt-16 dark:via-muted/10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" />

      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:flex-row lg:justify-between lg:px-8">
        <div className="max-w-md space-y-5">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg">
              <Plane className="h-5 w-5" />
            </span>
            <span className="font-display text-2xl font-black tracking-tight">
              FlyWorld
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Premium flight discovery UX — mock data, real polish. Built with Next.js 14,
            Tailwind, ShadCN UI, Framer Motion, and Lucide icons.
          </p>
          <div className="flex gap-3">
            <Link
              href="https://twitter.com"
              aria-label="Twitter"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-card/80 text-muted-foreground backdrop-blur transition hover:text-primary dark:border-white/10"
            >
              <Twitter className="h-5 w-5" />
            </Link>
            <Link
              href="https://instagram.com"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-card/80 text-muted-foreground backdrop-blur transition hover:text-primary dark:border-white/10"
            >
              <Instagram className="h-5 w-5" />
            </Link>
            <Link
              href="https://github.com"
              aria-label="GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-card/80 text-muted-foreground backdrop-blur transition hover:text-primary dark:border-white/10"
            >
              <Github className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-muted-foreground">
            Navigate
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-semibold text-foreground/80 hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="max-w-xs space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-muted-foreground">
            Legal
          </p>
          <div className="flex flex-col gap-2 text-sm font-semibold">
            <Link href="#" className="hover:text-primary">
              Terms of service
            </Link>
            <Link href="#" className="hover:text-primary">
              Privacy policy
            </Link>
            <Link href="/contact" className="hover:text-primary">
              Cookie settings
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-7xl flex-col gap-3 border-t border-white/10 px-4 pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} FlyWorld. All rights reserved.</p>
        <p>Crafted for travelers who notice the details.</p>
      </div>
    </footer>
  );
}
