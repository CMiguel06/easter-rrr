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

export const encoders = {
  base64: {
    encode: (s: string) => {
      const bytes = new TextEncoder().encode(s);
      let bin = "";
      bytes.forEach((b) => (bin += String.fromCharCode(b)));
      return btoa(bin);
    },
    decode: (s: string) => {
      const bin = atob(s.trim());
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      return new TextDecoder().decode(bytes);
    },
  },
  binary: {
    encode: (s: string) =>
      Array.from(new TextEncoder().encode(s))
        .map((b) => b.toString(2).padStart(8, "0"))
        .join(" "),
    decode: (s: string) => {
      const parts = s.trim().split(/\s+/).filter(Boolean);
      const bytes = new Uint8Array(parts.length);
      for (let i = 0; i < parts.length; i++) bytes[i] = parseInt(parts[i], 2);
      return new TextDecoder().decode(bytes);
    },
  },
  hex: {
    encode: (s: string) =>
      Array.from(new TextEncoder().encode(s))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join(" "),
    decode: (s: string) => {
      const clean = s.replace(/[^0-9a-fA-F]/g, "");
      const bytes = new Uint8Array(clean.length / 2);
      for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
      return new TextDecoder().decode(bytes);
    },
  },
  rot13: {
    encode: (s: string) =>
      s.replace(/[a-zA-Z]/g, (c) => {
        const base = c <= "Z" ? 65 : 97;
        return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
      }),
    decode: (s: string) => encoders.rot13.encode(s),
  },
  morse: {
    encode: (s: string) =>
      s
        .toUpperCase()
        .split(" ")
        .map((word) =>
          word
            .split("")
            .map((ch) => MORSE[ch] ?? "")
            .filter(Boolean)
            .join(" "),
        )
        .join(" / "),
    decode: (s: string) =>
      s
        .trim()
        .split(/\s*\/\s*/)
        .map((w) =>
          w
            .split(/\s+/)
            .map((code) => MORSE_INV[code] ?? "")
            .join(""),
        )
        .join(" "),
  },
  ascii: {
    encode: (s: string) =>
      Array.from(s).map((c) => c.charCodeAt(0)).join(" "),
    decode: (s: string) =>
      s
        .trim()
        .split(/\s+/)
        .map((n) => String.fromCharCode(parseInt(n, 10)))
        .join(""),
  },
};

export type EncoderKey = keyof typeof encoders;
