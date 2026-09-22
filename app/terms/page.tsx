import type { Metadata } from "next";
import { siteConfig } from "@/content/site-config";

export const metadata: Metadata = {
  title: "Terms of Service | Testology, Inc.",
  description: "Terms of Service governing use of the Testology, Inc. website and services.",
};

export default function TermsPage() {
  return (
    <section className="container-wide py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display-bolt mb-2 text-3xl font-bold text-slate-900">Terms of Service</h1>
        <p className="mb-8 text-sm text-slate-500">Last updated: [DATE — fill in before publishing]</p>

        <div className="space-y-8 text-sm leading-relaxed text-slate-700">
          <div>
            <h2 className="font-display-bolt mb-2 text-lg font-semibold text-slate-900">
              1. Acceptance of terms
            </h2>
            <p>
              By accessing or using this website, you agree to be bound by these Terms of
              Service. If you do not agree, please do not use this website.
            </p>
          </div>

          <div>
            <h2 className="font-display-bolt mb-2 text-lg font-semibold text-slate-900">
              2. Use of this website
            </h2>
            <p>
              This website is provided for informational purposes about the services offered by
              {" "}{siteConfig.name}. It does not constitute medical advice, and nothing on this
              site should be relied upon as a substitute for professional medical guidance.
            </p>
          </div>

          <div>
            <h2 className="font-display-bolt mb-2 text-lg font-semibold text-slate-900">
              3. Scheduling and services
            </h2>
            <p>
              Submitting a contact form or inquiry through this website does not guarantee an
              appointment or specific service outcome. All services are subject to availability
              and confirmation directly with our team.
            </p>
          </div>

          <div>
            <h2 className="font-display-bolt mb-2 text-lg font-semibold text-slate-900">
              4. Third-party links and content
            </h2>
            <p>
              Our website may link to or embed content from third-party services, including our
              live test catalogs. We are not responsible for the content or availability of
              third-party services.
            </p>
          </div>

          <div>
            <h2 className="font-display-bolt mb-2 text-lg font-semibold text-slate-900">
              5. Limitation of liability
            </h2>
            <p>
              To the fullest extent permitted by law, {siteConfig.name} is not liable for any
              indirect, incidental, or consequential damages arising from your use of this
              website.
            </p>
          </div>

          <div>
            <h2 className="font-display-bolt mb-2 text-lg font-semibold text-slate-900">
              6. Changes to these terms
            </h2>
            <p>
              We may revise these Terms of Service from time to time. Continued use of this
              website after changes are posted constitutes acceptance of the revised terms.
            </p>
          </div>

          <div>
            <h2 className="font-display-bolt mb-2 text-lg font-semibold text-slate-900">
              7. Governing law
            </h2>
            <p>
              These Terms of Service are governed by the laws of the Commonwealth of
              Massachusetts, without regard to conflict of law principles.
            </p>
          </div>

          <div>
            <h2 className="font-display-bolt mb-2 text-lg font-semibold text-slate-900">
              8. Contact us
            </h2>
            <p>
              Questions about these Terms of Service can be directed to{" "}
              <a href={`mailto:${siteConfig.contact.examsEmail}`} className="text-primary-600 underline">
                {siteConfig.contact.examsEmail}
              </a>{" "}
              or {siteConfig.contact.tollFree}.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}