export type VehicleKind = "Motorcycle" | "Scooter" | "Electric" | "Moped";

export type Vehicle = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  kind: VehicleKind;
  image: string;
  gallery: string[];
  engine: string;
  power: string;
  mileage: string;
  weight: string;
  /** Indicative ex-showroom price, e.g. "₹1,99,500*". */
  price?: string;
  desc: string;
  features: Array<[string, string, string]>;
};


export const BIKES: Vehicle[] = [
  {
    slug: "apache-rtr-160",
    name: "TVS Apache RTR 160 4V",
    shortName: "Apache 160",
    tagline: "STREET AGGRESSION",
    kind: "Motorcycle",
    image: "/assets/performance-bike.jpg",
    gallery: ["/assets/performance-bike.jpg", "/assets/hero-bike.jpg", "/assets/cta-bg.jpg", "/assets/quiz-rider.jpg"],
    engine: "159.7 CC",
    power: "17.55 PS",
    mileage: "Up to 45 km/l*",
    weight: "144 kg*",
    desc: "Sharp, race-bred 160 with three ride modes, LED lighting and a chassis tuned on the track.",
    features: [
      ["ϟ", "Race-tuned engine", "159.7 cc 4-valve engine with three ride modes."],
      ["◉", "All-LED lighting", "Signature LED headlamp with sharp DRLs."],
      ["⌁", "SmartXonnect", "Bluetooth console with navigation and call alerts."],
      ["✦", "Track-tuned chassis", "Confident handling with race-spec suspension."],
    ],
  },
  {
    slug: "apache-rtr-180",
    name: "TVS Apache RTR 180",
    shortName: "Apache 180",
    tagline: "PURE POWER",
    kind: "Motorcycle",
    image: "/assets/hero-bike.jpg",
    gallery: ["/assets/hero-bike.jpg", "/assets/performance-bike.jpg", "/assets/quiz-rider.jpg", "/assets/cta-bg.jpg"],
    engine: "177.4 CC",
    power: "16.8 PS",
    mileage: "Up to 40 km/l*",
    weight: "140 kg*",
    desc: "The legendary 180 that made the Apache name — strong mid-range punch and race-tuned dynamics.",
    features: [
      ["ϟ", "Muscular 177 cc", "Strong low and mid-range for quick overtakes."],
      ["◉", "RTR styling", "Aggressive bodywork and race graphics."],
      ["⌁", "Digital console", "Ride info at a glance with sporty display."],
      ["✦", "ABS safety", "Dependable braking with ABS confidence."],
    ],
  },
  {
    slug: "apache-rtr-200",
    name: "TVS Apache RTR 200 4V",
    shortName: "Apache 200 4V",
    tagline: "TRACK BRED",
    kind: "Motorcycle",
    image: "/assets/cta-bg.jpg",
    gallery: ["/assets/cta-bg.jpg", "/assets/hero-bike.jpg", "/assets/performance-bike.jpg", "/assets/quiz-rider.jpg"],
    engine: "197.75 CC",
    power: "20.8 PS",
    mileage: "Up to 38 km/l*",
    weight: "152 kg*",
    desc: "The most powerful RTR in its class — race-derived 4-valve engine with track-focused suspension.",
    features: [
      ["ϟ", "20.8 PS punch", "Race-derived 197.75 cc oil-cooled engine."],
      ["◉", "LED headlamp", "Sharp lighting with race-inspired cowl."],
      ["⌁", "Ride modes", "Sport, Urban and Rain modes at your fingertips."],
      ["✦", "Track suspension", "Preload-adjustable rear monoshock."],
    ],
  },
  {
    slug: "apache-rtr-310",
    name: "TVS Apache RTR 310",
    shortName: "Apache RTR 310",
    tagline: "UNLEASH THE BEAST",
    kind: "Motorcycle",
    image: "/assets/hero-bike.jpg",
    gallery: ["/assets/hero-bike.jpg", "/assets/cta-bg.jpg", "/assets/performance-bike.jpg", "/assets/quiz-rider.jpg"],
    engine: "312.2 CC",
    power: "35.6 PS",
    mileage: "Up to 30 km/l*",
    weight: "169 kg*",
    desc: "A 310 cc streetfighter with cornering ABS, traction control and a race-tuned ride-by-wire engine.",
    features: [
      ["ϟ", "312 cc power", "35.6 PS ride-by-wire engine with slick assist clutch."],
      ["◉", "Adaptive lighting", "Cornering headlamp that follows your lean."],
      ["⌁", "5 ride modes", "Street, Sport, Rain, Urban and Track modes."],
      ["✦", "Cornering ABS", "Race-grade electronics with traction control."],
    ],
  },
  {
    slug: "apache-rr-310",
    name: "TVS Apache RR 310",
    shortName: "Apache RR 310",
    tagline: "RACE SPEC",
    kind: "Motorcycle",
    image: "/assets/cta-bg.jpg",
    gallery: ["/assets/cta-bg.jpg", "/assets/hero-bike.jpg", "/assets/performance-bike.jpg", "/assets/quiz-rider.jpg"],
    engine: "312.2 CC",
    power: "34 PS",
    mileage: "Up to 30 km/l*",
    weight: "174 kg*",
    desc: "A full-faired supersport born on the track — wind-tunnel styling and a race-tuned chassis.",
    features: [
      ["ϟ", "Track engine", "312.2 cc reverse-inclined engine with ride modes."],
      ["◉", "Bi-LED projector", "Sharp, aerodynamic bi-LED lighting."],
      ["⌁", "TFT console", "Full-colour display with lap and ride data."],
      ["✦", "Aerodynamic body", "Race-derived fairing for high-speed stability."],
    ],
  },
  {
    slug: "apache-rtx-300",
    name: "TVS Apache RTX 300",
    shortName: "RTX 300",
    tagline: "BORN TO ESCAPE",
    kind: "Motorcycle",
    image: "/TVS%20BIKES/Apache%20rtx310/RIDER%20WITH%20BIKE-D.webp",
    gallery: [
      "/TVS%20BIKES/Apache%20rtx310/TVS%20Apache%20RTX%20Website%20Adapts_Desktop-1095x711%202.webp",
      "/TVS%20BIKES/Apache%20rtx310/TVS%20Apache%20RTX%20Website%20Image6.webp",
      "/TVS%20BIKES/Apache%20rtx310/TVS%20Apache%20RTX%20Website%20Image7.webp",
      "/TVS%20BIKES/Apache%20rtx310/TVS%20Apache%20RTX%20Website%20Image8.webp",
    ],
    engine: "299.1 CC",
    power: "35.5 PS",
    mileage: "Up to 35 km/l*",
    weight: "180 kg*",
    price: "₹1,99,500*",
    desc: "TVS's first adventure tourer — a torquey 300 cc engine, long-travel suspension and touring-ready ergonomics for highways and trails alike.",
    features: [
      ["ϟ", "299 cc torque", "Punchy liquid-cooled engine with strong low-end pull."],
      ["◉", "Twin LED headlamps", "Adventure-style face with tall windscreen."],
      ["⌁", "TFT console", "Connected display with navigation and ride modes."],
      ["✦", "Long-travel suspension", "USD forks and monoshock tuned for bad roads."],
    ],
  },
  {
    slug: "ronin",
    name: "TVS Ronin",
    shortName: "Ronin",
    tagline: "THE MODERN RETRO",
    kind: "Motorcycle",
    image: "/assets/quiz-rider.jpg",
    gallery: ["/assets/quiz-rider.jpg", "/assets/hero-bike.jpg", "/assets/cta-bg.jpg", "/assets/performance-bike.jpg"],
    engine: "225.9 CC",
    power: "20.4 PS",
    mileage: "Up to 40 km/l*",
    weight: "160 kg*",
    desc: "A modern-retro scrambler with a punchy 226 cc engine, dual-channel ABS and easy-going ergonomics.",
    features: [
      ["ϟ", "225.9 cc torque", "Smooth low-end torque for city and trail."],
      ["◉", "Retro round LED", "Classic round headlamp with modern LED tech."],
      ["⌁", "Connected console", "Voice assist and navigation with SmartXonnect."],
      ["✦", "Dual-channel ABS", "Confidence on gravel and tarmac."],
    ],
  },
  {
    slug: "raider",
    name: "TVS Raider 125",
    shortName: "Raider",
    tagline: "PLAY SMART",
    kind: "Motorcycle",
    image: "/assets/performance-bike.jpg",
    gallery: ["/assets/performance-bike.jpg", "/assets/hero-bike.jpg", "/assets/quiz-rider.jpg", "/assets/cta-bg.jpg"],
    engine: "124.8 CC",
    power: "11.2 PS",
    mileage: "Up to 67 km/l*",
    weight: "123 kg*",
    desc: "The 125 that thinks it is bigger — aggressive styling, connected tech and class-leading mileage.",
    features: [
      ["ϟ", "Punchy 125", "Strong low-end torque for quick city getaways."],
      ["◉", "Aggressive styling", "Sharp tank shrouds and sporty LED headlamp."],
      ["⌁", "Bluetooth console", "Digital cluster with ride modes and alerts."],
      ["✦", "Great mileage", "Thrill without the fuel bills — up to 67 km/l*."],
    ],
  },
  {
    slug: "radeon",
    name: "TVS Radeon",
    shortName: "Radeon",
    tagline: "BUILT FOR LIFE",
    kind: "Motorcycle",
    image: "/assets/city-rider.jpg",
    gallery: ["/assets/city-rider.jpg", "/assets/quiz-rider.jpg", "/assets/performance-bike.jpg", "/assets/cta-bg.jpg"],
    engine: "109.7 CC",
    power: "8.19 PS",
    mileage: "Up to 65 km/l*",
    weight: "116 kg*",
    price: "₹60,000*",
    desc: "A dependable commuter built for the long haul — tough, comfortable and remarkably fuel-efficient.",
    features: [
      ["ϟ", "Reliable 110", "Smooth and durable 109.7 cc DuraLife engine."],
      ["◉", "LED headlamp", "Bright LED lighting for early rides."],
      ["⌁", "USB charging", "Charge on the move with an onboard USB port."],
      ["✦", "Comfort seat", "Long, cushioned seat for everyday comfort."],
    ],
  },
  {
    slug: "sport",
    name: "TVS Sport",
    shortName: "Sport",
    tagline: "MILEAGE KA BADSHAH",
    kind: "Motorcycle",
    image: "/assets/performance-bike.jpg",
    gallery: ["/assets/performance-bike.jpg", "/assets/city-rider.jpg", "/assets/quiz-rider.jpg", "/assets/cta-bg.jpg"],
    engine: "109.7 CC",
    power: "8.29 PS",
    mileage: "Up to 70 km/l*",
    weight: "110 kg*",
    desc: "Light, nimble and famously frugal — the everyday commuter that keeps costs down and comfort up.",
    features: [
      ["ϟ", "Eco-thrift engine", "Fine-tuned 109.7 cc for excellent mileage."],
      ["◉", "Halogen/ LED option", "Clear, dependable illumination."],
      ["⌁", "Easy start", "Reliable ignition and low-maintenance build."],
      ["✦", "Light & nimble", "Just 110 kg* — easy to ride and park."],
    ],
  },
  {
    slug: "star-city-plus",
    name: "TVS Star City+",
    shortName: "Star City+",
    tagline: "SHINE EVERY DAY",
    kind: "Motorcycle",
    image: "/assets/city-rider.jpg",
    gallery: ["/assets/city-rider.jpg", "/assets/performance-bike.jpg", "/assets/quiz-rider.jpg", "/assets/cta-bg.jpg"],
    engine: "109.7 CC",
    power: "8.08 PS",
    mileage: "Up to 70 km/l*",
    weight: "108 kg*",
    desc: "A stylish, refined commuter with premium chrome detailing and a smooth, vibration-free ride.",
    features: [
      ["ϟ", "Refined 110", "Smooth 109.7 cc engine with EcoThrust fuel injection."],
      ["◉", "Premium styling", "Chrome accents and a modern headlamp."],
      ["⌁", "Digital-analog console", "Clear readouts with fuel-efficiency assist."],
      ["✦", "Comfort ride", "Well-tuned suspension for city roads."],
    ],
  },
  {
    slug: "jupiter",
    name: "TVS Jupiter",
    shortName: "Jupiter",
    tagline: "FAMILY FAVOURITE",
    kind: "Scooter",
    image: "/assets/family-rider.jpg",
    gallery: ["/assets/family-rider.jpg", "/assets/style-scooter.jpg", "/assets/city-rider.jpg", "/assets/quiz-rider.jpg"],
    engine: "113.3 CC",
    power: "7.9 PS",
    mileage: "Up to 50 km/l*",
    weight: "105 kg*",
    price: "₹76,000*",
    desc: "India's best-selling family scooter — comfortable seat, big boot and smooth, refined ride quality.",
    features: [
      ["♧", "Family comfort", "Long, well-cushioned seat that keeps everyone comfortable."],
      ["▤", "Big boot space", "Room for helmets, bags and everyday essentials."],
      ["◉", "Refined engine", "Smooth and silent 113.3 cc performance with great mileage."],
      ["✦", "Easy handling", "Light, balanced and confidence-inspiring for every rider."],
    ],
  },
  {
    slug: "jupiter-125",
    name: "TVS Jupiter 125",
    shortName: "Jupiter 125",
    tagline: "FAMILY, UPGRADED",
    kind: "Scooter",
    image: "/assets/family-rider.jpg",
    gallery: ["/assets/family-rider.jpg", "/assets/style-scooter.jpg", "/assets/city-rider.jpg", "/assets/featured-bike.jpg"],
    engine: "124.8 CC",
    power: "8.15 PS",
    mileage: "Up to 57 km/l*",
    weight: "108 kg*",
    desc: "The 125 cc Jupiter — more power, more room and a bigger boot, with the same easy-going comfort families love.",
    features: [
      ["♧", "Extra room", "Longer seat and more legroom for two-up family rides."],
      ["▤", "Deep boot space", "Largest underseat storage in its class, plus front utility space."],
      ["◉", "Refined 125", "Smooth 124.8 cc engine with easy roll-on power."],
      ["✦", "Comfort suspension", "Absorbs city potholes and broken village roads alike."],
    ],
  },
  {
    slug: "ntorq",
    name: "TVS Ntorq 125",
    shortName: "Ntorq 125",
    tagline: "RIDE THE NEXT",
    kind: "Scooter",
    image: "/assets/featured-bike.jpg",
    gallery: ["/assets/featured-bike.jpg", "/assets/style-scooter.jpg", "/assets/city-rider.jpg", "/assets/family-rider.jpg"],
    engine: "124.8 CC",
    power: "9.4 PS",
    mileage: "Up to 40 km/l*",
    weight: "118 kg*",
    price: "₹86,000*",
    desc: "India's smartest sporty scooter with race-tuned engine, LED headlamps and TVS SmartXonnect.",
    features: [
      ["ϟ", "Race-tuned engine", "Punchy 124.8 cc performance with a sporty exhaust note."],
      ["◉", "LED headlamps", "Bright, sharp LED lighting for sharper night visibility."],
      ["⌁", "SmartXonnect", "Connected console with navigation assist, call alerts and ride stats."],
      ["✦", "Sporty styling", "Aggressive graphics and street presence that turns heads."],
    ],
  },
  {
    slug: "ntorq-150",
    name: "TVS Ntorq 150",
    shortName: "Ntorq 150",
    tagline: "THE FAST ONE",
    kind: "Scooter",
    image: "/assets/featured-bike.jpg",
    gallery: ["/assets/featured-bike.jpg", "/assets/style-scooter.jpg", "/assets/city-rider.jpg", "/assets/family-rider.jpg"],
    engine: "149.5 CC",
    power: "13.6 PS",
    mileage: "Up to 38 km/l*",
    weight: "125 kg*",
    desc: "The sportiest Ntorq yet — a 150 cc engine, sharper handling and a fully connected console built for the fast lane.",
    features: [
      ["ϟ", "150 cc punch", "The quickest scooter in its class off the line."],
      ["◉", "Full LED lighting", "Sharp LED headlamp with a sporty tail lamp."],
      ["⌁", "SmartXonnect TFT", "Colour console with navigation, call alerts and ride stats."],
      ["✦", "Sporty dynamics", "Stiffer suspension and wider tyres for confident cornering."],
    ],
  },
  {
    slug: "zest-110",
    name: "TVS Zest 110",
    shortName: "Zest 110",
    tagline: "LIGHT & LIVELY",
    kind: "Scooter",
    image: "/assets/style-scooter.jpg",
    gallery: ["/assets/style-scooter.jpg", "/assets/family-rider.jpg", "/assets/city-rider.jpg", "/assets/featured-bike.jpg"],
    engine: "109.7 CC",
    power: "8.13 PS",
    mileage: "Up to 62 km/l*",
    weight: "103 kg*",
    desc: "A light, nippy 110 cc scooter that is easy to park, easy to ride and delightfully light on the pocket.",
    features: [
      ["ϟ", "Peppy 110", "Smooth 109.7 cc engine with quick city acceleration."],
      ["◉", "LED headlamp", "Bright, clear lighting for early and late rides."],
      ["⌁", "USB charger", "Keep your phone topped up on the move."],
      ["✦", "Great mileage", "Up to 62 km/l* for fuss-free everyday running."],
    ],
  },
  {
    slug: "iqube",
    name: "TVS iQube",
    shortName: "iQube",
    tagline: "GO ELECTRIC",
    kind: "Electric",
    image: "/assets/city-rider.jpg",
    gallery: ["/assets/city-rider.jpg", "/assets/style-scooter.jpg", "/assets/family-rider.jpg", "/assets/featured-bike.jpg"],
    engine: "Electric",
    power: "4.4 kW",
    mileage: "Up to 145 km/charge*",
    weight: "118 kg*",
    desc: "Silent, smart and stylish — the iQube makes city riding effortless and future-ready.",
    features: [
      ["ϟ", "Silent electric drive", "Instant torque with zero noise and zero tailpipe emissions."],
      ["◉", "Smart TFT console", "Navigation, range readout and connected features."],
      ["⌁", "Easy charging", "Charge at home or plug in around the city."],
      ["✦", "Low running cost", "Paise-per-km running that petrol can't match."],
    ],
  },
  {
    slug: "orbiter",
    name: "TVS Orbiter",
    shortName: "Orbiter",
    tagline: "THE NEW CITY ELECTRIC",
    kind: "Electric",
    image: "/assets/style-scooter.jpg",
    gallery: ["/assets/style-scooter.jpg", "/assets/city-rider.jpg", "/assets/family-rider.jpg", "/assets/featured-bike.jpg"],
    engine: "Electric",
    power: "4.4 kW",
    mileage: "Up to 100+ km/charge*",
    weight: "Light & easy*",
    desc: "TVS's new-generation electric scooter — practical range, connected tech and effortless city riding.",
    features: [
      ["ϟ", "Electric drive", "Smooth, near-silent acceleration off the line."],
      ["◉", "Connected dash", "Digital display with range and ride data."],
      ["⌁", "Flexible charging", "Convenient home and public charging options."],
      ["✦", "Zero emissions", "Clean, quiet and cheap to run every day."],
    ],
  },
  {
    slug: "tvs-x",
    name: "TVS X",
    shortName: "TVS X",
    tagline: "ELECTRIC PERFORMANCE",
    kind: "Electric",
    image: "/assets/featured-bike.jpg",
    gallery: ["/assets/featured-bike.jpg", "/assets/style-scooter.jpg", "/assets/city-rider.jpg", "/assets/family-rider.jpg"],
    engine: "Electric",
    power: "4.4 kW",
    mileage: "Up to 140 km/charge*",
    weight: "128 kg*",
    desc: "TVS's performance electric — a rigid alloy frame, a big connected display and quick, near-silent acceleration.",
    features: [
      ["ϟ", "Quick off the line", "Instant electric torque for city sprints."],
      ["◉", "Big TFT console", "Large connected display with navigation and themes."],
      ["⌁", "Fast charging", "Top up quickly at home or on public fast chargers."],
      ["✦", "Zero emissions", "Clean, quiet and cheap to run every single day."],
    ],
  },
  {
    slug: "xl100",
    name: "TVS XL100",
    shortName: "XL100",
    tagline: "THE EVERYDAY MOPED",
    kind: "Moped",
    image: "/assets/city-rider.jpg",
    gallery: ["/assets/city-rider.jpg", "/assets/quiz-rider.jpg", "/assets/performance-bike.jpg", "/assets/cta-bg.jpg"],
    engine: "99.7 CC",
    power: "4.4 PS",
    mileage: "Up to 65 km/l*",
    weight: "89 kg*",
    desc: "India's favourite moped — light, rugged and cheap to run. Perfect for daily errands, village roads and small loads.",
    features: [
      ["ϟ", "Rugged 100", "Tough 99.7 cc engine built for everyday duty."],
      ["◉", "Light and simple", "Just 89 kg* — easy to ride, park and load up."],
      ["⌁", "Low running cost", "Up to 65 km/l* keeps daily travel cheap."],
      ["✦", "Carry more", "Strong frame with room for a pillion and a load."],
    ],
  },
];

