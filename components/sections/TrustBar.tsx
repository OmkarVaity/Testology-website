import { siteConfig } from "@/content/site-config";

export function TrustBar() {
  return (
    <div className="border-b border-slate-100 bg-white">
      <div className="container-wide py-2.5 text-center">
        <p className="text-xs font-medium text-amber-600">{siteConfig.hours.lastWalkIn}</p>
      </div>
    </div>
  );
}