import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-gradient-to-b from-primary-50/50 via-white to-white py-20">
      <div className="grid-pattern absolute inset-0 opacity-30" />
      <div className="hero-glow absolute inset-0" />

      <div className="container-wide relative z-10 flex flex-col items-center text-center">
        <span className="font-display-bolt mb-4 text-7xl font-bold text-primary-200 lg:text-8xl">
          404
        </span>
        <h1 className="font-display-bolt mb-3 text-2xl font-bold text-slate-900 lg:text-3xl">
          We couldn&apos;t find that page
        </h1>
        <p className="mb-8 max-w-md text-slate-600">
          The page you&apos;re looking for may have moved or no longer exists. Let&apos;s get you
          back on track.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/">
            <span className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition hover:bg-primary-700">
              <Home className="h-4 w-4" />
              Back to homepage
            </span>
          </Link>
          <Link href="/contact">
            <span className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border-2 border-slate-200 px-6 text-sm font-semibold text-slate-700 transition hover:border-primary-300 hover:bg-primary-50">
              Contact us
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}