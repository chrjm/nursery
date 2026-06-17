import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nursery",
  description: "Plants for sale from Nursery.",
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
