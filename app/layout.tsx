
import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import { SidePanels } from "@/components/SidePanels";
import InitialLoader from "@/components/InitialLoader";

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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');

              fbq('init', '2047899506158166');
              fbq('track', 'PageView');
            `,
          }}
        />
      </head>
      <body className="bg-night text-white min-h-screen antialiased">
        <CartProvider>
          <div className="relative min-h-screen">
            <InitialLoader />
            <Header />
            <SidePanels />
            <main className="pt-24 pb-16">{children}</main>
          </div>
        </CartProvider>
       

      </body>
    </html>
  );
}




