import Link from "next/link";
import { Phone, Clock, MapPin } from "lucide-react";
import { siteConfig } from "@/content/site-config";

export function QuickInfoStrip() {
  const items = [
    {
      icon: Phone,
      label: "Call",
      value: siteConfig.contact.tollFree,
      href: `tel:+1${siteConfig.contact.tollFree.replace(/-/g, "")}`,
    },
    {
      icon: Clock,
      label: "Hours",
      value: "Mon–Fri, 9AM–6PM",
      href: "/contact",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Brighton, MA",
      href: "/contact",
    },
  ];

  return (
    <div className="border-y border-slate/20 bg-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-6 sm:grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.label} href={item.href} className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-clear/10">
                <Icon className="h-4 w-4 text-clear" strokeWidth={1.75} />
              </div>
              <div>
                <p className="font-mono-panel text-[10px] uppercase tracking-wide text-slate">
                  {item.label}
                </p>
                <p className="text-sm font-medium text-ink">{item.value}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}