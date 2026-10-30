import type { Metadata } from "next";

// Preview pages stay out of search. Don't also block /lab in robots.ts: Google
// has to crawl a page to see its noindex. `alternates: null` drops the root
// layout's canonical, which would otherwise point these pages at the homepage.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  alternates: null,
};

export default function LabLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
