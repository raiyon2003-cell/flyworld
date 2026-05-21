"use client";

import { CreditCard, Loader2, Lock } from "lucide-react";

import type { FieldErrors } from "@/lib/booking";
import { formatCardNumber, formatExpiry } from "@/lib/booking";
import type { PaymentDetails, PaymentMethod } from "@/lib/booking-types";
import { formatGbp } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const METHODS: { id: PaymentMethod; label: string }[] = [
  { id: "card", label: "Credit / Debit card" },
  { id: "paypal", label: "PayPal" },
  { id: "apple", label: "Apple Pay" },
  { id: "google", label: "Google Pay" },
];

export function PaymentStep({
  payment,
  total,
  errors,
  processing,
  onChange,
  onMethodChange,
  onBack,
  onSubmit,
}: {
  payment: PaymentDetails;
  total: number;
  errors: FieldErrors;
  processing: boolean;
  onChange: (field: keyof PaymentDetails, value: string) => void;
  onMethodChange: (method: PaymentMethod) => void;
  onBack: () => void;
  onSubmit: () => void;
}) {
  const isCard = payment.method === "card";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          Payment
        </h2>
        <p className="mt-2 text-muted-foreground">
          Secure checkout — demo environment, no real charges.
        </p>
      </div>

      <Card className="rounded-2xl border-border/60 p-5 sm:p-6">
        <p className="mb-4 text-xs font-bold uppercase tracking-wide text-muted-foreground">
          Payment method
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {METHODS.map((m) => (
            <button
              key={m.id}
              type="button"
              disabled={processing}
              onClick={() => onMethodChange(m.id)}
              className={cn(
                "rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors",
                payment.method === m.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/60 hover:bg-muted/50",
              )}
            >
              {m.label}
              {(m.id === "apple" || m.id === "google") && (
                <span className="mt-1 block text-[10px] font-normal text-muted-foreground">
                  UI demo only
                </span>
              )}
            </button>
          ))}
        </div>

        {isCard ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label>Cardholder name</Label>
              <Input
                value={payment.cardholderName}
                onChange={(e) => onChange("cardholderName", e.target.value)}
                placeholder="Name on card"
                disabled={processing}
                className={cn(errors.cardholderName && "border-destructive")}
              />
              {errors.cardholderName ? (
                <p className="text-xs text-destructive">{errors.cardholderName}</p>
              ) : null}
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Card number</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={payment.cardNumber}
                  onChange={(e) =>
                    onChange("cardNumber", formatCardNumber(e.target.value))
                  }
                  placeholder="1234 5678 9012 3456"
                  disabled={processing}
                  className={cn("pl-10", errors.cardNumber && "border-destructive")}
                />
              </div>
              {errors.cardNumber ? (
                <p className="text-xs text-destructive">{errors.cardNumber}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label>Expiry (MM/YY)</Label>
              <Input
                value={payment.expiry}
                onChange={(e) => onChange("expiry", formatExpiry(e.target.value))}
                placeholder="MM/YY"
                disabled={processing}
                className={cn(errors.expiry && "border-destructive")}
              />
              {errors.expiry ? (
                <p className="text-xs text-destructive">{errors.expiry}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label>CVV</Label>
              <Input
                value={payment.cvv}
                onChange={(e) =>
                  onChange("cvv", e.target.value.replace(/\D/g, "").slice(0, 4))
                }
                placeholder="123"
                type="password"
                disabled={processing}
                className={cn(errors.cvv && "border-destructive")}
              />
              {errors.cvv ? (
                <p className="text-xs text-destructive">{errors.cvv}</p>
              ) : null}
            </div>
          </div>
        ) : (
          <p className="mt-6 rounded-xl bg-muted/40 p-4 text-sm text-muted-foreground">
            You will be redirected to {payment.method === "paypal" ? "PayPal" : payment.method === "apple" ? "Apple Pay" : "Google Pay"} to complete payment (demo).
          </p>
        )}

        <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
          <Lock className="h-4 w-4 text-primary" />
          256-bit SSL encryption · PCI DSS compliant (demo)
        </div>
      </Card>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <Button variant="outline" className="rounded-xl" onClick={onBack} disabled={processing}>
          Back
        </Button>
        <Button
          variant="premium"
          size="lg"
          className="min-w-[200px] rounded-xl px-10"
          onClick={onSubmit}
          disabled={processing}
        >
          {processing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing…
            </>
          ) : (
            <>Pay {formatGbp(total)}</>
          )}
        </Button>
      </div>
    </div>
  );
}
