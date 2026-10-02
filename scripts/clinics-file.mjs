// Shared read/write for content/clinics.json. Thousands of clinics are written one per line, so the file stays
// compact and a git diff shows exactly which clinics were added or re-geocoded.
import { readFile, writeFile } from "node:fs/promises";

export async function readClinics(filePath) {
  return JSON.parse(await readFile(filePath, "utf-8"));
}

export async function writeClinics(filePath, clinics) {
  const body = clinics.map((clinic) => "  " + JSON.stringify(clinic)).join(",\n");
  await writeFile(filePath, `[\n${body}\n]\n`, "utf-8");
}
