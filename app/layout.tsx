import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { AnnouncementDialog } from "@/components/layout/AnnouncementDialog";
import { StructuredData } from "@/components/StructuredData";
import { MotionPreferences } from "@/components/MotionPreferences";
import { siteConfig } from "@/content/site-config";

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
  // Resolves relative canonical/Open Graph URLs (e.g. alternates.canonical: "/clinic-locator") to the live domain.
  metadataBase: new URL(siteConfig.url),
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
        {/* Lets keyboard and screen-reader users jump past the menu; only visible when focused with Tab. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-primary-700 focus:shadow-lg"
        >
          Skip to main content
        </a>
        <MotionPreferences>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <MobileActionBar />
          <AnnouncementDialog />
        </MotionPreferences>
      </body>
    </html>
  );
}