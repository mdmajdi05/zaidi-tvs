export type FaqGroup = {
  id: string;
  label: string;
  items: Array<{ q: string; a: string }>;
};

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: "buying",
    label: "Buying & Pricing",
    items: [
      {
        q: "Which TVS models can I buy at Zaidi TVS?",
        a: "We stock the full local TVS line-up - Apache, Ronin, Raider and commuter motorcycles, the XL100 moped, the Jupiter, Jupiter 125, Ntorq 125, Ntorq 150 and Zest 110 scooters, and the iQube, TVS X and Orbiter electrics. Visit the showroom in Chandpur to see them in person and take a test ride.",
      },
      {
        q: "How much does a TVS cost?",
        a: "Prices change with the model, variant and current offers. Contact us for today's on-road price and the best deal available right now — we will share a clear breakup.",
      },
      {
        q: "Can I take a test ride before buying?",
        a: "Yes. Free test rides are available on most models during showroom hours. Please bring a valid driving licence and we will get you on the road.",
      },
      {
        q: "Do you quote ex-showroom or on-road price?",
        a: "We quote the on-road price so you know the real total, including registration and insurance. Ask us for the full breakup any time.",
      },
      {
        q: "Do you have any discounts or festive offers?",
        a: "We run festival and exchange offers from time to time. Message us on WhatsApp to find out what is live today.",
      },
    ],
  },
  {
    id: "finance",
    label: "Finance, Insurance & Exchange",
    items: [
      {
        q: "Do you arrange two-wheeler loans?",
        a: "Yes. We help you get finance from leading banks and NBFCs, with quick approval and paperwork support right at the showroom.",
      },
      {
        q: "How much down payment do I need?",
        a: "It depends on the model and the scheme you choose. Many plans start with a low down payment and flexible tenure* — ask us for options that fit your monthly budget.",
      },
      {
        q: "Can I exchange my old bike or scooter?",
        a: "Yes. We evaluate your old vehicle (any brand) and adjust its value against your new purchase, so you only pay the difference.",
      },
      {
        q: "Do you help with insurance?",
        a: "Yes — we arrange new insurance at delivery and help you renew the policy when it is due.",
      },
      {
        q: "What documents do I need for a loan?",
        a: "Usually an ID (such as Aadhaar), address proof, a photograph and bank details. We will confirm the exact checklist for the scheme you pick.",
      },
    ],
  },
  {
    id: "service",
    label: "Service & Maintenance",
    items: [
      {
        q: "When should I get my first service?",
        a: "Follow the schedule in your owner's manual — the first free service is typically due within the first month or first 500–1,000 km. After that, stick to the recommended intervals.",
      },
      {
        q: "Do I need an appointment for service?",
        a: "Walk-ins are welcome, but booking a slot on WhatsApp means less waiting and a faster turnaround.",
      },
      {
        q: "Do you use genuine TVS parts?",
        a: "Always. We fit genuine TVS parts and recommended oils, and share a clear estimate before any work begins.",
      },
      {
        q: "Can you pick up my vehicle for service?",
        a: "Yes — free doorstep pickup and drop is available within city limits. Book it on WhatsApp with your address and preferred time.",
      },
      {
        q: "How long does a periodic service take?",
        a: "A standard periodic service is usually completed the same day. Repairs that need parts may take a little longer, and we will keep you updated.",
      },
    ],
  },
  {
    id: "iqube",
    label: "Electric (iQube)",
    items: [
      {
        q: "Is the TVS iQube fully electric?",
        a: "Yes. The iQube is a zero-tailpipe-emission electric scooter, well suited to daily city riding with smooth, quiet performance.",
      },
      {
        q: "How do I charge it at home?",
        a: "You can charge it from a regular 5A home socket using the supplied charger — no special wiring or installation is required.",
      },
      {
        q: "What is the running cost?",
        a: "Charging costs far less than petrol per kilometre, and there are no engine oil, oil-filter or spark-plug changes to pay for.",
      },
      {
        q: "Do you service electric scooters?",
        a: "Yes. Our service centre is equipped for iQube diagnostics and uses genuine EV parts for any replacement.",
      },
      {
        q: "Is the battery covered by warranty?",
        a: "The battery carries a manufacturer warranty period. Contact us to confirm the current coverage for the model and year you are considering.",
      },
    ],
  },
  {
    id: "docs",
    label: "Documents & Delivery",
    items: [
      {
        q: "What documents do I need to buy a two-wheeler?",
        a: "An ID (such as Aadhaar), address proof and a passport-size photograph are usually enough. Finance adds a few extra papers, which we will list for you.",
      },
      {
        q: "How long does registration take?",
        a: "We handle the RTO paperwork for you. Registration normally takes a few working days, and we will update you on the status.",
      },
      {
        q: "Can I take delivery the same day?",
        a: "Often yes for ready stock paid in full. If finance or registration is involved, it can add a little time — we will give you a realistic date up front.",
      },
      {
        q: "Can I ride before my permanent number arrives?",
        a: "Yes. You can ride with a temporary registration while your permanent number is being issued.",
      },
      {
        q: "Do you help with the RTO formalities?",
        a: "Yes — registration and related formalities are managed by us so you can just collect your keys and ride.",
      },
    ],
  },
];

/** Six key questions, flattened for use on the landing page / home sections. */
export const TOP_FAQS: Array<{ q: string; a: string }> = [
  {
    q: "How much does a TVS cost?",
    a: "Prices change with the model, variant and current offers. Contact us for today's on-road price and the best deal available right now.",
  },
  {
    q: "Can I take a test ride before buying?",
    a: "Yes. Free test rides are available on most models during showroom hours — just bring a valid driving licence.",
  },
  {
    q: "Do you arrange two-wheeler loans?",
    a: "Yes. We help you get finance from leading banks and NBFCs, with quick approval and paperwork support at the showroom.",
  },
  {
    q: "Can I exchange my old bike or scooter?",
    a: "Yes. We evaluate your old vehicle of any brand and adjust its value against your new purchase.",
  },
  {
    q: "When should I get my first service?",
    a: "Follow your owner's manual — the first free service is typically due within the first month or first 500–1,000 km.",
  },
  {
    q: "How do I charge the TVS iQube at home?",
    a: "You can charge it from a regular 5A home socket using the supplied charger — no special installation is needed.",
  },
];
