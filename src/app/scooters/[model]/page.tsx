import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import VehiclePage from "@/components/VehiclePage";
import {
  SCOOTERS,
  getVehicle,
  isScooter,
  vehicleHref,
  vehicleListHref,
} from "@/lib/catalog";
import { vehicleFaqItems } from "@/lib/vehicleFaq";
import {
  breadcrumbSchema,
  createMetadata,
  faqSchema,
  productSchema,
} from "@/lib/seo";

/** These pages read `params`, so they are allowed to block the first render. */
export const instant = false;

export function generateStaticParams() {
  return SCOOTERS.map((v) => ({ model: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ model: string }>;
}): Promise<Metadata> {
  const { model } = await params;
  const m = getVehicle(model);
  if (!m) {
    return createMetadata({
      title: "Model not found",
      description: "This TVS scooter is not available on this page.",
      path: `/scooters/${model}`,
      noindex: true,
    });
  }
  return createMetadata({
    title: `${m.name} — Price, Specs & Test Ride`,
    description: `${m.name} at Zaidi TVS, Chandpur — ${m.desc} Get today's on-road price, EMI options and book a free test ride in Uttar Pradesh.`,
    path: vehicleHref(m),
    keywords: [
      m.name,
      `${m.name} price in Chandpur`,
      `${m.name} on-road price`,
      `${m.shortName} mileage`,
      `${m.shortName} test ride`,
      `TVS ${m.shortName} finance`,
    ],
    image: m.image,
    imageAlt: m.name,
  });
}

export default async function ScooterModelPage({
  params,
}: {
  params: Promise<{ model: string }>;
}) {
  const { model } = await params;
  const m = getVehicle(model);
  if (!m) notFound();
  // Motorcycles & mopeds live under /bikes.
  if (!isScooter(m)) redirect(vehicleHref(m));

  const listHref = vehicleListHref(m);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Scooters", url: listHref },
          { name: m.shortName, url: vehicleHref(m) },
        ])}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={productSchema({
          name: m.name,
          description: m.desc,
          url: vehicleHref(m),
          image: m.image,
          price: m.price,
          category: m.kind,
          brand: "TVS",
        })}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={faqSchema(vehicleFaqItems(m))}
      />
      <VehiclePage vehicle={m} />
    </>
  );
}
