"use client";

import { useEffect, useRef } from "react";
import { CalendarX, X } from "lucide-react";
import { announcement, announcementActive } from "@/content/announcement";

const storageKey = (id: string) => `notice-dismissed:${id}`;

function wasDismissed(id: string): boolean {
  try {
    return localStorage.getItem(storageKey(id)) === "1";
  } catch {
    return false; // private browsing or blocked storage: just show it
  }
}

function rememberDismissed(id: string) {
  try {
    localStorage.setItem(storageKey(id), "1");
  } catch {
    // Storage unavailable: the notice may show again on the next visit, which is fine.
  }
}

// Pop-up for the notice in content/announcement.ts. Shown once per visitor (until they close it), and only until
// the notice's end date. A native <dialog>: keeps keyboard focus inside while open, closes with Esc, and is
// announced by screen readers.
export function AnnouncementDialog() {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    // Checked in the browser (not at build time), so the notice disappears on its end date with no redeploy.
    if (!announcement || !announcementActive() || wasDismissed(announcement.id)) return;
    const node = dialog.current;
    if (node && !node.open) node.showModal();
  }, []);

  if (!announcement) return null;
  const notice = announcement;

  const close = () => dialog.current?.close();

  return (
    <dialog
      ref={dialog}
      aria-labelledby="announcement-title"
      aria-describedby="announcement-body"
      onClose={() => rememberDismissed(notice.id)}
      // Tapping the dimmed area outside the box closes it too.
      onClick={(e) => e.target === e.currentTarget && close()}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border border-slate-100 bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-900/60 backdrop:backdrop-blur-sm"
    >
      <div className="relative p-6 sm:p-8">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>

        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50">
          <CalendarX className="h-6 w-6 text-amber-600" aria-hidden />
        </div>
        <h2 id="announcement-title" className="font-display-bolt mb-3 pr-10 text-xl font-bold sm:text-2xl">
          {notice.title}
        </h2>
        <div id="announcement-body" className="space-y-2 text-base leading-relaxed text-slate-600">
          {notice.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <button
          type="button"
          onClick={close}
          autoFocus
          className="mt-6 h-12 w-full rounded-xl bg-primary-600 text-base font-semibold text-white shadow-lg shadow-primary-500/30 transition-colors hover:bg-primary-700"
        >
          Got it
        </button>
      </div>
    </dialog>
  );
}