export const MOTORCYCLES: Vehicle[] = BIKES.filter((b) => b.kind === "Motorcycle");
export const SCOOTERS: Vehicle[] = BIKES.filter((b) => b.kind === "Scooter" || b.kind === "Electric");
export const MOPEDS: Vehicle[] = BIKES.filter((b) => b.kind === "Moped");

export function getVehicle(slug: string): Vehicle | undefined {
  return BIKES.find((b) => b.slug === slug);
}

/** Scooters and electrics share the `/scooters` pages. */
export function isScooter(v: Vehicle): boolean {
  return v.kind === "Scooter" || v.kind === "Electric";
}

/**
 * Canonical URL for a model: `/scooters/<slug>` for scooters & electrics,
 * `/bikes/<slug>` for motorcycles & mopeds.
 */
export function vehicleHref(v: Vehicle | string): string {
  const veh = typeof v === "string" ? getVehicle(v) : v;
  if (!veh) return "/bikes";
  return `${isScooter(veh) ? "/scooters" : "/bikes"}/${veh.slug}`;
}

/** The listing page a model belongs to (`/bikes` or `/scooters`). */
export function vehicleListHref(v: Vehicle | string): string {
  const veh = typeof v === "string" ? getVehicle(v) : v;
  return veh && isScooter(veh) ? "/scooters" : "/bikes";
}

