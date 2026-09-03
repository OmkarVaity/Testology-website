import Link from "next/link";
import type { Metadata } from "next";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "Mobile Phlebotomy | Testology, Inc.",
  description:
    "At-home and office blood draws from a certified phlebotomist, with the same lab-grade handling as an in-clinic visit.",
};

const details = [
  {
    title: "At-home & office draws",
    description:
      "A certified phlebotomist comes to your home or office for blood draws, rather than you traveling to a clinic.",
  },
  {
    title: "Tailored across industries",
    description:
      "Whether healthcare, corporate, or a specialized field, our mobile service adapts to your specific testing requirements.",
  },
  {
    title: "Available 24/7",
    description:
      "Health needs don't follow business hours — we offer flexible scheduling to accommodate any shift or business operation.",
  },
];

const faqs = [
  {
    question: "How far in advance do I need to schedule?",
    answer:
      "Same-day scheduling is often possible, but booking a day or two ahead helps guarantee your preferred time slot, especially outside standard business hours.",
  },
  {
    question: "Where are samples processed after the draw?",
    answer:
      "Samples are handled with the same chain-of-custody and lab-grade standards as an in-clinic draw, then routed to the appropriate testing lab based on your specific panel.",
  },
  {
    question: "Can this be arranged for a group at one workplace?",
    answer:
      "Yes — let us know your headcount and location when scheduling and we'll coordinate a visit sized to your group.",
  },
];

export default function MobilePhlebotomyPage() {
  return (
    <>
      <ServicePageHeader
        eyebrow="At-home collection"
        title="Mobile phlebotomy"
        tagline="Certified blood draws, wherever you are"
        intro="For anyone who'd rather skip the clinic visit, our phlebotomists travel to your home or office for a professional blood draw, handled to the same standard as an in-clinic collection."
        image="https://images.pexels.com/photos/5206977/pexels-photo-5206977.jpeg?auto=compress&cs=tinysrgb&w=1200"
        iconName="Ambulance"
        color="from-pink-500 to-rose-600"
      />

      <section className="container-wide py-14">
        <h2 className="font-display-bolt mb-6 text-xl font-semibold text-slate-900">
          Why mobile phlebotomy
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {details.map((detail, index) => (
            <Reveal key={detail.title} delay={index * 80}>
              <div className="card-hover rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <h3 className="font-display-bolt mb-1.5 text-base font-semibold text-slate-900">
                  {detail.title}
                </h3>
                <p className="text-sm text-slate-500">{detail.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-wide pb-14">
        <h2 className="font-display-bolt mb-2 text-xl font-semibold text-slate-900">
          Frequently asked questions
        </h2>
        <p className="mb-6 max-w-xl text-sm text-slate-500">
          What to know before scheduling a mobile draw.
        </p>
        <Accordion items={faqs} />
      </section>

      <section className="border-t border-slate-100 bg-slate-50">
        <div className="container-wide py-12">
          <h2 className="font-display-bolt mb-2 text-xl font-semibold text-slate-900">
            Schedule a home visit
          </h2>
          <p className="mb-6 max-w-xl text-sm text-slate-500">
            Let us know which panel you need drawn and a location, and we&apos;ll get a
            phlebotomist scheduled.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition hover:bg-primary-700"
          >
            Book a visit
          </Link>
        </div>
      </section>
    </>
  );
}