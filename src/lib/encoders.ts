// Encoder/decoder utilities — all pure, browser-safe.

export const MORSE: Record<string, string> = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.",
  H: "....", I: "..", J: ".---", K: "-.-", L: ".-..", M: "--", N: "-.",
  O: "---", P: ".--.", Q: "--.-", R: ".-.", S: "...", T: "-", U: "..-",
  V: "...-", W: ".--", X: "-..-", Y: "-.--", Z: "--..",
  "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
  "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
  ".": ".-.-.-", ",": "--..--", "?": "..--..", "'": ".----.", "!": "-.-.--",
  "/": "-..-.", "(": "-.--.", ")": "-.--.-", "&": ".-...", ":": "---...",
  ";": "-.-.-.", "=": "-...-", "+": ".-.-.", "-": "-....-", "_": "..--.-",
  '"': ".-..-.", "$": "...-..-", "@": ".--.-.",
};
const MORSE_INV: Record<string, string> = Object.fromEntries(
  Object.entries(MORSE).map(([k, v]) => [v, k]),
);

const BASE32_ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

function base32Encode(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let bits = "", out = "";
  bytes.forEach((b) => (bits += b.toString(2).padStart(8, "0")));
  while (bits.length % 5) bits += "0";
  for (let i = 0; i < bits.length; i += 5) out += BASE32_ALPHA[parseInt(bits.slice(i, i + 5), 2)];
  while (out.length % 8) out += "=";
  return out;
}
function base32Decode(input: string): string {
  const clean = input.replace(/=+$/, "").toUpperCase().replace(/[^A-Z2-7]/g, "");
  let bits = "";
  for (const c of clean) bits += BASE32_ALPHA.indexOf(c).toString(2).padStart(5, "0");
  const bytes: number[] = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) bytes.push(parseInt(bits.slice(i, i + 8), 2));
  return new TextDecoder().decode(new Uint8Array(bytes));
}

function caesar(s: string, shift: number) {
  const k = ((shift % 26) + 26) % 26;
  return s.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= "Z" ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - base + k) % 26) + base);
  });
}

export const encoders = {
  base64: {
    encode: (s: string) => {
      const bytes = new TextEncoder().encode(s);
      let bin = ""; bytes.forEach((b) => (bin += String.fromCharCode(b)));
      return btoa(bin);
    },
    decode: (s: string) => {
      const bin = atob(s.trim());
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      return new TextDecoder().decode(bytes);
    },
  },
  base32: { encode: base32Encode, decode: base32Decode },
  binary: {
    encode: (s: string) =>
      Array.from(new TextEncoder().encode(s)).map((b) => b.toString(2).padStart(8, "0")).join(" "),
    decode: (s: string) => {
      const parts = s.trim().split(/\s+/).filter(Boolean);
      const bytes = new Uint8Array(parts.length);
      for (let i = 0; i < parts.length; i++) bytes[i] = parseInt(parts[i], 2);
      return new TextDecoder().decode(bytes);
    },
  },
  hex: {
    encode: (s: string) =>
      Array.from(new TextEncoder().encode(s)).map((b) => b.toString(16).padStart(2, "0")).join(" "),
    decode: (s: string) => {
      const clean = s.replace(/[^0-9a-fA-F]/g, "");
      const bytes = new Uint8Array(clean.length / 2);
      for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
      return new TextDecoder().decode(bytes);
    },
  },
  rot13: {
    encode: (s: string) => caesar(s, 13),
    decode: (s: string) => caesar(s, 13),
  },
  caesar3: { encode: (s: string) => caesar(s, 3), decode: (s: string) => caesar(s, -3) },
  url: {
    encode: (s: string) => encodeURIComponent(s),
    decode: (s: string) => decodeURIComponent(s.trim()),
  },
  unicode: {
    encode: (s: string) => Array.from(s).map((c) => "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0")).join(""),
    decode: (s: string) => s.replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16))),
  },
  morse: {
    encode: (s: string) =>
      s.toUpperCase().split(" ").map((w) => w.split("").map((c) => MORSE[c] ?? "").filter(Boolean).join(" ")).join(" / "),
    decode: (s: string) =>
      s.trim().split(/\s*\/\s*/).map((w) => w.split(/\s+/).map((c) => MORSE_INV[c] ?? "").join("")).join(" "),
  },
  ascii: {
    encode: (s: string) => Array.from(s).map((c) => c.charCodeAt(0)).join(" "),
    decode: (s: string) => s.trim().split(/\s+/).map((n) => String.fromCharCode(parseInt(n, 10))).join(""),
  },
};

export type EncoderKey = keyof typeof encoders;

export function caesarShift(s: string, shift: number) { return caesar(s, shift); }