/** Other models to suggest on a model page (same showroom section). */
export function vehicleFamily(v: Vehicle): Vehicle[] {
  if (isScooter(v)) return SCOOTERS;
  // Mopeds sit with the motorcycles, so suggest those (there is only one moped).
  return MOTORCYCLES;
}

/** Studio product cutout when we have one, otherwise the lifestyle photo. */
export function vehicleImage(v: Vehicle): string {
  return PRODUCT_IMAGES[v.slug] ?? v.image;
}

/**
 * Real TVS studio product shots (white-background catalogue images), keyed by
 * model slug. Used where we want to show the actual machine rather than a
 * lifestyle/rider photo — e.g. the "Find your perfect match" home cards.
 */
export const PRODUCT_IMAGES: Record<string, string> = {
  "apache-rtr-160": "/tvs/products/apache-rtr-160-4v.webp",
  "apache-rtr-180": "/tvs/products/apache-rtr-180.webp",
  "apache-rtr-200": "/tvs/products/apache-rtr-200-4v.webp",
  "apache-rtr-310": "/tvs/products/apache-rtr-310.webp",
  "apache-rr-310": "/tvs/products/apache-rr-310.webp",
  "apache-rtx-300": "/tvs/products/apache-rtx.png",
  ronin: "/tvs/products/ronin.webp",
  raider: "/tvs/products/raider.webp",
  radeon: "/tvs/products/radeon.webp",
  sport: "/tvs/products/sport.webp",
  "star-city-plus": "/tvs/products/radeon-new.webp",
  jupiter: "/tvs/products/jupiter.webp",
  ntorq: "/tvs/products/ntorq-125.webp",
  "ntorq-150": "/tvs/products/ntorq-150.png",
  "jupiter-125": "/tvs/products/jupiter-125.webp",
  "zest-110": "/tvs/products/zest-110.webp",
  iqube: "/tvs/products/iqube.webp",
  orbiter: "/tvs/products/orbiter.webp",
  "tvs-x": "/tvs/products/tvs-x.webp",
  xl100: "/tvs/products/xl100.webp",
};


