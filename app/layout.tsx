import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StructuredData } from "@/components/StructuredData";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-panel",
  weight: ["400", "500"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display-bolt",
});

export const metadata: Metadata = {
  title: "Testology, Inc. | Drug Testing in Boston",
  description:
    "Testology, Inc. in Boston offers reliable, certified drug testing services, including clinic-based, on-site, and remote collections.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${poppins.variable} antialiased`}
      >
        <StructuredData />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}