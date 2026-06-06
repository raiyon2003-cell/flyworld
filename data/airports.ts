import type { Airport } from "@/lib/types";

export const AIRPORTS: Airport[] = [
  { code: "DXB", city: "Dubai", country: "UAE", name: "Dubai International" },
  { code: "LHR", city: "London", country: "UK", name: "Heathrow" },
  { code: "CDG", city: "Paris", country: "France", name: "Charles de Gaulle" },
  { code: "IST", city: "Istanbul", country: "Turkey", name: "Istanbul Airport" },
  { code: "JFK", city: "New York", country: "USA", name: "John F. Kennedy Intl" },
  { code: "NRT", city: "Tokyo", country: "Japan", name: "Narita International" },
  { code: "SIN", city: "Singapore", country: "Singapore", name: "Changi" },
  { code: "LAX", city: "Los Angeles", country: "USA", name: "Los Angeles Intl" },
  { code: "SFO", city: "San Francisco", country: "USA", name: "San Francisco Intl" },
  { code: "DEL", city: "Delhi", country: "India", name: "Indira Gandhi Intl" },
  { code: "BOM", city: "Mumbai", country: "India", name: "Chhatrapati Shivaji Maharaj" },
  { code: "LHE", city: "Lahore", country: "Pakistan", name: "Allama Iqbal Intl" },
  { code: "ISB", city: "Islamabad", country: "Pakistan", name: "Islamabad Intl" },
  { code: "KHI", city: "Karachi", country: "Pakistan", name: "Jinnah Intl" },
  { code: "SYD", city: "Sydney", country: "Australia", name: "Kingsford Smith" },
  { code: "FCO", city: "Rome", country: "Italy", name: "Fiumicino" },
  { code: "BCN", city: "Barcelona", country: "Spain", name: "El Prat" },
  { code: "AMS", city: "Amsterdam", country: "Netherlands", name: "Schiphol" },
  { code: "FRA", city: "Frankfurt", country: "Germany", name: "Frankfurt Airport" },
  { code: "DOH", city: "Doha", country: "Qatar", name: "Hamad International" },
  { code: "AUH", city: "Abu Dhabi", country: "UAE", name: "Zayed International" },
];

export function searchAirports(query: string): Airport[] {
  const q = query.trim().toLowerCase();
  if (!q) return AIRPORTS.slice(0, 8);
  return AIRPORTS.filter(
    (a) =>
      a.code.toLowerCase().includes(q) ||
      a.city.toLowerCase().includes(q) ||
      a.country.toLowerCase().includes(q) ||
      a.name.toLowerCase().includes(q),
  ).slice(0, 12);
}
