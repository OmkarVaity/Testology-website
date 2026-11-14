"use client";

import { MotionConfig } from "framer-motion";

// Turns off the slide/fade-in animations for visitors who enabled "Reduce motion" in their device settings
// (motion can cause dizziness or nausea for some people). Content then simply appears in place.
export function MotionPreferences({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
