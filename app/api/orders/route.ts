import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { clinicOffersService, getService } from "@/content/escreen-services";
import { getAllClinics } from "@/lib/clinic-directory";
import { fieldErrors, orderSchema } from "@/lib/ordering";

// Validates an order end to end. Until a HIPAA-compliant order database is connected, nothing is stored or
// sent anywhere — not to email, logs or the contact form's Google Sheet — and production refuses orders, so a
// deployed site can't accept an order nobody will see. In development it returns a preview reference so the
// /order flow can be tested.
const ACCEPTING_ORDERS = process.env.NODE_ENV !== "production";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = orderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the highlighted fields", fields: fieldErrors(parsed.error) }, { status: 400 });
  }
  const order = parsed.data;

  // The browser only shows eligible clinics, but re-check here: clinic must exist and offer every chosen test.
  const clinic = getAllClinics().find((c) => c.id === order.clinic.clinicId);
  if (!clinic) {
    return NextResponse.json({ error: "That clinic is no longer available. Please choose another." }, { status: 400 });
  }
  const unsupported = order.tests.items
    .map((item) => getService(item.serviceId)!)
    .filter((service) => !clinicOffersService(clinic, service));
  if (unsupported.length) {
    return NextResponse.json(
      { error: `${clinic.name} doesn't offer ${unsupported.map((s) => s.name).join(", ")}. Please choose another clinic.` },
      { status: 400 },
    );
  }

  if (!ACCEPTING_ORDERS) {
    return NextResponse.json(
      { error: "Online ordering isn't open yet. Please call us to place this order." },
      { status: 503 },
    );
  }

  // TODO(order database): persist the order, notify staff without including donor details, then return.
  const reference = `TST-${randomBytes(3).toString("hex").toUpperCase()}`;
  return NextResponse.json({ reference, preview: true });
}
