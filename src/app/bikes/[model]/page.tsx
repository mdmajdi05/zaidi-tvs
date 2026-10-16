import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import VehiclePage from "@/components/VehiclePage";
import { MOPEDS, MOTORCYCLES, getVehicle, isScooter, vehicleHref } from "@/lib/catalog";

/** These pages read `params`, so they are allowed to block the first render. */
export const instant = false;

export function generateStaticParams() {
  return [...MOTORCYCLES, ...MOPEDS].map((v) => ({ model: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ model: string }>;
}): Promise<Metadata> {
  const { model } = await params;
  const m = getVehicle(model);
  if (!m) return { title: "Model not found" };
  return {
    title: m.name,
    description: `${m.name} at Zaidi TVS, Chandpur — ${m.desc} Book a free test ride today.`,
    alternates: { canonical: vehicleHref(m) },
    openGraph: {
      title: `${m.name} — Zaidi TVS`,
      description: m.desc,
      images: [m.image],
    },
  };
}

export default async function BikeModelPage({
  params,
}: {
  params: Promise<{ model: string }>;
}) {
  const { model } = await params;
  const m = getVehicle(model);
  if (!m) notFound();
  // Scooters & electrics have their own section.
  if (isScooter(m)) redirect(vehicleHref(m));
  return <VehiclePage vehicle={m} />;
}
