"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "lucide-react";

import { BrandLogo } from "@/components/brand-logo";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/search", label: "Search flights" },
  { href: "/deals", label: "Deals" },
  { href: "/destinations", label: "Destinations" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const phoneNumbers = ["+442081504583", "+442080445158"] as const;

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <motion.header
      initial={false}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl dark:border-white/10 dark:bg-background/70"
    >
      <div className="mx-auto flex h-16 min-h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:gap-4 sm:px-6 lg:h-[4.5rem] lg:min-h-[4.5rem] lg:px-8">
        <div className="flex min-w-0 shrink-0 items-center pr-1 sm:pr-2">
          <BrandLogo variant="nav" priority />
        </div>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-xl px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground",
                  active && "bg-muted text-foreground shadow-sm",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden items-center gap-3 sm:flex">
            <div className="flex flex-col items-end gap-0.5 text-right">
              {phoneNumbers.map((num) => (
                <a
                  key={num}
                  href={`tel:${num.replace(/\s/g, "")}`}
                  className="text-xs font-semibold leading-tight text-foreground/90 underline-offset-4 transition-colors hover:text-primary hover:underline sm:text-sm"
                >
                  {num}
                </a>
              ))}
            </div>
            <Button variant="premium" className="rounded-xl px-5 font-semibold">
              Sign up
            </Button>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-xl lg:hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="glass-card border-l border-white/10 bg-background/90">
              <div className="mt-6 flex flex-col gap-6">
                <BrandLogo
                  variant="compact"
                  onClick={() => setOpen(false)}
                />
                <div className="flex flex-col gap-2">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="rounded-xl px-4 py-3 text-base font-semibold hover:bg-muted"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="grid gap-3 border-t border-border/60 pt-6">
                  <div className="flex flex-col gap-1.5 px-1">
                    <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                      Phone
                    </p>
                    {phoneNumbers.map((num) => (
                      <a
                        key={num}
                        href={`tel:${num.replace(/\s/g, "")}`}
                        className="text-sm font-semibold text-foreground transition-colors hover:text-primary"
                      >
                        {num}
                      </a>
                    ))}
                  </div>
                  <Button variant="premium" className="rounded-xl">
                    Sign up
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <AnimatePresence>
        <motion.div
          aria-hidden
          initial={false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        />
      </AnimatePresence>
    </motion.header>
  );
}
