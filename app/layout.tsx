import type { Metadata } from "next";
import "./globals.css";

import { CartProvider } from "@/context/CartContext";
import { FavoriteProvider } from "@/context/FavoriteContext";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Abu-Zena Store",
  description: "E-Commerce Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <CartProvider>
          <FavoriteProvider>
            <Navbar />
            {children}
          </FavoriteProvider>
        </CartProvider>
      </body>
    </html>
  );
}