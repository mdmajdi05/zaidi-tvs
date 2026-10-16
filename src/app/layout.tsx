import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollBike from "@/components/ScrollBike";
import ChatWidget from "@/components/ChatWidget";
import { SITE, SITE_URL } from "@data/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oswald",
});

/**
 * Favicon pairs. The browser tab strip follows the OS / browser colour scheme,
 * so the icon has to as well: the white "Z" for dark chrome, the black "Z" for
 * light chrome. `media` on an icon link is supported by all evergreen browsers;
 * anything older falls back to `/favicon.ico`.
 */
const FAVICONS = {
  dark: "/Favicons/Dark_Background_Z_White_TVS_Red/ZTVS_Favicon_Dark_ZWhite_TVSRed",
  light: "/Favicons/Light_Background_Z_Black_TVS_Red/ZTVS_Favicon_Light_ZBlack_TVSRed",
} as const;

const TAB_ICONS = (["light", "dark"] as const).flatMap((scheme) =>
  ["16x16", "24x24", "32x32", "48x48", "64x64"].map((size) => ({
    url: `${FAVICONS[scheme]}_${size}.png`,
    type: "image/png",
    sizes: size,
    media: `(prefers-color-scheme: ${scheme})`,
  }))
);

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Zaidi TVS | Your Ride. Your Style.",
    template: "%s | Zaidi TVS",
  },
  description: SITE.description,
  applicationName: "Zaidi TVS",
  keywords: [
    "Zaidi TVS",
    "TVS showroom Chandpur",
    "TVS bikes Chandpur",
    "TVS scooters Chandpur",
    "TVS Apache",
    "TVS Ntorq 125",
    "TVS Jupiter",
    "TVS Raider",
    "TVS iQube",
    "TVS service centre Chandpur",
    "TVS genuine spare parts",
    "TVS finance and EMI",
  ],
  authors: [{ name: "Zaidi TVS" }],
  openGraph: {
    type: "website",
    siteName: "Zaidi TVS",
    locale: "en_IN",
    title: "Zaidi TVS | Your Ride. Your Style.",
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Zaidi TVS | Your Ride. Your Style.",
    description: SITE.description,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: TAB_ICONS,
    // iOS does not support scheme-aware icons; the dark badge reads best.
    apple: [
      {
        url: `${FAVICONS.dark}_256x256.png`,
        type: "image/png",
        sizes: "256x256",
      },
    ],
  },
};

export const viewport: Viewport = {
  // Keeps the browser chrome in step with the favicon above.
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#080b0f" },
    { media: "(prefers-color-scheme: light)", color: "#f4f2ec" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${oswald.variable}`}
    >
      <body>
        <a className="skipLink" href="#main-content">
          Skip to main content
        </a>
        <ScrollBike />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}