/**
 * Real TVS 360° turntable frame sequences.
 *
 * Every frame set lives in `/public/360/<folder>/NN.webp` — one image per
 * rotation step, downloaded from the TVS Motor website. Models that share a
 * body style reuse the closest real TVS sequence so every bike page has a
 * genuine 360° viewer.
 */
const SEQUENCES: Record<string, number> = {
  "apache-rtr-310": 25,
  radeon: 16,
  ntorq: 36,
  sport: 12,
  raider: 9,
  jupiter: 25,
  orbiter: 25,
};

/** Bike slug → /public/360 folder name (every showroom model that has frames). */
export const SPIN_FOLDER_BY_SLUG: Record<string, string> = {
  // Apache family — share the Apache RTR 310 turntable.
  "apache-rtr-160": "apache-rtr-310",
  "apache-rtr-180": "apache-rtr-310",
  "apache-rtr-200": "apache-rtr-310",
  "apache-rtr-310": "apache-rtr-310",
  "apache-rr-310": "apache-rtr-310",
  "apache-rtx-300": "apache-rtr-310",
  // Naked / commuter motorcycles.
  ronin: "raider",
  raider: "raider",
  radeon: "radeon",
  sport: "sport",
  "star-city-plus": "radeon",
  // Scooters.
  jupiter: "jupiter",
  "jupiter-125": "jupiter",
  ntorq: "ntorq",
  "ntorq-150": "ntorq",
  "zest-110": "jupiter",
  // Electric scooters.
  iqube: "orbiter",
  orbiter: "orbiter",
  "tvs-x": "orbiter",
};

/** Returns the ordered frame paths for a /public/360 folder (empty if unknown). */
export function spinFrames(folder: string): string[] {
  const count = SEQUENCES[folder];
  if (!count) return [];
  return Array.from(
    { length: count },
    (_, i) => `/360/${folder}/${String(i + 1).padStart(2, "0")}.webp`
  );
}

/** Ordered 360° frames for a bike slug (every slug is mapped). */
export function spinFramesForSlug(slug: string): string[] {
  const folder = SPIN_FOLDER_BY_SLUG[slug];
  return folder ? spinFrames(folder) : [];
}
