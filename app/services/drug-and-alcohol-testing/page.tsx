import Link from "next/link";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";
import { Reveal } from "@/components/ui/Reveal";
import type { Metadata } from "next";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "Drug & Alcohol Testing | Testology, Inc.",
  description:
    "Urine, oral fluid, hair, and rapid drug and alcohol testing in Brighton, MA, with eCCF chain-of-custody procedure.",
};

const collectionMethods = [
  {
    title: "Rapid drug testing",
    description: "Instant-cup screening with results in minutes, on-site at our Brighton clinic.",
    href: "/services/rapid-drug-testing",
  },
  {
    title: "Oral fluid testing",
    description:
      "A non-invasive saliva-based collection, well suited to observed, tamper-resistant sampling.",
    href: "/services/oral-fluid-testing",
  },
  {
    title: "Hair drug testing",
    description: "Detects patterns of use over a longer window than urine or oral fluid can capture.",
    href: "/services/hair-drug-testing",
  },
  {
    title: "Mobile drug testing",
    description:
      "Our team travels to your site for group testing, post-accident response, or off-hours collection.",
    href: "/services/mobile-drug-testing",
  },
];

const faqs = [
  {
    question: "What do I need to bring to my appointment?",
    answer:
      "If your employer requested the test, bring a completed authorization form (provided by your employer) along with photo ID. If you're coming on your own for a wellness or personal test, just bring ID and a method of payment.",
  },
  {
    question: "How will I receive my results?",
    answer:
      "If your employer requested the test, results are sent directly to them. If you're testing on your own, in-house results are often available same-day; results sent to an outside lab typically take 3–5 business days and are delivered securely.",
  },
  {
    question: "Who pays for my visit?",
    answer:
      "If your employer requested the test, they're billed directly and there's no charge to you at the visit. If you're coming as an individual, payment is due at the time of service.",
  },
  {
    question: "Where can I find an authorization form?",
    answer:
      "Your employer provides this directly once their account with us is set up — it's not something you need to source yourself. If you haven't received one and believe you should have, contact your employer's HR or safety team first.",
  },
  {
    question: "What is an eCCF?",
    answer:
      "eCCF stands for Electronic Chain of Custody Form — a paperless, secure digital form that tracks your specimen from collection through to the final result, reducing transcription errors compared to a traditional paper form.",
  },
];

export default function DrugAndAlcoholTestingPage() {
  return (
    <>
      <ServicePageHeader
        eyebrow="Toxicology"
        title="Drug and alcohol testing"
        tagline="Urine, oral fluid, hair & breath alcohol testing"
        intro="From a single walk-in screen to an ongoing workplace program, we run urine, oral fluid, hair, and breath alcohol testing under proper eCCF chain-of-custody procedure."
        image="https://images.pexels.com/photos/8442376/pexels-photo-8442376.jpeg?auto=compress&cs=tinysrgb&w=1200"
        iconName="FlaskConical"
        color="from-teal-500 to-cyan-600"
      />

      <section className="container-wide py-14">
        <h2 className="font-display-bolt mb-6 text-xl font-semibold text-slate-900">
          Choose a collection method
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {collectionMethods.map((method, index) => (
            <Reveal key={method.href} delay={index * 80}>
              <Link
                href={method.href}
                className="card-hover block rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
              >
                <h3 className="font-display-bolt mb-1.5 text-base font-semibold text-slate-900">
                  {method.title}
                </h3>
                <p className="text-sm text-slate-500">{method.description}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-wide pb-14">
        <h2 className="font-display-bolt mb-2 text-xl font-semibold text-slate-900">
          Frequently asked questions
        </h2>
        <p className="mb-6 max-w-xl text-sm text-slate-500">
          Practical answers for your first visit — what to bring, who pays, and how results are
          delivered.
        </p>
        <Accordion items={faqs} />
      </section>

      <section className="border-t border-slate-100 bg-slate-50">
        <div className="container-wide py-12">
          <h2 className="font-display-bolt mb-2 text-xl font-semibold text-slate-900">
            Not sure which test you need?
          </h2>
          <p className="mb-6 max-w-xl text-sm text-slate-500">
            Tell us what you&apos;re testing for and why, and we&apos;ll point you to the right
            collection method and turnaround time.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition hover:bg-primary-700"
          >
            Ask us
          </Link>
        </div>
      </section>
    </>
  );
}