"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/content/site-config";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="bg-primary-600 px-4 py-2 text-center text-sm font-medium text-white">
        <span className="hidden sm:inline">
          Quest Preferred Site &middot; eScreen Top Site &middot; LabCorp Collection Site
        </span>
        <span className="sm:hidden">Quest Preferred &middot; eScreen Top &middot; LabCorp Site</span>
      </div>

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-slate-200/60 bg-white/90 shadow-lg backdrop-blur-xl"
            : "bg-white/60 backdrop-blur-md"
        }`}
      >
        <div className="container-wide flex h-16 items-center justify-between lg:h-20">
          <Link href="/" className="group flex items-center gap-2.5">
            <Image
              src="/logo.png"
              alt="Testology, Inc. logo"
              width={48}
              height={48}
              className="rounded-full shadow-lg shadow-primary-500/20 transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col leading-none">
              <span className="font-display-bolt text-lg font-bold text-slate-900 lg:text-xl">
                Testology
              </span>
              <span className="text-[10px] font-medium tracking-wide text-slate-500 lg:text-xs">
                ELEVATE TO EVALUATE
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {siteConfig.primaryNav.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(link.label)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <Link href={link.href} className="nav-link flex items-center gap-1 py-2">
                    {link.label}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </Link>
                  <AnimatePresence>
                    {openMenu === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-full mt-1 w-64 rounded-xl border border-slate-100 bg-white p-2 shadow-2xl"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block rounded-lg px-4 py-2.5 text-sm text-slate-600 transition-colors hover:bg-primary-50 hover:text-primary-600"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link key={link.href} href={link.href} className="nav-link py-2">
                  {link.label}
                </Link>
              ),
            )}

            <div
              className="relative"
              onMouseEnter={() => setOpenMenu("more")}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <button className="nav-link flex items-center gap-1 py-2">
                More
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
              <AnimatePresence>
                {openMenu === "more" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-1 w-64 rounded-xl border border-slate-100 bg-white p-2 shadow-2xl"
                  >
                    {siteConfig.moreNav.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-lg px-4 py-2.5 text-sm text-slate-600 transition-colors hover:bg-primary-50 hover:text-primary-600"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={`tel:+1${siteConfig.contact.tollFree.replace(/-/g, "")}`}
              className="flex items-center gap-2 text-sm font-semibold text-slate-700 transition-colors hover:text-primary-600"
            >
              <Phone className="h-4 w-4" />
              {siteConfig.contact.tollFree}
            </a>
            <Link href="/contact">
              <Button className="rounded-xl bg-primary-600 px-6 shadow-lg shadow-primary-500/30 hover:bg-primary-700">
                Book Appointment
              </Button>
            </Link>
          </div>

          <button
            className="p-2 text-slate-700 lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-slate-100 bg-white lg:hidden"
            >
              <div className="container-wide flex flex-col gap-1 py-4">
                {siteConfig.primaryNav.map((link) => (
                  <div key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-primary-50 hover:text-primary-600"
                    >
                      {link.label}
                    </Link>
                    {link.children && (
                      <div className="ml-3 flex flex-col border-l border-slate-100 pl-3">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="rounded-lg px-4 py-2 text-sm text-slate-500 hover:text-primary-600"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {siteConfig.moreNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-primary-50 hover:text-primary-600"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="mt-2 flex flex-col gap-3 border-t border-slate-100 pt-3">
                  <a
                    href={`tel:+1${siteConfig.contact.tollFree.replace(/-/g, "")}`}
                    className="flex items-center gap-2 px-4 text-sm font-semibold text-slate-700"
                  >
                    <Phone className="h-4 w-4" />
                    {siteConfig.contact.tollFree}
                  </a>
                  <Link href="/contact" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full rounded-xl bg-primary-600 hover:bg-primary-700">
                      Book Appointment
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}