import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollBike from "@/components/ScrollBike";
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

export const metadata: Metadata = {
  title: {
    default: "Zaidi TVS | Your Ride. Your Style.",
    template: "%s | Zaidi TVS",
  },
  description:
    "Zaidi TVS, Chandpur — authorized TVS dealership for bikes, scooters, genuine spare parts, servicing, finance, insurance and exchange.",
};

export const viewport: Viewport = {
  themeColor: "#080b0f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body>
        <a className="skipLink" href="#main-content">
          Skip to main content
        </a>
        <ScrollBike />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}