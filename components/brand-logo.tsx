"use client";

import type { ComponentProps } from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

const LOGO_PATH = "/fly-world-logo.png";

/** Intrinsic dimensions after background removal + crop */
const LOGO_WIDTH = 490;
const LOGO_HEIGHT = 345;

export type BrandLogoVariant = "nav" | "footer" | "compact";

type LinkProps = Omit<ComponentProps<typeof Link>, "href">;

const variantConfig = {
  nav: {
    link: "py-0",
    img: "h-11 w-auto max-h-11 max-w-[180px] sm:h-12 sm:max-h-12 sm:max-w-[200px] md:h-[3.25rem] md:max-h-[3.25rem] md:max-w-[220px] lg:h-14 lg:max-h-14 lg:max-w-[248px]",
    sizes: "(max-width: 640px) 180px, (max-width: 1024px) 220px, 248px",
  },
  compact: {
    link: "py-0",
    img: "h-10 w-auto max-h-10 max-w-[160px] sm:h-11 sm:max-h-11 sm:max-w-[188px]",
    sizes: "(max-width: 640px) 160px, 188px",
  },
  footer: {
    link: "py-0",
    img: "h-12 w-auto max-h-12 max-w-[200px] sm:h-14 sm:max-h-14 sm:max-w-[230px]",
    sizes: "(max-width: 640px) 200px, 230px",
  },
} as const;

export function BrandLogo({
  variant = "nav",
  className,
  priority = false,
  ...linkProps
}: {
  variant?: BrandLogoVariant;
  className?: string;
  /** Set true above the fold (navbar) for LCP */
  priority?: boolean;
} & LinkProps) {
  const config = variantConfig[variant];

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex shrink-0 items-center leading-none outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        config.link,
        className,
      )}
      aria-label="Fly World — Home"
      {...linkProps}
    >
      <Image
        src={LOGO_PATH}
        alt="Fly World"
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        priority={priority}
        quality={95}
        className={cn(
          config.img,
          "block object-contain object-left",
        )}
        sizes={config.sizes}
      />
    </Link>
  );
}
