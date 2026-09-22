import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactFormSchema } from "@/lib/validations";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Send email notification via Resend
    const emailResult = await resend.emails.send({
      from: "Testology Website <onboarding@resend.dev>",
      to: process.env.CONTACT_FORM_TO_EMAIL ?? "exams@testology.org",
      subject: `New contact form submission from ${data.name}`,
      text: `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Service: ${data.service}
Message: ${data.message}
      `.trim(),
    });

    if (emailResult.error) {
      console.error("Resend error:", emailResult.error);
    }

    // Log to Google Sheet (best-effort — don't fail the whole request if this fails)
    if (process.env.GOOGLE_SHEET_WEBHOOK_URL) {
      try {
        await fetch(process.env.GOOGLE_SHEET_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } catch (sheetError) {
        console.error("Google Sheet logging failed:", sheetError);
      }
    }

    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("Contact form submission error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}