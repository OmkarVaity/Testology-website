import type { Metadata } from "next";
import { siteConfig } from "@/content/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy | Testology, Inc.",
  description: "Testology, Inc.'s privacy policy covering how we collect, use, and protect your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="container-wide py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display-bolt mb-2 text-3xl font-bold text-slate-900">Privacy Policy</h1>
        <p className="mb-8 text-sm text-slate-500">Last updated: [DATE — fill in before publishing]</p>

        <div className="space-y-8 text-sm leading-relaxed text-slate-700">
          <div>
            <h2 className="font-display-bolt mb-2 text-lg font-semibold text-slate-900">
              1. Introduction
            </h2>
            <p>
              {siteConfig.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your
              privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard
              information when you visit our website or use our services. It does not apply to
              protected health information, which is instead governed by our HIPAA Notice of
              Privacy Practices.
            </p>
          </div>

          <div>
            <h2 className="font-display-bolt mb-2 text-lg font-semibold text-slate-900">
              2. Information we collect
            </h2>
            <p className="mb-2">We may collect the following categories of information:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Contact information you submit through our contact form (name, email, phone number)</li>
              <li>Information about the service you&apos;re inquiring about</li>
              <li>Technical information collected automatically, such as browser type and IP address, through standard web analytics</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display-bolt mb-2 text-lg font-semibold text-slate-900">
              3. How we use your information
            </h2>
            <p className="mb-2">We use the information we collect to:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Respond to inquiries submitted through our contact form</li>
              <li>Schedule and coordinate testing services</li>
              <li>Improve our website and services</li>
              <li>Comply with legal and regulatory obligations</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display-bolt mb-2 text-lg font-semibold text-slate-900">
              4. How we share your information
            </h2>
            <p>
              We do not sell your personal information. We may share information with service
              providers who help us operate our website and business (such as email delivery and
              form-processing services), or when required by law.
            </p>
          </div>

          <div>
            <h2 className="font-display-bolt mb-2 text-lg font-semibold text-slate-900">
              5. Data security
            </h2>
            <p>
              We take reasonable measures to protect the information we collect. However, no
              method of transmission over the internet is completely secure, and we cannot
              guarantee absolute security.
            </p>
          </div>

          <div>
            <h2 className="font-display-bolt mb-2 text-lg font-semibold text-slate-900">
              6. Your choices
            </h2>
            <p>
              You may contact us at any time to ask what information we hold about you, or to
              request that we delete information submitted through our contact form.
            </p>
          </div>

          <div>
            <h2 className="font-display-bolt mb-2 text-lg font-semibold text-slate-900">
              7. Changes to this policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. The &quot;last updated&quot;
              date at the top of this page reflects the most recent revision.
            </p>
          </div>

          <div>
            <h2 className="font-display-bolt mb-2 text-lg font-semibold text-slate-900">
              8. Contact us
            </h2>
            <p>
              If you have questions about this Privacy Policy, contact us at{" "}
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