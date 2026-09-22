import type { Metadata } from "next";
import { siteConfig } from "@/content/site-config";

export const metadata: Metadata = {
  title: "HIPAA Notice of Privacy Practices | Testology, Inc.",
  description: "How Testology, Inc. may use and disclose protected health information.",
};

export default function HipaaNoticePage() {
  return (
    <section className="container-wide py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display-bolt mb-2 text-3xl font-bold text-slate-900">
          Notice of Privacy Practices
        </h1>
        <p className="mb-2 text-sm font-semibold text-slate-700">
          THIS NOTICE DESCRIBES HOW MEDICAL INFORMATION ABOUT YOU MAY BE USED AND DISCLOSED AND
          HOW YOU CAN GET ACCESS TO THIS INFORMATION. PLEASE REVIEW IT CAREFULLY.
        </p>
        <p className="mb-8 text-sm text-slate-500">Effective date: [DATE — fill in before publishing]</p>

        <div className="space-y-8 text-sm leading-relaxed text-slate-700">
          <div>
            <h2 className="font-display-bolt mb-2 text-lg font-semibold text-slate-900">
              Our commitment to your privacy
            </h2>
            <p>
              {siteConfig.name} is required by law to maintain the privacy of your protected
              health information (PHI), provide you with this notice describing our legal duties
              and privacy practices, and follow the terms currently in effect.
            </p>
          </div>

          <div>
            <h2 className="font-display-bolt mb-2 text-lg font-semibold text-slate-900">
              How we may use and disclose your health information
            </h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Treatment:</strong> We may use and disclose your PHI to provide, coordinate,
                or manage your testing and care.
              </li>
              <li>
                <strong>Payment:</strong> We may use and disclose your PHI to bill and collect
                payment for services, including to your employer where testing is
                employer-requested.
              </li>
              <li>
                <strong>Health care operations:</strong> We may use your PHI for internal
                operations such as quality assessment and compliance activities.
              </li>
              <li>
                <strong>As required by law:</strong> We will disclose PHI when required by federal,
                state, or local law, including public health and regulatory reporting
                requirements applicable to DOT and workplace testing programs.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display-bolt mb-2 text-lg font-semibold text-slate-900">
              Your rights regarding your health information
            </h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>The right to request restrictions on certain uses and disclosures of your PHI</li>
              <li>The right to receive confidential communications</li>
              <li>The right to inspect and obtain a copy of your PHI</li>
              <li>The right to request an amendment to your PHI</li>
              <li>The right to receive an accounting of certain disclosures</li>
              <li>The right to receive a paper copy of this notice upon request</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display-bolt mb-2 text-lg font-semibold text-slate-900">
              Our responsibilities
            </h2>
            <p>
              We are required to maintain the privacy of your PHI, provide you with this notice
              of our legal duties and privacy practices, and notify you if a breach occurs that
              may have compromised the privacy or security of your information.
            </p>
          </div>

          <div>
            <h2 className="font-display-bolt mb-2 text-lg font-semibold text-slate-900">
              Complaints
            </h2>
            <p>
              If you believe your privacy rights have been violated, you may file a complaint
              with us or with the U.S. Department of Health and Human Services. Filing a
              complaint will not affect the services you receive from us.
            </p>
          </div>

          <div>
            <h2 className="font-display-bolt mb-2 text-lg font-semibold text-slate-900">
              Contact our Privacy Officer
            </h2>
            <p>
              Questions about this notice or to exercise your rights, contact:{" "}
              <a href={`mailto:${siteConfig.contact.examsEmail}`} className="text-primary-600 underline">
                {siteConfig.contact.examsEmail}
              </a>{" "}
              or {siteConfig.contact.tollFree}.{" "}
              <span className="text-slate-500">[Add designated Privacy Officer name/title]</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}