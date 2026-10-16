import type { Metadata } from "next";
import ComparePage from "@/components/ComparePage";
import { breadcrumbSchema, createMetadata, itemListSchema } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Compare TVS Models",
  description:
    "Compare TVS bikes and scooters side by side — engine, mileage, weight and category — to choose the right ride at Zaidi TVS, Chandpur, Uttar Pradesh.",
  path: "/compare",
  keywords: [
    "compare TVS models",
    "TVS Ntorq vs Jupiter",
    "TVS Raider vs Ntorq",
    "best TVS scooter comparison",
  ],
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Compare Models", url: "/compare" },
        ])}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={itemListSchema([
          { name: "TVS Ntorq 125", url: "/scooters/ntorq" },
          { name: "TVS Jupiter", url: "/scooters/jupiter" },
          { name: "TVS Raider 125", url: "/bikes/raider" },
        ])}
      />
      <ComparePage />
    </>
  );
}
