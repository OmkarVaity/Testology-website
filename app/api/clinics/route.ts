import clinicsData from "@/content/clinics.json";
import { encodeClinic, type ClinicRecord } from "@/content/clinics";

// Built once at build time and served as a static, cacheable file.
export const dynamic = "force-static";

export function GET() {
  const clinics = (clinicsData as ClinicRecord[]).map(encodeClinic);
  return Response.json(clinics);
}
