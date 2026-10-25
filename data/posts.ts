export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  cover: string;
  author: string;
  body: Array<{ type: "p" | "h2" | "ul"; text?: string; items?: string[] }>;
};

export const POSTS: Post[] = [
  {
    slug: "5-signs-your-bike-needs-a-service",
    title: "5 Signs Your Bike Needs a Service",
    excerpt:
      "Rough idling, weak brakes, odd noises — your two-wheeler usually warns you before it breaks down. Here are five signals that mean it is time for the workshop.",
    category: "Maintenance",
    date: "2026-09-18",
    readTime: "4 min read",
    cover: "/tvs/shop/vehicle-care.webp",
    author: "Zaidi TVS Service Team",
    body: [
      {
        type: "p",
        text: "Your bike rarely fails without warning. Between scheduled services, a few small changes in sound, feel and behaviour tell you the machine is asking for attention. Catching them early keeps repair bills small and your ride safe.",
      },
      { type: "h2", text: "1. Rough idling or a hard start" },
      {
        type: "p",
        text: "If the engine stumbles at a standstill, takes several pushes of the starter or stalls at red lights, the air filter, spark plug or fuel system may need cleaning or replacement. Fresh engine oil also makes cold starts noticeably easier.",
      },
      { type: "h2", text: "2. Spongy or weak brakes" },
      {
        type: "p",
        text: "A brake lever that feels soft, or a stopping distance that has grown longer, often means worn brake pads, low brake fluid or air in the lines. Brakes are the one system you should never postpone.",
      },
      { type: "h2", text: "3. Strange noises and vibration" },
      {
        type: "p",
        text: "Grinding, squealing or a rattle that was not there last month usually points to a worn chain, loose fasteners, failing wheel bearings or contaminated brake pads. Sudden vibration at higher speeds can also mean unbalanced or damaged tyres.",
      },
      { type: "h2", text: "4. Reduced mileage or a smoky exhaust" },
      {
        type: "p",
        text: "A drop in fuel economy and visible smoke are classic signs of a clogged air filter, worn spark plug or incorrect fuel-air mixture. Regular tuning restores both performance and efficiency.",
      },
      { type: "h2", text: "5. Warning lights and fluid stains" },
      {
        type: "ul",
        items: [
          "Any light left on after the engine starts deserves a check.",
          "Fresh oil spots under the engine or near the forks mean a leaking seal or gasket.",
          "Discoloured engine oil on the dipstick means the oil is past its life.",
          "Squealing belts or a slipping clutch should be inspected right away.",
        ],
      },
      {
        type: "p",
        text: "Not sure what your bike is telling you? Visit the Zaidi TVS service centre in Chandpur for a free basic check-up, or message us on WhatsApp with a photo and we will guide you.",
      },
    ],
  },
  {
    slug: "bike-vs-scooter-which-tvs-is-right-for-you",
    title: "Bike vs Scooter: Which TVS Is Right For You?",
    excerpt:
      "Motorcycle or scooter? The honest answer depends on your daily route, the people you carry and how you like to ride. Here is a simple way to decide.",
    category: "Buying Guide",
    date: "2026-08-30",
    readTime: "5 min read",
    cover: "/tvs/products/jupiter.webp",
    author: "Zaidi TVS Sales Team",
    body: [
      {
        type: "p",
        text: "It is the first question almost every buyer asks: should I go for a motorcycle or a scooter? There is no universally right answer — the best choice is the one that fits your everyday reality.",
      },
      { type: "h2", text: "Choose a scooter if..." },
      {
        type: "ul",
        items: [
          "Your commute is mostly short city trips in stop-and-go traffic.",
          "You want twist-and-go convenience with no gear shifting.",
          "You carry a pillion often, or need underseat storage and a footboard.",
          "Easy mounting and a low seat height matter to you.",
        ],
      },
      { type: "h2", text: "Choose a motorcycle if..." },
      {
        type: "ul",
        items: [
          "You ride longer distances or on highways regularly.",
          "You want more power, higher cruising speed and larger wheels for stability.",
          "You enjoy the control and involvement of a geared machine.",
          "Rough roads and bigger potholes are part of your route.",
        ],
      },
      { type: "h2", text: "Think about running costs too" },
      {
        type: "p",
        text: "Scooters generally have a lower entry price and simple automatic operation, while many motorcycles return better highway mileage and last longer on long-distance duty. Both need the same discipline: regular servicing and genuine parts.",
      },
      {
        type: "p",
        text: "The easiest way to decide is to sit on and ride both. Zaidi TVS offers free test rides on scooters and motorcycles through the week — book a slot and compare for yourself.",
      },
    ],
  },
  {
    slug: "how-emi-finance-works-when-buying-a-tvs",
    title: "How EMI Finance Works When Buying a TVS",
    excerpt:
      "Down payment, interest rate, tenure and processing fee — understand the four numbers that decide your monthly EMI before you sign anything.",
    category: "Finance",
    date: "2026-08-12",
    readTime: "5 min read",
    cover: "/tvs/products/raider.webp",
    author: "Zaidi TVS Finance Desk",
    body: [
      {
        type: "p",
        text: "Finance lets you ride home today and pay over time, but the monthly figure is only part of the picture. Understanding how an EMI is built helps you choose a plan that fits your budget comfortably.",
      },
      { type: "h2", text: "The four numbers that matter" },
      {
        type: "ul",
        items: [
          "Down payment — the amount you pay upfront. A higher down payment lowers the loan and the EMI.",
          "Loan amount — the on-road price minus your down payment and any exchange value.",
          "Interest rate — charged on the reducing balance; always ask for the annual rate in writing.",
          "Tenure — how many months you repay over. Longer tenure means a smaller EMI but more total interest.",
        ],
      },
      { type: "h2", text: "What about processing fees and insurance?" },
      {
        type: "p",
        text: "Most loans carry a one-time processing fee, and insurance for the first year is normally paid with the on-road price. Ask for a full breakup so there are no surprises later. Some schemes waive or reduce the processing fee during festive periods.",
      },
      { type: "h2", text: "A simple rule of thumb" },
      {
        type: "p",
        text: "Keep your total monthly two-wheeler outgo comfortably within your income, so that fuel, insurance renewals and servicing stay easy. A shorter tenure saves interest, but only if the EMI itself is affordable.",
      },
      {
        type: "p",
        text: "Rates, fees and eligibility depend on the lender, your documents and current schemes. Use our online EMI calculator for an estimate, then message the Zaidi TVS finance desk on WhatsApp for today's exact plan.",
      },
    ],
  },
  {
    slug: "iqube-vs-petrol-scooter-running-cost-explained",
    title: "iQube vs Petrol Scooter: Running Cost Explained",
    excerpt:
      "Charging at home is far cheaper per kilometre than petrol, but the comparison is more than fuel. Here is how to think about the real cost of going electric.",
    category: "Electric",
    date: "2026-07-25",
    readTime: "5 min read",
    cover: "/tvs/products/iqube.webp",
    author: "Zaidi TVS Sales Team",
    body: [
      {
        type: "p",
        text: "The TVS iQube electric scooter promises low running costs, near-silent operation and minimal maintenance. But is it cheaper than a petrol scooter over the years? The honest answer depends on how you use it.",
      },
      { type: "h2", text: "Fuel versus charging" },
      {
        type: "p",
        text: "Per kilometre, home charging usually costs a fraction of petrol. If you cover a lot of city kilometres and can charge at home overnight, the savings add up quickly. If you cannot charge conveniently, a petrol scooter may still be simpler.",
      },
      { type: "h2", text: "Maintenance and moving parts" },
      {
        type: "p",
        text: "An electric drivetrain has no engine oil, spark plug, air filter or clutch to service, so routine maintenance is lighter. Tyres, brakes and suspension still wear as usual on any scooter.",
      },
      { type: "h2", text: "Things a comparison must include" },
      {
        type: "ul",
        items: [
          "Purchase price and any subsidy or scheme benefit.",
          "Battery warranty terms and expected battery life.",
          "Home charging setup cost and electricity tariff.",
          "Charging time and the range you actually need each day.",
          "Resale expectations over your ownership period.",
        ],
      },
      { type: "h2", text: "Our recommendation" },
      {
        type: "p",
        text: "If most of your riding is short city trips within the iQube's range and you can charge at home, the running-cost advantage is real. For very long daily rides, a petrol scooter may suit better. Take a test ride at Zaidi TVS and compare on your own route.",
      },
    ],
  },
  {
    slug: "monsoon-care-tips-for-your-two-wheeler",
    title: "Monsoon Care Tips For Your Two-Wheeler",
    excerpt:
      "Water, mud and slippery roads are hard on any two-wheeler. These simple monsoon habits protect your bike and keep you safe in the rain.",
    category: "Maintenance",
    date: "2026-07-05",
    readTime: "4 min read",
    cover: "/tvs/products/radeon.webp",
    author: "Zaidi TVS Service Team",
    body: [
      {
        type: "p",
        text: "The monsoon months are the toughest season for a two-wheeler. A little prevention now saves expensive repairs later — and keeps you stable on wet roads.",
      },
      { type: "h2", text: "Before the rains hit" },
      {
        type: "ul",
        items: [
          "Check tyre tread depth — worn tyres lose grip fast on wet roads.",
          "Test both brakes and replace pads that are near the limit.",
          "Get a service done and top up clean engine oil.",
          "Inspect the chain and lubricate it; a dry chain rusts quickly.",
        ],
      },
      { type: "h2", text: "Riding in the rain" },
      {
        type: "p",
        text: "Increase your following distance, brake earlier and smoother, and avoid painted road markings and metal covers that turn slippery. Ride with your headlight on and both mirrors visible.",
      },
      { type: "h2", text: "After a wet ride" },
      {
        type: "p",
        text: "Wipe the bike down and dry the chain, then apply a light lubricant. Water sitting on the chain, brake discs and electrical connectors causes rust and poor contacts. Never pressure-wash directly into bearings or the electricals.",
      },
      { type: "h2", text: "Don't ignore the small stuff" },
      {
        type: "p",
        text: "Cloudy headlight lenses, a foggy visor and a weak horn are safety items in heavy rain. If something feels off, get it checked rather than waiting for the next scheduled service. Zaidi TVS is happy to take a quick look.",
      },
    ],
  },
  {
    slug: "new-rider-documents-you-need-in-india",
    title: "New Rider? Documents You Need In India",
    excerpt:
      "Buying your first two-wheeler means paperwork. Here is a plain-language checklist of the documents you need to ride legally and stress-free.",
    category: "Rider Guide",
    date: "2026-06-20",
    readTime: "4 min read",
    cover: "/tvs/products/ntorq-125.webp",
    author: "Zaidi TVS Sales Team",
    body: [
      {
        type: "p",
        text: "A new two-wheeler comes with more than keys. Knowing which documents you need — and which to keep with you — makes every ride and every check-post a lot simpler.",
      },
      { type: "h2", text: "Documents for the rider" },
      {
        type: "ul",
        items: [
          "A valid driving licence with a two-wheeler class.",
          "Proof of age and address as per the licensing authority.",
          "A helmet that is legal and correctly fitted.",
        ],
      },
      { type: "h2", text: "Documents for the vehicle" },
      {
        type: "ul",
        items: [
          "Registration certificate (RC) in the owner's name.",
          "Valid motor insurance with third-party cover.",
          "Pollution Under Control (PUC) certificate where applicable.",
          "The vehicle invoice and, later, service records.",
        ],
      },
      { type: "h2", text: "Keeping copies handy" },
      {
        type: "p",
        text: "Carry originals or legally accepted digital copies in the government's official apps. Keeping a clear set of photocopies at home protects you if something is lost. Always carry the RC and insurance details on the vehicle.",
      },
      { type: "h2", text: "We can help with the process" },
      {
        type: "p",
        text: "Registration, insurance and finance paperwork can all be handled at the dealership. Ask the Zaidi TVS team for a checklist and let us take care of the formalities so you can focus on riding.",
      },
    ],
  },
];

export const sortedPosts: Post[] = [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function formatPostDate(date: string): string {
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}
