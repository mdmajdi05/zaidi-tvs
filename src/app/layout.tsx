import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollBike from "@/components/ScrollBike";
import ChatWidget from "@/components/ChatWidget";
import TimedOfferPopup from "@/components/TimedOfferPopup";
import { organizationSchema, websiteSchema } from "@/lib/seo";
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
    default: SITE.defaultTitle,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.defaultDescription,
  applicationName: SITE.name,
  keywords: [...SITE.defaultKeywords],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  formatDetection: { telephone: false, address: false, email: false },
  alternates: { canonical: SITE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE.name,
    locale: SITE.locale,
    title: SITE.defaultTitle,
    description: SITE.defaultDescription,
    images: [{ url: SITE.ogImage, alt: SITE.defaultTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.defaultTitle,
    description: SITE.defaultDescription,
    images: [SITE.ogImage],
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={organizationSchema()}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={websiteSchema()}
        />
        <a className="skipLink" href="#main-content">
          Skip to main content
        </a>
        <ScrollBike />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <ChatWidget />
        <TimedOfferPopup />
      </body>
    </html>
  );
}