import Link from "next/link";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";
import { Reveal } from "@/components/ui/Reveal";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Drug & Alcohol Testing | Testology, Inc.",
  description:
    "Urine, oral fluid, hair, and rapid drug and alcohol testing in Brighton, MA, with proper chain-of-custody procedure.",
};

const collectionMethods = [
  {
    title: "Rapid drug testing",
    description: "Instant-cup screening with results in minutes, on-site at our Brighton clinic.",
    href: "/services/rapid-drug-testing",
  },
  {
    title: "Oral fluid testing",
    description: "A non-invasive saliva-based collection, well suited to observed, tamper-resistant sampling.",
    href: "/services/oral-fluid-testing",
  },
  {
    title: "Hair drug testing",
    description: "Detects patterns of use over a longer window than urine or oral fluid can capture.",
    href: "/services/hair-drug-testing",
  },
  {
    title: "Mobile drug testing",
    description: "Our team travels to your site for group testing, post-accident response, or off-hours collection.",
    href: "/services/mobile-drug-testing",
  },
];

export default function DrugAndAlcoholTestingPage() {
  return (
    <>
      <ServicePageHeader
        eyebrow="Toxicology"
        title="Drug and alcohol testing"
        intro="From a single walk-in screen to an ongoing workplace program, we run urine, oral fluid, hair, and breath alcohol testing under proper chain-of-custody procedure."
      />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="mb-6 font-display text-xl font-medium text-ink">Choose a collection method</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {collectionMethods.map((method, index) => (
            <Reveal key={method.href} delay={index * 80}>
              <Link
                href={method.href}
                className="block rounded-lg border border-slate/20 bg-white p-5 transition hover:border-slate/40 hover:shadow-sm"
              >
                <h3 className="mb-1.5 font-display text-base font-medium text-ink">{method.title}</h3>
                <p className="text-sm text-slate">{method.description}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-slate/20 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="mb-2 font-display text-xl font-medium text-ink">Not sure which test you need?</h2>
          <p className="mb-6 max-w-xl text-sm text-slate">
            Tell us what you&apos;re testing for and why, and we&apos;ll point you to the right
            collection method and turnaround time.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-md bg-signal px-4 py-2.5 text-sm font-medium text-ink"
          >
            Ask us
          </Link>
        </div>
      </section>
    </>
  );
}