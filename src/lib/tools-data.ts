import {
  Image as ImageIcon,
  Fingerprint,
  Code2,
  EyeOff,
  QrCode,
  FileSearch,
  Sparkles,
  Puzzle,
  type LucideIcon,
} from "lucide-react";

export type Tool = {
  to: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

export const TOOLS: Tool[] = [
  {
    to: "/tools/image-secret",
    icon: ImageIcon,
    title: "Hide message in an image",
    description: "Tuck a secret note inside a PNG. Looks identical to the eye.",
  },
  {
    to: "/tools/hash",
    icon: Fingerprint,
    title: "Generate a phrase hash",
    description: "Turn a phrase into a fingerprint that's easy to verify.",
  },
  {
    to: "/tools/encoder",
    icon: Code2,
    title: "Encode / decode text",
    description: "Base64, binary, hex, ROT13, Morse and ASCII — both directions.",
  },
  {
    to: "/tools/invisible-text",
    icon: EyeOff,
    title: "Create invisible text",
    description: "Slip a message between the letters using zero-width characters.",
  },
  {
    to: "/tools/qr-secret",
    icon: QrCode,
    title: "Create a secret QR",
    description: "Wrap any clue, link or coordinate in a beautiful QR code.",
  },
  {
    to: "/tools/metadata",
    icon: FileSearch,
    title: "Analyse file metadata",
    description: "See what your photos quietly reveal — and strip it away.",
  },
  {
    to: "/tools/challenge",
    icon: Sparkles,
    title: "Create a complete challenge",
    description: "Stack steps into a small treasure hunt and export it.",
  },
  {
    to: "/puzzles",
    icon: Puzzle,
    title: "Puzzle builder",
    description: "Ready-made templates to spark your next mystery.",
  },
];
