import zipCentroids from "@/content/zip-centroids.json";
import { features } from "@/lib/features";

// One small static file per 3-digit zip prefix (e.g. /api/zip/021), so a zip search downloads ~1 KB
// instead of the whole table. Unknown prefixes 404 rather than rendering on demand.
const centroids: Record<string, Record<string, number[]>> = zipCentroids;

export const dynamicParams = false;

export function generateStaticParams() {
  if (!features.clinicLocator) return [];
  return Object.keys(centroids).map((prefix) => ({ prefix }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ prefix: string }> }) {
  const { prefix } = await params;
  return Response.json(centroids[prefix] ?? {});
}
