"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/content/site-config";

export function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-ink">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <Link href="/" className="font-display text-lg font-medium text-bone">
          Testology
        </Link>

        <nav className="hidden items-center gap-5 text-sm text-bone/70 lg:flex">
          {siteConfig.primaryNav.map((item) =>
            item.children ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button className="transition hover:text-bone">{item.label}</button>
                {openMenu === item.label && (
                  <div className="absolute left-0 top-full min-w-52 rounded-md border border-bone/10 bg-ink py-2 shadow-lg">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-bone/70 transition hover:bg-bone/5 hover:text-bone"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={item.href} href={item.href} className="transition hover:text-bone">
                {item.label}
              </Link>
            ),
          )}

          <div
            className="relative"
            onMouseEnter={() => setOpenMenu("more")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button className="transition hover:text-bone">More</button>
            {openMenu === "more" && (
              <div className="absolute right-0 top-full min-w-56 rounded-md border border-bone/10 bg-ink py-2 shadow-lg">
                {siteConfig.moreNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-sm text-bone/70 transition hover:bg-bone/5 hover:text-bone"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <a
          href={`tel:+1${siteConfig.contact.tollFree.replace(/-/g, "")}`}
          className="rounded-md bg-signal px-3 py-1.5 text-xs font-medium text-ink"
        >
          Call now
        </a>
      </div>
    </header>
  );
}