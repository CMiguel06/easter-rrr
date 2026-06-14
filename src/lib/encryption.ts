// AES-GCM password-based encryption (PBKDF2 key derivation).
const enc = new TextEncoder();
const dec = new TextDecoder();

async function deriveKey(password: string, salt: BufferSource) {
  const baseKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(password) as BufferSource,
    "PBKDF2",
    false,
    ["deriveKey"],
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 150_000, hash: "SHA-256" },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

function toB64(bytes: Uint8Array) {
  let s = "";
  bytes.forEach((b) => (s += String.fromCharCode(b)));
  return btoa(s);
}
function fromB64(s: string) {
  const bin = atob(s.trim());
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

export async function encryptText(plain: string, password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(password, salt as BufferSource);
  const ct = new Uint8Array(
    await crypto.subtle.encrypt(
      { name: "AES-GCM", iv: iv as BufferSource },
      key,
      enc.encode(plain) as BufferSource,
    ),
  );
  return `EASTER1.${toB64(salt)}.${toB64(iv)}.${toB64(ct)}`;
}

export async function decryptText(payload: string, password: string): Promise<string> {
  const parts = payload.trim().split(".");
  if (parts.length !== 4 || parts[0] !== "EASTER1")
    throw new Error("This doesn't look like encrypted Easter text.");
  const salt = fromB64(parts[1]);
  const iv = fromB64(parts[2]);
  const ct = fromB64(parts[3]);
  const key = await deriveKey(password, salt as BufferSource);
  try {
    const pt = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: iv as BufferSource },
      key,
      ct as BufferSource,
    );
    return dec.decode(pt);
  } catch {
    throw new Error("Wrong password, or the text was modified.");
  }
}

export async function hmac(
  message: string,
  secret: string,
  algo: "SHA-256" | "SHA-512",
): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret) as BufferSource,
    { name: "HMAC", hash: algo },
    false,
    ["sign"],
  );
  const sig = new Uint8Array(
    await crypto.subtle.sign("HMAC", key, enc.encode(message) as BufferSource),
  );
  return Array.from(sig)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
