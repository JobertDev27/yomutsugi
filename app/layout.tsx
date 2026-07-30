import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetBrains = JetBrains_Mono({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Yomutsugi",
  description: "Anime library"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetBrains.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-stone-900">{children}</body>
    </html>
  );
}
