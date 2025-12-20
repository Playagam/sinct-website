import BloodCursor from "@/components/BloodCursor";
import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import { SidePanels } from "@/components/SidePanels";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas"
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "SINƇT | Devilish Streetwear",
  description: "SINƇT — a Gen-Z, devilish streetwear house inspired by the 7 deadly sins."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebas.variable} ${inter.variable}`}>
      <body className="bg-night text-white min-h-screen antialiased">
        <CartProvider>
          <div className="relative min-h-screen">
            <Header />
            <SidePanels />
            <main className="pt-24 pb-16">{children}</main>
          </div>
        </CartProvider>
        <BloodCursor />

      </body>
    </html>
  );
}




