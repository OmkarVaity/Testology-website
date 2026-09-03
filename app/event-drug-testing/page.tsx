import Link from "next/link";
import type { Metadata } from "next";
import { ServicePageHeader } from "@/components/sections/ServicePageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "Event Drug Testing | Testology, Inc.",
  description:
    "On-site group drug testing for competitions, leagues, and one-time events, with fast turnaround.",
};

const details = [
  {
    title: "Group & bulk testing",
    description:
      "On-site collection for large groups at once — sports leagues, competitions, or one-time compliance events. We regularly handle 50 or more employees at a single event.",
  },
  {
    title: "Fast turnaround for event timelines",
    description:
      "Rapid screening options so results are available within the event's own schedule, not days later.",
  },
  {
    title: "Custom panel selection",
    description:
      "Choose the specific substances or panel type relevant to your event's governing body or policy.",
  },
];

const faqs = [
  {
    question: "What's the minimum or maximum group size you handle?",
    answer:
      "There's no strict minimum, and we regularly handle events of 50 or more participants. Let us know your expected headcount when scheduling so we can bring the right amount of equipment and staff.",
  },
  {
    question: "How much lead time do you need to schedule an event?",
    answer:
      "The more notice the better, especially for larger groups, but we can often accommodate shorter-notice requests — reach out with your date and headcount and we'll confirm availability.",
  },
  {
    question: "Can results be provided the same day as the event?",
    answer:
      "Rapid screening options give same-day results for most panels. Any non-negative finding is sent to a certified lab for confirmation, which takes longer.",
  },
];

export default function EventDrugTestingPage() {
  return (
    <>
      <ServicePageHeader
        eyebrow="On-site, group scale"
        title="Event drug testing"
        tagline="Group testing for competitions & events"
        intro="For competitions, leagues, or one-time events that need group testing on a set schedule, we bring collection on-site and work within your event's timeline."
        image="https://images.pexels.com/photos/6285355/pexels-photo-6285355.jpeg?auto=compress&cs=tinysrgb&w=1200"
        iconName="Calendar"
        color="from-teal-500 to-emerald-600"
      />

      <section className="container-wide py-14">
        <h2 className="font-display-bolt mb-6 text-xl font-semibold text-slate-900">
          What we handle
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
          What to know before booking group testing for your event.
        </p>
        <Accordion items={faqs} />
      </section>

      <section className="border-t border-slate-100 bg-slate-50">
        <div className="container-wide py-12">
          <h2 className="font-display-bolt mb-2 text-xl font-semibold text-slate-900">
            Planning an event?
          </h2>
          <p className="mb-6 max-w-xl text-sm text-slate-500">
            Share your event size, date, and testing requirements and we&apos;ll put together a
            plan that fits your timeline.
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