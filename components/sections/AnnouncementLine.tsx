"use client";

import { useSyncExternalStore } from "react";
import { announcement, announcementActive } from "@/content/announcement";

const noSubscribe = () => () => {};

// The notice's short line for the homepage notice bar, so it's still visible after someone closes the pop-up.
// Checked in the browser, so it disappears on the end date without a redeploy.
export function AnnouncementLine() {
  const active = useSyncExternalStore(noSubscribe, () => announcementActive(), () => false);
  if (!active || !announcement) return null;
  return <p className="mb-1 text-sm font-semibold text-red-700">{announcement.short}</p>;
}
