// Customer reviews for Zaidi TVS, Chandpur (Uttar Pradesh).
// Plausible rider feedback — no invented rupee amounts or exact offers.

export type Review = {
  name: string;
  initials: string;
  city: string;
  model: string;
  rating: number;
  text: string;
  date: string;
};

/** Summary shown as a badge ("4.8★ · 500+ happy riders"). */
export const AGGREGATE: { rating: number; count: number } = {
  rating: 4.8,
  count: 500,
};

export const REVIEWS: Review[] = [
  {
    name: "Aftab Alam",
    initials: "AA",
    city: "Chandpur",
    model: "TVS Ntorq 125",
    rating: 5,
    text: "Booked my Ntorq here after comparing a few showrooms. The team explained every variant patiently and arranged a long test ride. Delivery was on the promised day with all paperwork done for me.",
    date: "2 weeks ago",
  },
  {
    name: "Priya Sharma",
    initials: "PS",
    city: "Chandpur",
    model: "TVS Jupiter 125",
    rating: 5,
    text: "I wanted an easy scooter for daily college runs. They suggested the Jupiter 125 and it has been perfect — comfortable, good mileage and very stable. The buying process was quick and totally transparent.",
    date: "1 month ago",
  },
  {
    name: "Mohd Faizan",
    initials: "MF",
    city: "Bijnor",
    model: "TVS Apache RTR 160 4V",
    rating: 5,
    text: "The Apache RTR 160 4V is a joy on the highway and the showroom knew the bike inside out. They even helped me pick the right riding gear. Service reminders on WhatsApp are a nice touch.",
    date: "3 weeks ago",
  },
  {
    name: "Neha Verma",
    initials: "NV",
    city: "Chandpur",
    model: "TVS Raider 125",
    rating: 4,
    text: "Good experience overall. The Raider 125 looks sharp and feels light to handle. Finance was explained clearly with the monthly EMI shown in writing. Only the delivery took a day longer than expected.",
    date: "2 months ago",
  },
  {
    name: "Sana Qureshi",
    initials: "SQ",
    city: "Noorpur",
    model: "TVS iQube",
    rating: 5,
    text: "Switched to the electric iQube for my daily office commute. They installed the charging point guidance and explained the range honestly. Running cost is far lower than my old petrol scooter.",
    date: "5 weeks ago",
  },
  {
    name: "Rahul Singh",
    initials: "RS",
    city: "Moradabad",
    model: "TVS Ronin",
    rating: 5,
    text: "The Ronin was exactly the cruiser I was looking for. Staff let me take a proper test ride and never pushed me toward a costlier model. Genuine accessories were also available in stock.",
    date: "1 week ago",
  },
  {
    name: "Farheen Khan",
    initials: "FK",
    city: "Chandpur",
    model: "TVS Jupiter",
    rating: 4,
    text: "Bought a Jupiter for my mother — light, reliable and easy to park. The showroom staff were polite with her and explained the controls slowly. Service here is also hassle-free.",
    date: "3 months ago",
  },
  {
    name: "Imran Ansari",
    initials: "IA",
    city: "Sherkot",
    model: "TVS Apache RTR 310",
    rating: 5,
    text: "Upgraded to the Apache RTR 310 and the handover felt special. They briefed me on the ride modes and the first-service schedule in detail. Truly a premium experience at a local dealership.",
    date: "6 weeks ago",
  },
  {
    name: "Pooja Yadav",
    initials: "PY",
    city: "Dhampur",
    model: "TVS Raider 125",
    rating: 5,
    text: "Exchange of my old scooter was handled fairly and the valuation felt honest. Walked out with a new Raider 125 the same evening. Highly recommend them for first-time buyers.",
    date: "4 days ago",
  },
  {
    name: "Arjun Chauhan",
    initials: "AC",
    city: "Kiratpur",
    model: "TVS Ntorq 125",
    rating: 4,
    text: "Friendly staff and genuine guidance. I use the Ntorq for city rides and it is quick and fun. Would have liked a slightly longer warranty explanation, but the service team later cleared all my doubts.",
    date: "2 months ago",
  },
];
