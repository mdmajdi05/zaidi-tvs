/**
 * Vehicle FAQ — the single source for the accordion shown on a model page AND
 * the `FAQPage` JSON-LD injected by the page. Keeping both in one place means
 * the visible answers always match the structured data.
 */
import type { Vehicle } from "@/lib/catalog";
import { CONTACT } from "@data/site";

export function vehicleFaq(m: Vehicle): Array<[string, string]> {
  const priceLine = m.price
    ? `Ex-showroom starts around ${m.price}.`
    : "The ex-showroom price is shared on request.";
  return [
    [
      `What is the on-road price of the ${m.shortName}?`,
      `${priceLine} On-road price depends on the variant, insurance and the offers running today — message us on WhatsApp or call ${CONTACT.salesPhone} for the exact Chandpur price.`,
    ],
    [
      "Can I take a free test ride?",
      `Yes — test rides on the ${m.shortName} are free all week at our Chandpur showroom. Bring a valid driving licence and pick any slot on WhatsApp.`,
    ],
    [
      "Do you offer finance and exchange?",
      "Yes — easy EMI with quick approvals at the showroom, plus the best value for your old two-wheeler on exchange.",
    ],
    [
      `Where do I get the ${m.shortName} serviced?`,
      "Right here — our in-house workshop uses genuine TVS parts, and periodic service is quick if you book a slot in advance.",
    ],
    [
      "Which colours and variants are available?",
      `We stock the popular variants of the ${m.shortName}. Message us on WhatsApp to check today's colour availability and delivery time.`,
    ],
  ];
}

/** Same FAQ as `vehicleFaq`, shaped for `faqSchema(...)`. */
export function vehicleFaqItems(
  m: Vehicle,
): { question: string; answer: string }[] {
  return vehicleFaq(m).map(([question, answer]) => ({ question, answer }));
}
