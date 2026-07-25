import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-serif",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://glasstables.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "GLASS TABLES — Brilliance, engineered.",
  description:
    "Lingerie and swim, numbered in drops of 50. A digital maison by Glass Tables.",
  openGraph: {
    title: "GLASS ✦ TABLES",
    description:
      "The first drop: one swim, three lace. 50 of each, numbered.",
    images: ["/campaign/flagship-exterior.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "GLASS ✦ TABLES",
    description:
      "The first drop: one swim, three lace. 50 of each, numbered.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="grain">
        <ScrollProgress />
        <CustomCursor />
        <Header />
        <CartDrawer />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
