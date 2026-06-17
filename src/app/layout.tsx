import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nursery",
  description: "A simple Nursery web app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full antialiased" lang="en">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
