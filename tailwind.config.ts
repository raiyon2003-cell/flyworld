import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "ambient-drift": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(1.5%, -1%)" },
        },
        "cloud-a": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(3.5%)" },
        },
        "cloud-b": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-4%)" },
        },
        "cloud-c": {
          "0%, 100%": { transform: "translateX(0) translateY(0)" },
          "50%": { transform: "translateX(2.5%) translateY(-5px)" },
        },
        "fly-slow": {
          "0%": { transform: "translate3d(-12vw, 0, 0)", opacity: "0" },
          "12%": { opacity: "0.4" },
          "88%": { opacity: "0.4" },
          "100%": { transform: "translate3d(112vw, 0, 0)", opacity: "0" },
        },
        "fly-slow-rev": {
          "0%": { transform: "translate3d(12vw, 0, 0)", opacity: "0" },
          "12%": { opacity: "0.32" },
          "88%": { opacity: "0.32" },
          "100%": { transform: "translate3d(-112vw, 0, 0)", opacity: "0" },
        },
        "road-line": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "48px 0" },
        },
        "road-glow": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.72" },
        },
        "car-a": {
          "0%": { transform: "translate3d(-8vw, 0, 0)", opacity: "0" },
          "8%": { opacity: "0.88" },
          "92%": { opacity: "0.88" },
          "100%": { transform: "translate3d(105vw, 0, 0)", opacity: "0" },
        },
        "car-b": {
          "0%": { transform: "translate3d(92vw, 0, 0)", opacity: "0" },
          "8%": { opacity: "0.78" },
          "92%": { opacity: "0.78" },
          "100%": { transform: "translate3d(-12vw, 0, 0)", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 7s ease-in-out infinite 1s",
        shimmer: "shimmer 1.5s infinite",
        "ambient-drift": "ambient-drift 32s ease-in-out infinite",
        "cloud-a": "cloud-a 34s ease-in-out infinite",
        "cloud-b": "cloud-b 40s ease-in-out infinite",
        "cloud-c": "cloud-c 28s ease-in-out infinite",
        "fly-slow": "fly-slow 54s linear infinite",
        "fly-slow-rev": "fly-slow-rev 68s linear infinite",
        "fly-slow-delayed": "fly-slow 62s linear infinite 20s",
        "road-line": "road-line 22s linear infinite",
        "road-glow": "road-glow 7s ease-in-out infinite",
        "car-a": "car-a 16s ease-in-out infinite",
        "car-b": "car-b 19s ease-in-out infinite -4s",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-mesh":
          "linear-gradient(135deg, hsl(var(--hero-start)) 0%, hsl(var(--hero-mid)) 45%, hsl(var(--hero-end)) 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
