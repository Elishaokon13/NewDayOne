import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/common/SmoothScrolling";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Agency. - Creative Digital Solutions",
  description: "Transform your brand with cutting-edge design, development, and marketing strategies that captivate audiences and drive results.",
  keywords: ["digital agency", "web design", "marketing", "branding", "development"],
  authors: [{ name: "Agency." }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className="antialiased">
        <SmoothScrolling>
          {children}
        </SmoothScrolling>
      </body>
    </html>
  );
} 