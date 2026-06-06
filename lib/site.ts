export const SITE = {
  name: "FlyWorld",
  tagline: "Premium Last-Minute Flights & Holidays",
  phones: ["+442081504583", "+442080445158"] as const,
  whatsapp: {
    number: "+442080445158",
    url: "https://wa.me/442080445158",
  },
  email: "hello@flyworld.travel",
  supportHours: {
    weekdays: "Monday – Friday · 8:00am – 10:00pm",
    saturday: "Saturday · 9:00am – 8:00pm",
    sunday: "Sunday · 10:00am – 6:00pm",
    phoneLine: "Mon–Sun · 8am to 10pm",
  },
  offices: [
    {
      label: "London (Head Office)",
      lines: ["86-90 Paul Street", "London, UK", "EC2A 4NE"],
      hours: "Mon–Sat 9am–6pm",
    },
    {
      label: "Manchester",
      lines: ["45 Deansgate", "Manchester M3 2EG"],
      hours: "Mon–Sat 9am–5:30pm",
    },
    {
      label: "Birmingham",
      lines: ["78 New Street", "Birmingham B2 4BA"],
      hours: "Mon–Sat 9am–5:30pm",
    },
  ],
  stats: [
    { value: "2M+", label: "Happy Travellers" },
    { value: "500+", label: "Destinations" },
    { value: "15", label: "Years Experience" },
    { value: "4.9★", label: "Trustpilot" },
  ],
} as const;
