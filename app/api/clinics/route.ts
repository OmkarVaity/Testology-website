import clinicsData from "@/content/clinics.json";
import { encodeClinic, type ClinicRecord } from "@/content/clinics";
import { features } from "@/lib/features";

// Built once at build time and served as a static, cacheable file.
export const dynamic = "force-static";

export function GET() {
  if (!features.clinicLocator) return new Response(null, { status: 404 });
  const clinics = (clinicsData as ClinicRecord[]).map(encodeClinic);
  return Response.json(clinics);
}
