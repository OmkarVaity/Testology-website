import { siteConfig } from "@/content/site-config";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-4 w-4">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-4 w-4">
      <path d="M14 9h3V6h-3c-1.66 0-3 1.34-3 3v2H9v3h2v6h3v-6h3l1-3h-4v-2c0-.55.45-1 1-1z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-4 w-4">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="7" y1="10" x2="7" y2="17" />
      <circle cx="7" cy="7" r="0.5" fill="currentColor" />
      <path d="M11 17v-4.5c0-1.5 1-2.5 2.5-2.5s2.5 1 2.5 2.5V17" />
      <line x1="11" y1="10" x2="11" y2="17" />
    </svg>
  );
}

export function FindUs() {
  return (
    <section className="bg-ink text-bone">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="mb-8 font-display text-2xl font-medium">How to find us</h2>

        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div className="overflow-hidden rounded-lg border border-bone/10">
            <iframe
              title="Testology, Inc. location map"
              src="https://www.google.com/maps?q=380+Washington+St,+Brighton,+MA+02135&output=embed"
              className="h-56 w-full"
              loading="lazy"
            />
          </div>

          <div>
            <p className="mb-2 font-mono-panel text-[11px] uppercase tracking-wide text-clear">
              Address
            </p>
            <p className="text-sm text-bone/80">{siteConfig.location.line1}</p>
            <p className="text-sm text-bone/80">{siteConfig.location.line2}</p>
            <p className="mt-3 text-xs text-bone/50">{siteConfig.location.transit}</p>
          </div>

          <div>
            <p className="mb-2 font-mono-panel text-[11px] uppercase tracking-wide text-clear">
              Contact
            </p>
            <p className="text-sm text-bone/80">Toll-free: {siteConfig.contact.tollFree}</p>
            <p className="text-sm text-bone/80">Direct: {siteConfig.contact.direct}</p>
            <p className="text-sm text-bone/80">{siteConfig.contact.examsEmail}</p>
          </div>

          <div>
            <p className="mb-2 font-mono-panel text-[11px] uppercase tracking-wide text-signal">
              24hr emergency dispatch
            </p>
            <p className="text-sm text-bone/80">
              Toll-free: {siteConfig.contact.tollFree} (opt. 3)
            </p>
            <p className="text-sm text-bone/80">Direct: {siteConfig.contact.emergencyDispatch}</p>
            <p className="text-sm text-bone/80">{siteConfig.contact.dispatchEmail}</p>

            <div className="mt-4 flex gap-3">
              <a
                href={siteConfig.social.instagram}
                aria-label="Instagram"
                className="text-bone/60 hover:text-bone"
              >
                <InstagramIcon />
              </a>
              <a
                href={siteConfig.social.facebook}
                aria-label="Facebook"
                className="text-bone/60 hover:text-bone"
              >
                <FacebookIcon />
              </a>
              <a
                href={siteConfig.social.linkedin}
                aria-label="LinkedIn"
                className="text-bone/60 hover:text-bone"
              >
                <LinkedinIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}