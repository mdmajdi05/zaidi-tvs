import type { Metadata } from "next";
import RidePage from "@/components/RidePage";
import { breadcrumbSchema, createMetadata, itemListSchema } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Build Your Ride — Find Your TVS",
  description:
    "Answer a few quick questions and find the TVS bike or scooter that fits your riding style — city, family, performance or style — at Zaidi TVS, Chandpur, Uttar Pradesh.",
  path: "/ride",
  keywords: [
    "which TVS is right for me",
    "TVS model finder",
    "best TVS scooter for city",
    "TVS bike recommendation India",
  ],
  noindex: true,
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Build Your Ride", url: "/ride" },
        ])}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={itemListSchema([
          { name: "TVS Jupiter", url: "/scooters/jupiter" },
          { name: "TVS iQube", url: "/scooters/iqube" },
          { name: "TVS Ntorq 125", url: "/scooters/ntorq" },
          { name: "TVS Raider 125", url: "/bikes/raider" },
        ])}
      />
      <RidePage />
    </>
  );
}
