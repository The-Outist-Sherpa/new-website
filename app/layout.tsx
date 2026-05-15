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
  title: "Sherpa | AI Travel Proposal Engine",
  description:
    "Sherpa helps travel teams generate beautiful client-ready travel proposals with itinerary, visuals, weather, maps, and pricing in minutes.",
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
