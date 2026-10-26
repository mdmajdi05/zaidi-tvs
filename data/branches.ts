// Zaidi TVS facilities data.
//
// ⚠️ YEH FILE AB site.ts SE INFO LETI HAI.
// Address / phone / hours / maps badalne ke liye `data/site.ts` edit karo —
// yahan kuch chhune ki zaroorat nahi.
//
// Both facilities are departments of the ONE Zaidi TVS dealership in
// Chandpur, Uttar Pradesh — they are NOT separate branches in other cities.
// TODO(owner): confirm the exact landmark / pin for each counter and update
// `data/site.ts` if the map location changes.

import {
  ADDRESS_LINE,
  CONTACT,
  HOURS,
  MAP_EMBED_URL,
  MAPS_URL,
  SITE,
} from "./site";

export type Branch = {
  id: string;
  name: string;
  kind: string;
  address: string;
  phone: string;
  whatsapp: string;
  hours: Array<{ day: string; time: string }>;
  mapsQuery: string;
  mapEmbed: string;
  note?: string;
};

export const BRANCHES: Branch[] = [
  {
    id: "showroom",
    name: `${SITE.name} — Sales`,
    kind: "Sales & test rides",
    address: ADDRESS_LINE,
    phone: CONTACT.salesPhone,
    whatsapp: CONTACT.whatsappHref,
    hours: HOURS,
    mapsQuery: MAPS_URL,
    mapEmbed: MAP_EMBED_URL,
    note: "Walk in for free test rides across the complete TVS range — bring your licence.",
  },
  {
    id: "service",
    name: `${SITE.name} — Service and Spare Parts`,
    kind: "Service, spares & repairs",
    address: ADDRESS_LINE,
    phone: CONTACT.servicePhone,
    whatsapp: CONTACT.whatsappHref,
    hours: HOURS,
    mapsQuery: MAPS_URL,
    mapEmbed: MAP_EMBED_URL,
    note: "Periodic service, repairs, battery/electrical work and genuine TVS spare parts — all at one counter.",
  },
];

export const DOORSTEP = {
  title: "Doorstep pickup & drop",
  text: `No time to ride down? We collect your two-wheeler from your doorstep, service it at our ${SITE.city} workshop and bring it back washed and ready.`,
  steps: [
    "Tell us your bike/scooter, the service you need and your address on call or WhatsApp.",
    "Confirm a pickup slot — our rider collects the vehicle from your doorstep.",
    "Trained TVS technicians service it at the workshop with genuine parts and a transparent estimate.",
    "We deliver the vehicle back to your doorstep, washed and ready to ride.",
  ],
};
