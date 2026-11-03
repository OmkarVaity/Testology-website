// Every website form (contact, lab partnership, "Buy now") emails the team through here, so they all go to the
// same inbox — siteConfig.contact.examsEmail — with the same sender and a consistent subject line that
// Outlook rules can sort on ("[Website] Contact: …", "[Website] Lab partnership: …").
//
// Sender: set EMAIL_FROM (e.g. "Testology Website <website@testology.org>") once testology.org is verified
// in Resend. Until then Resend's shared test sender is used, which only delivers to the inbox that owns the
// Resend account.
import { Resend } from "resend";
import { siteConfig } from "@/content/site-config";

// Created on first use: `new Resend()` throws without an API key, and a missing setting on the host should
// fail one send (the contact form still logs to the Google Sheet), not crash every form at load.
let client: Resend | null = null;
function resendClient(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  client ??= new Resend(process.env.RESEND_API_KEY);
  return client;
}

const FROM = process.env.EMAIL_FROM ?? "Testology Website <onboarding@resend.dev>";

export const TEAM_INBOX = siteConfig.contact.examsEmail;

export type TeamEmail = {
  /** Kind of message, shown first in the subject: "Contact", "Lab partnership", "Drug test request". */
  kind: string;
  /** Rest of the subject, e.g. the sender's or lab's name. */
  summary: string;
  text: string;
  /** The visitor's address, so staff can reply straight from their inbox. */
  replyTo: string;
};

/** Sends to the team inbox. Resolves to true only if Resend accepted the message. */
export async function sendTeamEmail({ kind, summary, text, replyTo }: TeamEmail): Promise<boolean> {
  const resend = resendClient();
  if (!resend) {
    console.error(`${kind} email not sent: RESEND_API_KEY is not set`);
    return false;
  }
  try {
    const result = await resend.emails.send({
      from: FROM,
      to: TEAM_INBOX,
      replyTo,
      subject: `[Website] ${kind}: ${summary}`,
      text,
    });
    if (result.error) {
      console.error(`${kind} email rejected by Resend:`, result.error.message);
      return false;
    }
    return true;
  } catch (error) {
    console.error(`${kind} email failed:`, error instanceof Error ? error.message : error);
    return false;
  }
}
