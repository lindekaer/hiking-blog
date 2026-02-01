import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GalleryWidget from "./components/GalleryWidget";
import { seo } from "@/config/seo";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: seo.defaultTitle,
  description: seo.defaultDescription,
  keywords: seo.keywords,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} antialiased`}>
        <Header />
        {children}
        <GalleryWidget />
        <Footer />
      </body>
    </html>
  );
}
