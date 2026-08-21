import { siteConfig } from "@/content/site-config";

export function Footer() {
  return (
    <footer className="border-t border-slate/20 bg-bone">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 text-sm md:grid-cols-3">
        <div>
          <p className="mb-2 font-display text-base font-medium text-ink">
            {siteConfig.location.name}
          </p>
          <p className="text-slate">{siteConfig.location.line1}</p>
          <p className="text-slate">{siteConfig.location.line2}</p>
        </div>

        <div>
          <p className="mb-2 font-display text-base font-medium text-ink">Hours</p>
          <p className="text-slate">{siteConfig.hours.weekday}</p>
          <p className="text-slate">Saturday: {siteConfig.hours.saturday}</p>
        </div>

        <div>
          <p className="mb-2 font-display text-base font-medium text-ink">Contact</p>
          <p className="text-slate">Toll-free: {siteConfig.contact.tollFree}</p>
          <p className="text-slate">Direct: {siteConfig.contact.direct}</p>
          <p className="text-slate">{siteConfig.contact.examsEmail}</p>
        </div>
      </div>

      <div className="border-t border-slate/20 px-6 py-4 text-center font-mono-panel text-xs text-slate">
        &copy; {new Date().getFullYear()} {siteConfig.name} All rights reserved.
      </div>
    </footer>
  );
}