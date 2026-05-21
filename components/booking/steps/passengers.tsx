"use client";

import type { ReactNode } from "react";

import { DatePickerField } from "@/components/date-picker-field";
import type { FieldErrors } from "@/lib/booking";
import type { PassengerDetails } from "@/lib/booking-types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

function Field({
  label,
  error,
  children,
  required,
}: {
  label: string;
  error?: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
        {required ? <span className="text-destructive"> *</span> : null}
      </Label>
      {children}
      {error ? <p className="text-xs font-medium text-destructive">{error}</p> : null}
    </div>
  );
}

export function PassengersStep({
  passengers,
  errors,
  onChange,
  onBack,
  onContinue,
}: {
  passengers: PassengerDetails[];
  errors: FieldErrors;
  onChange: (index: number, field: keyof PassengerDetails, value: string) => void;
  onBack: () => void;
  onContinue: () => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          Passenger details
        </h2>
        <p className="mt-2 text-muted-foreground">
          Enter details exactly as they appear on your passport.
        </p>
      </div>

      {passengers.map((passenger, index) => (
        <Card key={index} className="rounded-2xl border-border/60 p-5 sm:p-6">
          <p className="mb-5 font-display text-lg font-bold">
            Passenger {index + 1}
            {index === 0 ? (
              <span className="ml-2 text-xs font-semibold text-muted-foreground">
                (Lead traveller)
              </span>
            ) : null}
          </p>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="First name"
              required
              error={errors[`passenger-${index}-firstName`]}
            >
              <Input
                value={passenger.firstName}
                onChange={(e) => onChange(index, "firstName", e.target.value)}
                placeholder="As on passport"
                className={cn(errors[`passenger-${index}-firstName`] && "border-destructive")}
              />
            </Field>
            <Field
              label="Last name"
              required
              error={errors[`passenger-${index}-lastName`]}
            >
              <Input
                value={passenger.lastName}
                onChange={(e) => onChange(index, "lastName", e.target.value)}
                placeholder="As on passport"
                className={cn(errors[`passenger-${index}-lastName`] && "border-destructive")}
              />
            </Field>
            <Field
              label="Date of birth"
              required
              error={errors[`passenger-${index}-dateOfBirth`]}
            >
              <DatePickerField
                label=""
                mode="birth"
                isoValue={passenger.dateOfBirth}
                onIsoChange={(v) => onChange(index, "dateOfBirth", v)}
                placeholder="Date of birth"
                className={cn(
                  "[&>span:first-child]:hidden",
                  errors[`passenger-${index}-dateOfBirth`] &&
                    "[&_input]:border-destructive",
                )}
                disabled={(d) => d > new Date()}
              />
            </Field>
            <Field label="Gender" required error={errors[`passenger-${index}-gender`]}>
              <Select
                value={passenger.gender || undefined}
                onValueChange={(v) => onChange(index, "gender", v)}
              >
                <SelectTrigger
                  className={cn(
                    "rounded-xl",
                    errors[`passenger-${index}-gender`] && "border-destructive",
                  )}
                >
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field
              label="Nationality"
              required
              error={errors[`passenger-${index}-nationality`]}
            >
              <Input
                value={passenger.nationality}
                onChange={(e) => onChange(index, "nationality", e.target.value)}
                placeholder="e.g. British"
                className={cn(errors[`passenger-${index}-nationality`] && "border-destructive")}
              />
            </Field>
            <Field
              label="Passport number"
              required
              error={errors[`passenger-${index}-passportNumber`]}
            >
              <Input
                value={passenger.passportNumber}
                onChange={(e) => onChange(index, "passportNumber", e.target.value)}
                placeholder="e.g. 123456789"
                className={cn(
                  errors[`passenger-${index}-passportNumber`] && "border-destructive",
                )}
              />
            </Field>
            <Field
              label="Passport expiry"
              required
              error={errors[`passenger-${index}-passportExpiry`]}
            >
              <DatePickerField
                label=""
                mode="expiry"
                isoValue={passenger.passportExpiry}
                onIsoChange={(v) => onChange(index, "passportExpiry", v)}
                placeholder="Passport expiry"
                className={cn(
                  "[&>span:first-child]:hidden",
                  errors[`passenger-${index}-passportExpiry`] &&
                    "[&_input]:border-destructive",
                )}
                disabled={(d) => d <= new Date()}
              />
            </Field>
            <Field label="Email" required error={errors[`passenger-${index}-email`]}>
              <Input
                type="email"
                value={passenger.email}
                onChange={(e) => onChange(index, "email", e.target.value)}
                placeholder="name@email.com"
                className={cn(errors[`passenger-${index}-email`] && "border-destructive")}
              />
            </Field>
            <Field label="Phone" required error={errors[`passenger-${index}-phone`]}>
              <Input
                type="tel"
                value={passenger.phone}
                onChange={(e) => onChange(index, "phone", e.target.value)}
                placeholder="+44 7XXX XXXXXX"
                className={cn(errors[`passenger-${index}-phone`] && "border-destructive")}
              />
            </Field>
          </div>
        </Card>
      ))}

      <div className="flex flex-wrap justify-between gap-3">
        <Button variant="outline" className="rounded-xl" onClick={onBack}>
          Back
        </Button>
        <Button variant="premium" size="lg" className="rounded-xl px-10" onClick={onContinue}>
          Continue to extras
        </Button>
      </div>
    </div>
  );
}
