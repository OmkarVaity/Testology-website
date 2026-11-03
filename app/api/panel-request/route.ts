import { NextResponse } from "next/server";
import { Resend } from "resend";
import { formatPrice, getDrugPanel } from "@/content/drug-catalog";
import { siteConfig } from "@/content/site-config";
import { formatPhoneNumber, panelRequestSchema } from "@/lib/validations";

const resend = new Resend(process.env.RESEND_API_KEY);

// "Buy now" requests from the drug catalog. Emails the team (same Resend setup as the contact form) with
// reply-to set to the customer, so staff can answer straight from their inbox. Unlike the contact form, a
// failed send is reported to the visitor — a purchase request must never be silently dropped.
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = panelRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the highlighted fields", details: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;

  // Bots fill every field, including the hidden one. Pretend it worked so they don't retry.
  if (data.website) return NextResponse.json({ status: "success" });

  const panel = getDrugPanel(data.panelId);
  if (!panel) {
    return NextResponse.json({ error: "That panel is no longer in our catalog." }, { status: 400 });
  }

  const price = formatPrice(panel.price) ?? "Pricing — contact us";
  const panelUrl = `${siteConfig.url}/catalog/drugs/${panel.id}`;
  const phone = formatPhoneNumber(data.phone);

  const text = `
New drug test request from the website

PANEL
${panel.name}
${[panel.code && `Ref ${panel.code}`, panel.sample, `${panel.inc.length} substances`].filter(Boolean).join(" · ")}
Price: ${price}
${panelUrl}

CUSTOMER
Name:  ${data.name}
Email: ${data.email}
Phone: ${phone}
Notes: ${data.notes || "—"}

Reply to this email to contact ${data.name} directly.
  `.trim();

  try {
    const result = await resend.emails.send({
      from: "Testology Website <onboarding@resend.dev>",
      to: process.env.CONTACT_FORM_TO_EMAIL ?? siteConfig.contact.examsEmail,
      replyTo: data.email,
      subject: `New drug test request: ${panel.name} — ${data.name}`,
      text,
    });
    if (result.error) throw new Error(result.error.message);
  } catch (error) {
    console.error("Panel request email failed:", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: `We couldn't send your request. Please call us at ${siteConfig.contact.tollFree}.` },
      { status: 502 },
    );
  }

  return NextResponse.json({ status: "success" });
}
