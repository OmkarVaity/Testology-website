"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const photos = [
  {
    src: "/images/clinic/waiting-room.jpg",
    alt: "Testology's Brighton clinic waiting area",
    caption: "Waiting area",
  },
  {
    src: "/images/clinic/treatment-room.jpg",
    alt: "Testology's Brighton clinic treatment room",
    caption: "Treatment room",
  },
  {
    src: "/images/clinic/wellness-menu.jpg",
    alt: "Testology's Brighton clinic wellness and panel menu boards",
    caption: "Wellness & panel menu",
  },
];

export function FacilityGallery() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="relative bg-slate-50 py-20 lg:py-28">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary-700">
            Our facility
          </span>
          <h2 className="font-display-bolt text-balance mb-4 text-3xl font-bold text-slate-900 lg:text-5xl">
            Take a look inside
          </h2>
          <p className="text-lg text-slate-600">
            A real look at our Brighton clinic — clean, modern, and ready to serve you.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {photos.map((photo, i) => (
            <motion.button
              key={photo.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => setSelected(i)}
              className="card-hover group relative overflow-hidden rounded-2xl border border-slate-100 shadow-sm"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={500}
                height={380}
                className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-slate-900/60 via-transparent to-transparent p-4">
                <span className="text-sm font-semibold text-white">{photo.caption}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 p-6"
          >
            <button
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] w-full max-w-3xl overflow-hidden rounded-2xl"
            >
              <Image
                src={photos[selected].src}
                alt={photos[selected].alt}
                width={1200}
                height={900}
                className="h-full w-full object-contain"
              />
              <p className="bg-slate-900 py-3 text-center text-sm font-medium text-white">
                {photos[selected].caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}