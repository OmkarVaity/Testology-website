import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, Info, MapPin, Phone, Mail } from "lucide-react";
import { DirectoryBreadcrumbs } from "@/components/sections/ClinicDirectory";
import { BuyNowButton } from "@/components/catalog/PanelRequestDialog";
import {
  drugPanels,
  formatPrice,
  getDrugPanel,
  glossary,
  orderTargetFor,
  type DrugPanel,
} from "@/content/drug-catalog";
import { siteConfig } from "@/content/site-config";
import { ORDERING_ENABLED, orderUrl } from "@/lib/order-links";
import { features } from "@/lib/features";

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return drugPanels.map((p) => ({ id: p.id }));
}

const specimenLabel = (p: DrugPanel) => (p.sample === "Breath" ? "breath alcohol test" : `${p.sample.toLowerCase()} drug test`);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const panel = getDrugPanel((await params).id);
  if (!panel) return {};
  const price = formatPrice(panel.price);
  return {
    title: `${panel.name}${price ? ` (${price})` : ""} — ${specimenLabel(panel)} | Testology, Inc.`,
    description: `${panel.blurb} Screens for ${panel.inc.length} ${panel.inc.length === 1 ? "substance" : "substances"}${price ? ` · ${price}` : ""}.`,
    alternates: { canonical: `/catalog/drugs/${panel.id}` },
  };
}

/** Same specimen and category, closest in size — "if not this one, maybe one of these". */
function relatedPanels(panel: DrugPanel, limit = 4): DrugPanel[] {
  return drugPanels
    .filter((p) => p.id !== panel.id && p.sample === panel.sample)
    .sort(
      (a, b) =>
        Number(b.cat === panel.cat) - Number(a.cat === panel.cat) ||
        Math.abs(a.inc.length - panel.inc.length) - Math.abs(b.inc.length - panel.inc.length),
    )
    .slice(0, limit);
}

