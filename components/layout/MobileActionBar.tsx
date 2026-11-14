"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck, Phone } from "lucide-react";
import { siteConfig } from "@/content/site-config";

// Pages with their own bar pinned to the bottom of the screen (the drug catalog's compare tray, the order flow).
const HIDDEN_ON = ["/catalog/drugs", "/order"];

// Phones and tablets only: "Call" and "Book" always within thumb reach, since that's what most mobile visitors
// came to do. Desktop has both in the header.
export function MobileActionBar() {
  const pathname = usePathname();
  if (HIDDEN_ON.includes(pathname)) return null;

  return (
    <>
      {/* Spacer so the bar never covers the end of the page (footer links). */}
      <div className="h-16 lg:hidden" aria-hidden />
      <nav
        aria-label="Quick actions"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-4px_20px_rgba(15,23,42,0.08)] backdrop-blur lg:hidden"
      >
        <div className="mx-auto flex max-w-md gap-3">
          <a
            href={`tel:+1${siteConfig.contact.tollFree.replace(/-/g, "")}`}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border-2 border-primary-200 bg-white text-sm font-semibold text-primary-700 active:bg-primary-50"
          >
            <Phone className="h-4 w-4" aria-hidden />
            Call us
          </a>
          <Link
            href="/contact"
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-primary-600 text-sm font-semibold text-white shadow-lg shadow-primary-500/30 active:bg-primary-700"
          >
            <CalendarCheck className="h-4 w-4" aria-hidden />
            Book appointment
          </Link>
        </div>
      </nav>
    </>
  );
}
