// Heuristic detectors for the Reveal Lab.

export type DetectKey = "base64" | "hex" | "binary" | "rot13" | "url" | "unicode" | "morse" | "ascii" | "hash" | "invisible" | "html-comment";

export type Detection = { key: DetectKey; label: string; confidence: "Low" | "Medium" | "High"; note: string };

const INVISIBLE_REGEX = /[\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF]/g;

export function detect(text: string): Detection[] {
  const t = text.trim();
  const out: Detection[] = [];
  if (!t) return out;

  if (INVISIBLE_REGEX.test(t)) out.push({ key: "invisible", label: "Invisible characters", confidence: "High", note: "Zero-width or bidi characters were found inside the text." });

  if (/^[A-Za-z0-9+/=\s]+$/.test(t) && t.replace(/\s+/g, "").length % 4 === 0 && t.length >= 8) {
    try { atob(t.replace(/\s+/g, "")); out.push({ key: "base64", label: "Looks like Base64", confidence: "Medium", note: "Characters match Base64 and the length is valid." }); } catch {}
  }
  if (/^[0-9a-fA-F\s]+$/.test(t) && t.replace(/\s+/g, "").length >= 8 && t.replace(/\s+/g, "").length % 2 === 0) {
    out.push({ key: "hex", label: "Looks like hexadecimal", confidence: "Medium", note: "Only hex digits — could be bytes encoded in hex." });
  }
  if (/^[01\s]+$/.test(t) && t.replace(/\s+/g, "").length >= 8) {
    out.push({ key: "binary", label: "Looks like binary", confidence: "Medium", note: "Only 0s and 1s — could be a binary-encoded message." });
  }
  if (/^[.\-/\s]+$/.test(t) && t.length >= 3) {
    out.push({ key: "morse", label: "Looks like Morse code", confidence: "High", note: "Only dots, dashes and slashes — try the Morse decoder." });
  }
  if (/%[0-9A-Fa-f]{2}/.test(t)) {
    out.push({ key: "url", label: "Contains URL-encoded characters", confidence: "High", note: "Sequences like %20 suggest URL encoding." });
  }
  if (/\\u[0-9a-fA-F]{4}/.test(t)) {
    out.push({ key: "unicode", label: "Contains Unicode escape sequences", confidence: "High", note: "\\uXXXX sequences are present." });
  }
  if (/^([0-9]{1,3}\s)+[0-9]{1,3}$/.test(t)) {
    out.push({ key: "ascii", label: "Looks like ASCII codes", confidence: "Medium", note: "Numbers separated by spaces could be character codes." });
  }
  if (/^[a-fA-F0-9]{32}$/.test(t)) out.push({ key: "hash", label: "Looks like an MD5 hash", confidence: "High", note: "32 hex characters — typical MD5 length." });
  if (/^[a-fA-F0-9]{40}$/.test(t)) out.push({ key: "hash", label: "Looks like a SHA-1 hash", confidence: "High", note: "40 hex characters — typical SHA-1 length." });
  if (/^[a-fA-F0-9]{64}$/.test(t)) out.push({ key: "hash", label: "Looks like a SHA-256 hash", confidence: "High", note: "64 hex characters — typical SHA-256 length." });
  if (/^[a-fA-F0-9]{128}$/.test(t)) out.push({ key: "hash", label: "Looks like a SHA-512 hash", confidence: "High", note: "128 hex characters — typical SHA-512 length." });

  // ROT13 heuristic: only letters but doesn't form common words (very loose)
  if (/^[A-Za-z\s.,!?'"-]+$/.test(t) && /[a-zA-Z]/.test(t) && !/\b(the|and|you|that|this|with|hello|easter)\b/i.test(t) && t.length >= 6) {
    out.push({ key: "rot13", label: "Might be ROT13 / Caesar shifted", confidence: "Low", note: "Plain letters that don't read as English — try ROT13 or Caesar." });
  }

  if (/<!--[\s\S]*?-->/.test(t)) {
    out.push({ key: "html-comment", label: "Contains HTML comments", confidence: "High", note: "<!-- ... --> blocks are present in the text." });
  }

  return out;
}

export const FILE_SIGNATURES: { sig: number[]; mime: string; ext: string }[] = [
  { sig: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a], mime: "image/png", ext: "PNG image" },
  { sig: [0xff, 0xd8, 0xff], mime: "image/jpeg", ext: "JPEG image" },
  { sig: [0x47, 0x49, 0x46, 0x38], mime: "image/gif", ext: "GIF image" },
  { sig: [0x52, 0x49, 0x46, 0x46], mime: "image/webp", ext: "RIFF (WebP/WAV)" },
  { sig: [0x25, 0x50, 0x44, 0x46], mime: "application/pdf", ext: "PDF document" },
  { sig: [0x50, 0x4b, 0x03, 0x04], mime: "application/zip", ext: "ZIP archive (or Office)" },
  { sig: [0x49, 0x44, 0x33], mime: "audio/mpeg", ext: "MP3 audio" },
  { sig: [0x66, 0x74, 0x79, 0x70], mime: "video/mp4", ext: "MP4 (offset 4)" }, // Note: appears at offset 4
];

export function identifySignature(bytes: Uint8Array): { mime: string; ext: string } | null {
  for (const s of FILE_SIGNATURES) {
    const offset = s.ext.includes("offset 4") ? 4 : 0;
    let match = true;
    for (let i = 0; i < s.sig.length; i++) if (bytes[offset + i] !== s.sig[i]) { match = false; break; }
    if (match) return { mime: s.mime, ext: s.ext };
  }
  return null;
}

export function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join(" ");
}

export function extractStrings(bytes: Uint8Array, min = 4): string[] {
  const out: string[] = [];
  let current = "";
  for (const b of bytes) {
    if (b >= 0x20 && b <= 0x7e) current += String.fromCharCode(b);
    else { if (current.length >= min) out.push(current); current = ""; }
  }
  if (current.length >= min) out.push(current);
  return out;
}
