import { NextResponse } from "next/server";
import { formatPhoneNumber, contactFormSchema } from "@/lib/validations";
import { sendTeamEmail } from "@/lib/team-email";
import { logToSheet } from "@/lib/sheet-log";

// Labels as shown in the contact form's "Service" dropdown.
const SERVICE_LABELS: Record<string, string> = {
  "drug-alcohol-testing": "Drug & alcohol testing",
  "dot-testing": "DOT testing",
  "blood-profiles": "Blood profiles",
  "employer-solutions": "Employer solutions",
  other: "Other",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid submission", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const data = parsed.data;

    // The message counts as received if it reached the team by email OR was logged to the Google Sheet.
    // If neither worked, say so — the form then asks the visitor to call, instead of a false "thanks".
    const emailed = await sendTeamEmail({
      kind: "Contact",
      summary: data.name,
      replyTo: data.email,
      text: `
New message from the website contact form

Name:    ${data.name}
Email:   ${data.email}
Phone:   ${formatPhoneNumber(data.phone)}
Service: ${SERVICE_LABELS[data.service] ?? data.service}

MESSAGE
${data.message}

Reply to this email to contact ${data.name} directly.
      `.trim(),
    });

    const logged = await logToSheet("Contact", {
      Name: data.name,
      Email: data.email,
      Phone: formatPhoneNumber(data.phone),
      Service: SERVICE_LABELS[data.service] ?? data.service,
      Message: data.message,
    });

    if (!emailed && !logged) {
      return NextResponse.json({ error: "Your message couldn't be delivered" }, { status: 502 });
    }

    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("Contact form submission error:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
