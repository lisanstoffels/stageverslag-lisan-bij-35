import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

import { NavBar } from "../components/index";

export const metadata: Metadata = {
  title: "Stageverslag – Lisan Stoffels",
  description: "Stage bij 35® – Lisan Stoffels",
  icons: {
    icon: { url: "/icon.png", type: "image/png" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.className} antialiased relative flex min-h-screen flex-col`}
      >
        {/* Blokkeer de site op schermen smaller dan 1056px */}
        <div
          className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-[#f5f5f7] p-6 min-[1056px]:hidden"
          aria-live="polite"
        >
          <p className="max-w-md text-center text-lg text-black/80">
            Door tijdsnood is deze website <b>helemaal niet</b> responsive, dus
            kun je hem helaas niet op mobiel bekijken. Kijk ff op je laptop met
            een breedte van minimaal 1056px.
          </p>
        </div>
        <NavBar />
        <main className="min-h-0 shrink-0">{children}</main>
      </body>
    </html>
  );
}
