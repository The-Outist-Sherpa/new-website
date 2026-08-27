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
  metadataBase: new URL("https://outist.app"),
  title: "Outist - Your 24x7 Travel Proposal Expert",
  description:
    "Turn hours of travel planning into beautiful, client-ready proposals in minutes, from anywhere. Deliver deeply personalized experiences at speed, build stronger brand trust, and drive more bookings.",
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
  openGraph: {
    title: "Outist - Your 24x7 Travel Proposal Expert",
    description:
      "Turn hours of travel planning into beautiful, client-ready proposals in minutes, from anywhere. Deliver deeply personalized experiences at speed, build stronger brand trust, and drive more bookings.",
    type: "website",
    siteName: "Outist",
  },
  twitter: {
    card: "summary_large_image",
    title: "Outist - Your 24x7 Travel Proposal Expert",
    description:
      "Turn hours of travel planning into beautiful, client-ready proposals in minutes, from anywhere. Deliver deeply personalized experiences at speed, build stronger brand trust, and drive more bookings.",
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
