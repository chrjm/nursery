import type { Metadata } from "next";
import { Baloo_2, Jost, Mochiy_Pop_One, Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
});

// Geometric Futura stand-in (real Futura sits ahead of it in the CSS stack)
const jost = Jost({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jost",
});

const baloo = Baloo_2({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-baloo",
});

const mochiy = Mochiy_Pop_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mochiy",
});

export const metadata: Metadata = {
  title: "Chris's Cool Plants — one-of-a-kind plants for charity",
  description:
    "A little sticker sheet of houseplants, grown by hand. Each one is the only one — take it home and the money goes to charity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`h-full antialiased ${nunito.variable} ${baloo.variable} ${mochiy.variable} ${jost.variable}`}
      lang="en"
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
