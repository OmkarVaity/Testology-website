"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    text: "The most reliable, efficient and professional medical examiners in Massachusetts!! Roei and his team have proven themselves time and time again and needless to say, they are truly the best!",
    author: "Verified Client",
    role: "Employer",
    rating: 5,
  },
  {
    text: "Quick, professional, and painless. I was in and out for my DOT physical in under 30 minutes. The staff is friendly and the facility is clean and modern.",
    author: "CDL Driver",
    role: "DOT Physical Patient",
    rating: 5,
  },
  {
    text: "As an HR manager, I appreciate how easy Testology makes our company drug testing program. From scheduling to results, everything is seamless and professional.",
    author: "HR Manager",
    role: "Corporate Client",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative bg-slate-50 py-20 lg:py-28">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary-700">
            Reviews
          </span>
          <h2 className="font-display-bolt text-balance mb-4 text-3xl font-bold text-slate-900 lg:text-5xl">
            What Our Clients Say
          </h2>
          <p className="text-lg text-slate-600">
            Trusted by individuals and employers across Massachusetts.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="card-hover relative rounded-2xl border border-slate-100 bg-white p-8 shadow-sm"
            >
              <Quote className="absolute right-6 top-6 h-10 w-10 text-primary-200" />
              <div className="mb-4 flex gap-1">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="relative z-10 mb-6 leading-relaxed text-slate-700">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 font-semibold text-white">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.author}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}