export type Part = { name: string; icon: string; note: string };

/** Genuine TVS spare parts & accessories we stock for every model. */
export const PARTS: Part[] = [
  { name: "Air Filter", icon: "◍", note: "Better breathing, better mileage." },
  { name: "Oil Filter", icon: "◎", note: "Keeps your engine oil clean." },
  { name: "Spark Plug", icon: "⚡", note: "Crisp, reliable ignition." },
  { name: "Clutch Plates", icon: "◧", note: "Smooth, positive gear engagement." },
  { name: "Chain & Sprocket Kit", icon: "⛓", note: "Quiet, efficient power transfer." },
  { name: "Brake Pads & Shoes", icon: "◭", note: "Confident, fade-free stopping." },
  { name: "Disc Brake Kit", icon: "◉", note: "Factory-spec discs and pads." },
  { name: "Battery", icon: "▮", note: "Maintenance-free, long-life batteries." },
  { name: "Headlamp Assembly", icon: "✦", note: "LED & halogen units by model." },
  { name: "Mirror Set", icon: "⌐", note: "Genuine mirrors for a clear view." },
  { name: "Tyres & Tubes", icon: "◎", note: "TVS-approved tyres for every model." },
  { name: "Engine Oil & Coolant", icon: "♨", note: "Genuine TVS lubricants only." },
  { name: "Body Panels & Fairings", icon: "▤", note: "Factory-colour panels and decals." },
  { name: "Seat & Seat Cover", icon: "▬", note: "Comfort and durability." },
  { name: "Wiring Harness", icon: "⌁", note: "Reliable electrical connections." },
  { name: "Shock Absorbers", icon: "⇕", note: "Restore a plush, stable ride." },
];
