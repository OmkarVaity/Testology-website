// Site-wide notice (holiday closures, snow days, changed hours). It pops up once when someone opens the website,
// and also appears in the orange notice bar on the homepage, until `showUntil`. After that it hides itself, so
// there's no need to remember to take it down.
//
// To post a new notice: edit the text and dates below, and change `id` (visitors who closed the old notice will
// then see the new one). To have no notice at all: `export const announcement: Announcement | null = null;`
export type Announcement = {
  /** Change this whenever the notice changes. */
  id: string;
  title: string;
  /** Paragraphs shown in the pop-up. */
  lines: string[];
  /** One short line for the homepage notice bar. */
  short: string;
  /** Hidden from this moment on. Boston time: -05:00 in winter (EST), -04:00 in summer (EDT). */
  showUntil: string;
};

export const announcement: Announcement | null = {
  id: "closed-2026-11-26-to-28",
  title: "Closed for Thanksgiving",
  lines: [
    "We are closed for Thanksgiving on Thursday, November 26, Friday, November 27, and Saturday, November 28.",
    "We will reopen on Monday, November 30, 2026. Happy Thanksgiving!",
  ],
  short: "Closed for Thanksgiving, Thursday, Nov 26 – Saturday, Nov 28. We reopen Monday, Nov 30.",
  showUntil: "2026-11-30T00:00:00-05:00", // midnight as Monday, Nov 30 starts
};

/** True while the notice should be shown. */
export function announcementActive(now: Date = new Date()): boolean {
  return announcement !== null && now < new Date(announcement.showUntil);
}
