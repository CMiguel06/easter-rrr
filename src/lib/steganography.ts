// Simple LSB steganography over PNG. Optional XOR password.
const MAGIC = "EST1";

function strToBytes(s: string): Uint8Array {
  return new TextEncoder().encode(s);
}
function bytesToStr(b: Uint8Array): string {
  return new TextDecoder().decode(b);
}

function xorWithPassword(data: Uint8Array, password: string): Uint8Array {
  if (!password) return data;
  const key = strToBytes(password);
  const out = new Uint8Array(data.length);
  for (let i = 0; i < data.length; i++) {
    out[i] = data[i] ^ key[i % key.length];
  }
  return out;
}

export async function hideMessageInImage(
  file: File,
  message: string,
  password = "",
): Promise<Blob> {
  const img = await loadImage(file);
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  const payloadStr = MAGIC + message;
  let payload = strToBytes(payloadStr);
  payload = xorWithPassword(payload, password);

  // 4-byte length header (after magic recognition we know it's our format)
  const len = payload.length;
  const header = new Uint8Array(4);
  header[0] = (len >> 24) & 0xff;
  header[1] = (len >> 16) & 0xff;
  header[2] = (len >> 8) & 0xff;
  header[3] = len & 0xff;

  const full = new Uint8Array(header.length + payload.length);
  full.set(header, 0);
  full.set(payload, header.length);

  const totalBits = full.length * 8;
  const capacity = (imageData.data.length / 4) * 3; // 3 channels per pixel
  if (totalBits > capacity) {
    throw new Error("Image too small for this message. Try a larger image or a shorter message.");
  }

  let bitIdx = 0;
  for (let i = 0; i < imageData.data.length && bitIdx < totalBits; i += 4) {
    for (let c = 0; c < 3 && bitIdx < totalBits; c++) {
      const byte = full[bitIdx >> 3];
      const bit = (byte >> (7 - (bitIdx & 7))) & 1;
      imageData.data[i + c] = (imageData.data[i + c] & 0xfe) | bit;
      bitIdx++;
    }
  }
  ctx.putImageData(imageData, 0, 0);
  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Export failed"))), "image/png");
  });
}

export async function revealMessageFromImage(file: File, password = ""): Promise<string> {
  const img = await loadImage(file);
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  // Read 4-byte length first
  const header = readBits(imageData.data, 0, 32);
  const len = (header[0] << 24) | (header[1] << 16) | (header[2] << 8) | header[3];
  if (len <= 0 || len > imageData.data.length) {
    throw new Error("No hidden message found in this image.");
  }
  const payload = readBits(imageData.data, 32, len * 8);
  const decoded = xorWithPassword(payload, password);
  const text = bytesToStr(decoded);
  if (!text.startsWith(MAGIC)) {
    throw new Error("No hidden message found, or the password is incorrect.");
  }
  return text.slice(MAGIC.length);
}

function readBits(data: Uint8ClampedArray, startBit: number, numBits: number): Uint8Array {
  const out = new Uint8Array(Math.ceil(numBits / 8));
  let bitIdx = 0;
  let pixelChannelIdx = startBit;
  while (bitIdx < numBits) {
    const channelOffset = pixelChannelIdx % 3;
    const pixel = Math.floor(pixelChannelIdx / 3);
    const dataIdx = pixel * 4 + channelOffset;
    const bit = data[dataIdx] & 1;
    out[bitIdx >> 3] |= bit << (7 - (bitIdx & 7));
    bitIdx++;
    pixelChannelIdx++;
  }
  return out;
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      resolve(img);
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      reject(new Error("Could not read image."));
      URL.revokeObjectURL(url);
    };
    img.src = url;
  });
}
