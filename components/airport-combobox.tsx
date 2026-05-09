"use client";

import * as React from "react";
import { ChevronsUpDown, Plane } from "lucide-react";

import type { Airport } from "@/lib/types";
import { searchAirports } from "@/data/airports";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface AirportComboboxProps {
  label: string;
  value: Airport | null;
  onChange: (airport: Airport | null) => void;
  placeholder?: string;
  className?: string;
}

export function AirportCombobox({
  label,
  value,
  onChange,
  placeholder = "City or airport",
  className,
}: AirportComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const results = React.useMemo(() => searchAirports(query), [query]);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="h-12 justify-between rounded-xl border-input bg-background/70 font-normal shadow-sm backdrop-blur dark:bg-background/40"
          >
            <span className="flex min-w-0 items-center gap-2 truncate">
              <Plane className="h-4 w-4 shrink-0 text-primary" />
              <span className="truncate">
                {value ? (
                  <>
                    <span className="font-semibold">{value.city}</span>
                    <span className="text-muted-foreground">
                      {" "}
                      ({value.code})
                    </span>
                  </>
                ) : (
                  <span className="text-muted-foreground">{placeholder}</span>
                )}
              </span>
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-60" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[min(100vw-2rem,380px)] p-0" align="start">
          <div className="border-b p-3">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search airports..."
              className="w-full rounded-lg border border-input bg-background/80 px-3 py-2 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring dark:bg-background/40"
            />
          </div>
          <div className="max-h-64 overflow-y-auto p-2">
            {results.length === 0 ? (
              <p className="px-2 py-6 text-center text-sm text-muted-foreground">
                No airports match your search.
              </p>
            ) : (
              <ul className="space-y-1">
                {results.map((a) => (
                  <li key={a.code}>
                    <button
                      type="button"
                      className={cn(
                        "flex w-full flex-col rounded-xl px-3 py-2 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                        value?.code === a.code && "bg-accent/70",
                      )}
                      onClick={() => {
                        onChange(a);
                        setOpen(false);
                        setQuery("");
                      }}
                    >
                      <span className="flex items-center justify-between gap-2">
                        <span className="font-semibold">{a.city}</span>
                        <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                          {a.code}
                        </span>
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {a.name} · {a.country}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
