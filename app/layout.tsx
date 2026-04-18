import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Wok & Flame | Chinese Takeaway in West Didsbury, Manchester",
  description:
    "Authentic Chinese takeaway, wok-fired in West Didsbury, Manchester. Salt & pepper, crispy duck, chow mein and a handful of Thai favourites. Delivery and collection — 11,375 reviews on Just Eat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="font-display min-h-[100dvh]">{children}</body>
    </html>
  );
}
