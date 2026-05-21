"use client";

import * as React from "react";
import { format, isValid, parse, startOfDay } from "date-fns";
import { enGB } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

/** Gregorian calendar modes — year dropdown ranges */
export type DatePickerMode = "travel" | "birth" | "expiry";

function yearRange(mode: DatePickerMode): { fromYear: number; toYear: number } {
  const y = new Date().getFullYear();
  switch (mode) {
    case "birth":
      return { fromYear: 1920, toYear: y };
    case "expiry":
      return { fromYear: y, toYear: y + 15 };
    default:
      return { fromYear: y, toYear: y + 2 };
  }
}

export function parseIsoDate(value: string): Date | undefined {
  if (!value?.trim()) return undefined;
  const iso = parse(value, "yyyy-MM-dd", new Date());
  if (isValid(iso)) return startOfDay(iso);
  const dmy = parse(value, "dd/MM/yyyy", new Date());
  if (isValid(dmy)) return startOfDay(dmy);
  return undefined;
}

export function toIsoDateString(date: Date | undefined): string {
  if (!date || !isValid(date)) return "";
  return format(date, "yyyy-MM-dd");
}

interface DatePickerFieldProps {
  label: string;
  /** Selected date (Gregorian) */
  date?: Date;
  onChange?: (d: Date | undefined) => void;
  /** Alternative: ISO `yyyy-MM-dd` string (for forms) */
  isoValue?: string;
  onIsoChange?: (iso: string) => void;
  placeholder?: string;
  disabled?: (date: Date) => boolean;
  className?: string;
  mode?: DatePickerMode;
  /** Allow typing dd/MM/yyyy in the text field */
  allowManualInput?: boolean;
}

export function DatePickerField({
  label,
  date: dateProp,
  onChange,
  isoValue,
  onIsoChange,
  placeholder = "Select date",
  disabled,
  className,
  mode = "travel",
  allowManualInput = true,
}: DatePickerFieldProps) {
  const [open, setOpen] = React.useState(false);
  const [textValue, setTextValue] = React.useState("");
  const [textError, setTextError] = React.useState<string | null>(null);

  const date = React.useMemo(() => {
    if (dateProp) return dateProp;
    if (isoValue) return parseIsoDate(isoValue);
    return undefined;
  }, [dateProp, isoValue]);

  const { fromYear, toYear } = yearRange(mode);

  React.useEffect(() => {
    if (date) setTextValue(format(date, "dd/MM/yyyy"));
    else if (!isoValue) setTextValue("");
  }, [date, isoValue]);

  const commitDate = (d: Date | undefined) => {
    setTextError(null);
    onChange?.(d);
    onIsoChange?.(d ? toIsoDateString(d) : "");
    if (d) setTextValue(format(d, "dd/MM/yyyy"));
    else setTextValue("");
  };

  const handleTextBlur = () => {
    if (!textValue.trim()) {
      commitDate(undefined);
      return;
    }
    const parsed = parse(textValue.trim(), "dd/MM/yyyy", new Date());
    if (!isValid(parsed)) {
      setTextError("Use dd/MM/yyyy (e.g. 15/06/1990)");
      return;
    }
    const day = startOfDay(parsed);
    if (disabled?.(day)) {
      setTextError("Date not available");
      return;
    }
    if (parsed.getFullYear() < fromYear || parsed.getFullYear() > toYear) {
      setTextError(`Year must be between ${fromYear} and ${toYear}`);
      return;
    }
    commitDate(day);
  };

  const defaultMonth = date ?? new Date(fromYear, 0, 1);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>

      <div className="flex flex-col gap-2 sm:flex-row">
        {allowManualInput ? (
          <div className="relative flex-1">
            <Input
              type="text"
              inputMode="numeric"
              placeholder="dd/MM/yyyy"
              value={textValue}
              onChange={(e) => {
                setTextValue(e.target.value);
                setTextError(null);
              }}
              onBlur={handleTextBlur}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleTextBlur();
                }
              }}
              className={cn(
                "h-12 rounded-xl pr-10",
                textError && "border-destructive",
              )}
              aria-label={`${label} (Gregorian calendar, format dd/MM/yyyy)`}
            />
            {textError ? (
              <p className="mt-1 text-xs text-destructive">{textError}</p>
            ) : (
              <p className="mt-1 text-[10px] text-muted-foreground">
                Gregorian calendar · {fromYear}–{toYear}
              </p>
            )}
          </div>
        ) : null}

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className={cn(
                "h-12 shrink-0 justify-start rounded-xl border-input bg-background/70 font-normal shadow-sm backdrop-blur dark:bg-background/40",
                allowManualInput ? "sm:w-auto" : "w-full flex-1 text-left",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
              {date ? format(date, "d MMM yyyy", { locale: enGB }) : placeholder}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => {
                commitDate(d);
                setOpen(false);
              }}
              defaultMonth={defaultMonth}
              disabled={disabled}
              fromYear={fromYear}
              toYear={toYear}
              locale={enGB}
              captionLayout="dropdown-buttons"
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
