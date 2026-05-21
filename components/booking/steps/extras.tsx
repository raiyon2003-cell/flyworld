"use client";

import { EXTRA_PRICES } from "@/lib/booking";
import type { BookingExtras, MealPreference } from "@/lib/booking-types";
import { formatGbp } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

function ExtraOption({
  id,
  title,
  description,
  price,
  checked,
  onChange,
}: {
  id: string;
  title: string;
  description: string;
  price: number;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition-colors",
        checked
          ? "border-primary/40 bg-primary/5"
          : "border-border/60 hover:bg-muted/40",
      )}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 rounded border-input accent-primary"
      />
      <div className="flex-1">
        <p className="font-semibold">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <p className="text-sm font-bold text-primary">+{formatGbp(price)}</p>
    </label>
  );
}

export function ExtrasStep({
  extras,
  passengerCount,
  onChange,
  onBack,
  onContinue,
}: {
  extras: BookingExtras;
  passengerCount: number;
  onChange: <K extends keyof BookingExtras>(key: K, value: BookingExtras[K]) => void;
  onBack: () => void;
  onContinue: () => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          Additional services
        </h2>
        <p className="mt-2 text-muted-foreground">
          Optional upgrades — per passenger where noted.
        </p>
      </div>

      <Card className="space-y-4 rounded-2xl border-border/60 p-5 sm:p-6">
        <ExtraOption
          id="extra-baggage"
          title="Extra baggage"
          description="Add 23kg checked bag per passenger"
          price={EXTRA_PRICES.extraBaggage}
          checked={extras.extraBaggage}
          onChange={(v) => onChange("extraBaggage", v)}
        />
        <ExtraOption
          id="seat-selection"
          title="Seat selection"
          description="Choose your preferred seat before check-in"
          price={EXTRA_PRICES.seatSelection}
          checked={extras.seatSelection}
          onChange={(v) => onChange("seatSelection", v)}
        />
        <ExtraOption
          id="insurance"
          title="Travel insurance"
          description="Comprehensive cover for trip cancellation & medical"
          price={EXTRA_PRICES.travelInsurance}
          checked={extras.travelInsurance}
          onChange={(v) => onChange("travelInsurance", v)}
        />

        <div className="space-y-2 border-t border-border/60 pt-4">
          <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Meal preference
          </Label>
          <Select
            value={extras.mealPreference}
            onValueChange={(v) => onChange("mealPreference", v as MealPreference)}
          >
            <SelectTrigger className="rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard meal (included)</SelectItem>
              <SelectItem value="vegetarian">
                Vegetarian (+{formatGbp(EXTRA_PRICES.mealUpgrade)}/pp)
              </SelectItem>
              <SelectItem value="vegan">
                Vegan (+{formatGbp(EXTRA_PRICES.mealUpgrade)}/pp)
              </SelectItem>
              <SelectItem value="halal">
                Halal (+{formatGbp(EXTRA_PRICES.mealUpgrade)}/pp)
              </SelectItem>
              <SelectItem value="kosher">
                Kosher (+{formatGbp(EXTRA_PRICES.mealUpgrade)}/pp)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <p className="text-xs text-muted-foreground">
        Prices shown per passenger · {passengerCount} traveller
        {passengerCount > 1 ? "s" : ""} on this booking
      </p>

      <div className="flex flex-wrap justify-between gap-3">
        <Button variant="outline" className="rounded-xl" onClick={onBack}>
          Back
        </Button>
        <Button variant="premium" size="lg" className="rounded-xl px-10" onClick={onContinue}>
          Continue to payment
        </Button>
      </div>
    </div>
  );
}
