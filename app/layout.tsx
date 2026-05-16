import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const outfit = localFont({
  variable: "--font-outfit",
  display: "swap",
  src: [
    {
      path: "../public/fonts/Outfit-VariableFont_wght.ttf",
      style: "normal",
      weight: "100 900",
    },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sherpa-landing-pi.vercel.app"),
  title: "The Outist — AI Travel Proposal Builder for Travel Teams",
  description:
    "Create beautiful client-ready travel proposals in minutes. The Outist helps travel agents, tour operators, DMCs, and experience hosts generate itineraries, images, maps, pricing, and shareable proposals faster.",
  keywords: [
    "AI travel proposal builder",
    "travel proposal software",
    "travel itinerary generator",
    "AI proposal generator",
    "tour operator software",
    "travel agent proposal tool",
    "DMC proposal software",
    "itinerary proposal builder",
    "travel agency automation",
    "client proposal builder",
  ],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "The Outist — AI Travel Proposal Builder",
    description:
      "Turn travel enquiries into beautiful client-ready proposals with itinerary, images, maps, pricing, and shareable links.",
    type: "website",
    siteName: "The Outist",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Outist AI Travel Proposal Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Outist — AI Travel Proposal Builder",
    description:
      "Create client-ready travel proposals in minutes with AI-powered itineraries, images, maps, and pricing.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body>{children}</body>
    </html>
  );
}
