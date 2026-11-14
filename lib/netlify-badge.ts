"use client";

import { useSyncExternalStore } from "react";

// Netlify's free plan adds a "Powered by Netlify" badge: an iframe Netlify appends to <body>, pinned to the
// bottom-right corner of the screen. It would cover anything we pin to the bottom (the phone Call/Book bar, the
// catalog's compare tray), so those bars sit just above it while it's on the page. Once the badge is switched off
// in Netlify (Project configuration → General, paid plan) or a visitor hides it, the offset becomes 0 by itself.
const BADGE_ID = "nl-badge-frame";

function subscribe(onChange: () => void) {
  let watchedFrame: Element | null = null;
  const frameObserver = new MutationObserver(onChange);
  const watchFrame = () => {
    const frame = document.getElementById(BADGE_ID);
    if (frame === watchedFrame) return;
    frameObserver.disconnect();
    watchedFrame = frame;
    if (frame) frameObserver.observe(frame, { attributes: true, attributeFilter: ["style", "class", "hidden"] });
  };
  // Only direct children of <body> (where Netlify inserts the badge), not the whole page: cheap to watch.
  const bodyObserver = new MutationObserver(() => {
    watchFrame();
    onChange();
  });
  bodyObserver.observe(document.body, { childList: true });
  watchFrame();
  window.addEventListener("resize", onChange);
  return () => {
    bodyObserver.disconnect();
    frameObserver.disconnect();
    window.removeEventListener("resize", onChange);
  };
}

/** Pixels the badge takes up at the bottom of the screen, or 0 when there's no visible badge. */
function getOffset(): number {
  const frame = document.getElementById(BADGE_ID);
  if (!frame || getComputedStyle(frame).display === "none") return 0;
  const rect = frame.getBoundingClientRect();
  const atBottom = rect.height > 0 && rect.bottom >= window.innerHeight - 2;
  return atBottom ? Math.round(window.innerHeight - rect.top) : 0;
}

/** Use as `bottom` for anything fixed to the bottom of the screen, so the Netlify badge doesn't cover it. */
export function useNetlifyBadgeOffset(): number {
  return useSyncExternalStore(subscribe, getOffset, () => 0);
}
