import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sellio Mobile | Everything your phone needs, in one place",
  description:
    "Cases, screen protectors, chargers, cables, power banks and earbuds. Pick your phone, pick your style, pay with a QR code.",
};

import { Providers } from "../components/providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Manrope:wght@400;500;600;700&family=Noto+Sans+Myanmar:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
