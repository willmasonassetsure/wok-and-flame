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
  title: "Wok & Flame | West Didsbury | Chinese & Thai Takeaway",
  description:
    "Authentic Chinese and Thai dishes, wok-fired in West Didsbury, Manchester. Delivery and collection. 9,999+ five-star reviews on Just Eat.",
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
