// Encode binary message via zero-width Unicode characters.
const ZW_ZERO = "\u200B"; // zero-width space
const ZW_ONE = "\u200C";  // zero-width non-joiner
const ZW_END = "\u200D";  // zero-width joiner = terminator

const INVISIBLE_REGEX = /[\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF]/g;

export function hideInvisible(carrier: string, secret: string): string {
  const bytes = new TextEncoder().encode(secret);
  let bits = "";
  bytes.forEach((b) => (bits += b.toString(2).padStart(8, "0")));
  const encoded = bits.split("").map((b) => (b === "0" ? ZW_ZERO : ZW_ONE)).join("") + ZW_END;
  // Insert payload after the first character (or just append if empty)
  if (carrier.length === 0) return encoded;
  return carrier[0] + encoded + carrier.slice(1);
}

export function revealInvisible(text: string): string {
  const endIdx = text.indexOf(ZW_END);
  const payload = endIdx >= 0 ? text.slice(0, endIdx) : text;
  const bits = Array.from(payload)
    .filter((c) => c === ZW_ZERO || c === ZW_ONE)
    .map((c) => (c === ZW_ZERO ? "0" : "1"))
    .join("");
  if (!bits.length) throw new Error("No invisible message found.");
  const bytes = new Uint8Array(Math.floor(bits.length / 8));
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(bits.slice(i * 8, i * 8 + 8), 2);
  }
  return new TextDecoder().decode(bytes);
}

export function detectInvisible(text: string): number {
  return (text.match(INVISIBLE_REGEX) || []).length;
}

export function cleanInvisible(text: string): string {
  return text.replace(INVISIBLE_REGEX, "");
}