export default async function DrugPanelPage({ params }: Props) {
  const panel = getDrugPanel((await params).id);
  if (!panel) notFound();

  const price = formatPrice(panel.price);
  const target = orderTargetFor(panel);
  const isDot = panel.cat === "DOT & Regulated" && panel.sample !== "Breath";
  const askHref = `mailto:${siteConfig.contact.examsEmail}?subject=${encodeURIComponent(`Question about the ${panel.name} drug panel`)}`;
  const footnotes = [
    panel.star ? "* Expanded opiates include confirmation for hydrocodone/hydromorphone at specific labs." : null,
    panel.note ?? null,
  ].filter(Boolean) as string[];

  return (
    <>
      <DirectoryBreadcrumbs
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Catalog", href: "/catalog" },
          { label: "Drug testing", href: "/catalog/drugs" },
          { label: panel.name, href: `/catalog/drugs/${panel.id}` },
        ]}
      />

      <article className="container-wide max-w-4xl pb-16 pt-6">
        <p className="mb-2 text-sm font-semibold text-primary-700">{panel.cat}</p>
        <h1 className="font-display-bolt mb-4 text-3xl font-bold text-slate-900 sm:text-4xl">{panel.name}</h1>

        <div className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-slate-100 pb-6">
          <span className={price ? "font-display-bolt text-3xl font-bold text-slate-900" : "text-sm font-medium text-slate-500"}>
            {price ?? "Pricing — contact us"}
          </span>
          <span className="flex flex-wrap gap-1.5 text-xs">
            <span className="rounded-full bg-primary-50 px-2.5 py-1 font-medium text-primary-800">{panel.sample}</span>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600">
              {panel.inc.length} {panel.inc.length === 1 ? "substance" : "substances"} screened
            </span>
            {panel.code && <span className="rounded-full bg-slate-100 px-2.5 py-1 font-mono text-slate-500">Ref {panel.code}</span>}
          </span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_18rem]">
          <div className="space-y-8">
            <section>
              <h2 className="font-display-bolt mb-2 text-xl font-semibold text-slate-900">Summary</h2>
              <p className="text-slate-600">{panel.summary}</p>
            </section>

            <section className="rounded-2xl bg-primary-50/60 p-5">
              <h2 className="font-display-bolt mb-2 text-lg font-semibold text-slate-900">Why it matters</h2>
              <p className="text-slate-700">{panel.why}</p>
            </section>

            <section>
              <h2 className="font-display-bolt mb-1 text-xl font-semibold text-slate-900">What this panel screens for</h2>
              <p className="mb-4 text-sm text-slate-500">
                {panel.inc.length} {panel.inc.length === 1 ? "substance" : "substances"} included in this panel.
              </p>
              <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-100 bg-white">
                {panel.inc.map((substance) => {
                  const cutoff = panel.cutoffs?.[substance];
                  return (
                    <li key={substance} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{substance}</p>
                        {glossary[substance] && <p className="text-sm text-slate-500">{glossary[substance]}</p>}
                      </div>
                      {cutoff !== undefined && (
                        <p className="shrink-0 text-xs font-medium text-slate-500">
                          Cutoff: {typeof cutoff === "number" ? `${cutoff} ng/mL` : cutoff}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
              {footnotes.map((note) => (
                <p key={note} className="mt-3 text-xs text-slate-500">
                  {note}
                </p>
              ))}
            </section>
          </div>

          <aside className="space-y-3 lg:sticky lg:top-24 lg:self-start">
            {isDot && (
              <p className="flex gap-2 rounded-xl border border-amber-100 bg-amber-50 p-3 text-sm text-amber-900">
                <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                <span>
                  DOT tests are ordered by employers or their testing administrator. See our{" "}
                  <Link href="/employer-solutions" className="font-semibold underline">
                    employer programs
                  </Link>
                  .
                </span>
              </p>
            )}
            {features.buyNow && (
              <BuyNowButton
                panel={panel}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white hover:bg-primary-700"
              />
            )}
            {ORDERING_ENABLED && target && (
              <Link
                href={orderUrl({ serviceId: target.serviceId, panelCode: target.panelCode })}
                className="flex items-center justify-center gap-2 rounded-xl border border-primary-200 bg-primary-50 px-4 py-3 text-sm font-semibold text-primary-800 hover:bg-primary-100"
              >
                Order online &amp; choose a clinic
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            )}
            {features.clinicLocator && target && (
              <Link
                href={`/clinic-locator?service=${target.serviceId}`}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <MapPin className="h-4 w-4 text-primary-600" aria-hidden />
                Find a clinic near you
              </Link>
            )}
            <a
              href={askHref}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Mail className="h-4 w-4 text-primary-600" aria-hidden />
              Ask about this panel
            </a>
            <a
              href={`tel:+1${siteConfig.contact.tollFree.replace(/-/g, "")}`}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Phone className="h-4 w-4 text-primary-600" aria-hidden />
              Call {siteConfig.contact.tollFree}
            </a>
          </aside>
        </div>

        <section className="mt-14">
          <h2 className="font-display-bolt mb-4 text-xl font-semibold text-slate-900">Similar panels</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {relatedPanels(panel).map((p) => (
              <li key={p.id}>
                <Link
                  href={`/catalog/drugs/${p.id}`}
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-sm transition hover:border-primary-200"
                >
                  <span>
                    <span className="block text-sm font-semibold text-slate-900">{p.name}</span>
                    <span className="block text-xs text-slate-500">
                      {p.sample} · {p.inc.length} {p.inc.length === 1 ? "substance" : "substances"}
                    </span>
                  </span>
                  <span className="shrink-0 text-sm font-semibold text-slate-700">{formatPrice(p.price) ?? "Contact us"}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/catalog/drugs" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary-700 hover:underline">
            Browse the full catalog
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </section>
      </article>
    </>
  );
}
