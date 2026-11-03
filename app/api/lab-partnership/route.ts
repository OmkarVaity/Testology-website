import { NextResponse } from "next/server";
import { siteConfig } from "@/content/site-config";
import { formatPhoneNumber, labPartnershipSchema } from "@/lib/validations";
import { sendTeamEmail } from "@/lib/team-email";
import { logToSheet } from "@/lib/sheet-log";

// Lab partnership inquiries: emailed to the team inbox (reply-to set to the lab's contact) and copied to the
// "Lab partnership" tab of the Google Sheet. Only if both fail is the visitor told to call instead.
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = labPartnershipSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the highlighted fields", details: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;

  // Bots fill every field, including the hidden one. Pretend it worked so they don't retry.
  if (data.fax) return NextResponse.json({ status: "success" });

  const text = `
New lab partnership inquiry from the website

LAB
Name:     ${data.labName}
Type:     ${data.labType}
Website:  ${data.website || "—"}
Interested in: ${data.interests?.length ? data.interests.join("; ") : "—"}

CONTACT
Name:   ${data.contactName}${data.jobTitle ? ` (${data.jobTitle})` : ""}
Email:  ${data.email}
Phone:  ${formatPhoneNumber(data.phone)}

MESSAGE
${data.message}

Reply to this email to contact ${data.contactName} directly.
  `.trim();

  // Received if it reached the team by email OR landed in the Google Sheet backup.
  const [sent, logged] = await Promise.all([
    sendTeamEmail({ kind: "Lab partnership", summary: data.labName, replyTo: data.email, text }),
    logToSheet("Lab partnership", {
      Lab: data.labName,
      "Lab type": data.labType,
      Contact: data.contactName,
      "Job title": data.jobTitle,
      Email: data.email,
      Phone: formatPhoneNumber(data.phone),
      Website: data.website,
      Interests: data.interests,
      Message: data.message,
    }),
  ]);
  if (!sent && !logged) {
    return NextResponse.json(
      { error: `We couldn't send your inquiry. Please call us at ${siteConfig.contact.tollFree}.` },
      { status: 502 },
    );
  }

  return NextResponse.json({ status: "success" });
}
