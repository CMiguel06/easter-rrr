import {
  Image as ImageIcon,
  Fingerprint,
  Code2,
  EyeOff,
  QrCode,
  FileSearch,
  Sparkles,
  Puzzle,
  Lock,
  Key,
  Hash,
  ScanLine,
  FileCheck2,
  Stamp,
  Type,
  Binary,
  ShieldCheck,
  FileText,
  Route as RouteIcon,
  Code,
  Terminal,
  Gamepad2,
  EyeClosed,
  Search,
  FileDigit,
  Wand2,
  Eye,
  Download,
  Upload as UploadIcon,
  Bug,
  type LucideIcon,
} from "lucide-react";

export type Difficulty = "Easy" | "Medium" | "Advanced";
export type Category =
  | "Image & File Secrets"
  | "Text Encoders"
  | "Hash & Verification"
  | "Local Encryption"
  | "QR & Visual Clues"
  | "Website Easter Eggs"
  | "Puzzle Templates"
  | "Challenge Builder"
  | "Reveal Lab"
  | "Export & Local Sharing";

export type Tool = {
  to: string;
  icon: LucideIcon;
  title: string;
  description: string;
  category: Category;
  difficulty: Difficulty;
  localFirst?: boolean;
};

export const TOOLS: Tool[] = [
  // Image & File Secrets
  {
    to: "/tools/image-secret",
    icon: ImageIcon,
    title: "Hide message in image",
    description: "Tuck a secret note inside a PNG. Looks identical to the eye.",
    category: "Image & File Secrets",
    difficulty: "Medium",
    localFirst: true,
  },
  {
    to: "/tools/image-watermark",
    icon: Stamp,
    title: "Image watermark",
    description: "Add a subtle visible signature to any image.",
    category: "Image & File Secrets",
    difficulty: "Easy",
    localFirst: true,
  },
  {
    to: "/tools/file-checksum",
    icon: FileCheck2,
    title: "File checksum",
    description: "Generate a SHA fingerprint to verify a file hasn't changed.",
    category: "Image & File Secrets",
    difficulty: "Easy",
    localFirst: true,
  },
  {
    to: "/tools/metadata",
    icon: FileSearch,
    title: "Metadata viewer",
    description: "See what your photos quietly reveal — and strip it away.",
    category: "Image & File Secrets",
    difficulty: "Easy",
    localFirst: true,
  },

  // Text Encoders
  {
    to: "/tools/encoder",
    icon: Code2,
    title: "Encoder / Decoder Lab",
    description: "Base64, Base32, hex, binary, ROT13, Caesar, Morse, URL, Unicode.",
    category: "Text Encoders",
    difficulty: "Easy",
    localFirst: true,
  },
  {
    to: "/tools/invisible-text",
    icon: EyeOff,
    title: "Invisible text",
    description: "Slip a message between letters using zero-width characters.",
    category: "Text Encoders",
    difficulty: "Medium",
    localFirst: true,
  },
  {
    to: "/tools/acrostic",
    icon: Type,
    title: "Acrostic maker",
    description: "Hide a word in the first letters of each line.",
    category: "Text Encoders",
    difficulty: "Easy",
    localFirst: true,
  },
  {
    to: "/tools/nth-letter",
    icon: Binary,
    title: "Nth-letter extractor",
    description: "Hide or reveal messages with every Nth character.",
    category: "Text Encoders",
    difficulty: "Easy",
    localFirst: true,
  },

  // Hash & Verification
  {
    to: "/tools/hash",
    icon: Fingerprint,
    title: "Phrase hash",
    description: "Turn any phrase into a SHA fingerprint.",
    category: "Hash & Verification",
    difficulty: "Easy",
    localFirst: true,
  },
  {
    to: "/tools/hmac",
    icon: Hash,
    title: "HMAC generator",
    description: "A keyed hash that proves a message matches a secret.",
    category: "Hash & Verification",
    difficulty: "Medium",
    localFirst: true,
  },
  {
    to: "/tools/final-door",
    icon: ShieldCheck,
    title: "Final answer verifier",
    description: "Build a local gate that opens with the right answer.",
    category: "Hash & Verification",
    difficulty: "Medium",
    localFirst: true,
  },

  // Local Encryption
  {
    to: "/tools/encrypt",
    icon: Lock,
    title: "Password encryption",
    description: "Encrypt a message locally with AES-GCM and a password.",
    category: "Local Encryption",
    difficulty: "Medium",
    localFirst: true,
  },
  {
    to: "/tools/secret-note",
    icon: Key,
    title: "Secret note file",
    description: "Save and re-open a small encrypted note as a local file.",
    category: "Local Encryption",
    difficulty: "Easy",
    localFirst: true,
  },

  // QR & Visual Clues
  {
    to: "/tools/qr-secret",
    icon: QrCode,
    title: "Secret QR",
    description: "Wrap a message, link or clue in a scannable square.",
    category: "QR & Visual Clues",
    difficulty: "Easy",
    localFirst: true,
  },
  {
    to: "/tools/qr-trail",
    icon: RouteIcon,
    title: "QR Trail Builder",
    description: "Stack a sequence of QR clues into a trail.",
    category: "QR & Visual Clues",
    difficulty: "Medium",
    localFirst: true,
  },

  // Website Easter Eggs
  {
    to: "/tools/html-comment",
    icon: Code,
    title: "HTML comment",
    description: "Generate a hidden comment snippet for your site source.",
    category: "Website Easter Eggs",
    difficulty: "Easy",
    localFirst: true,
  },
  {
    to: "/tools/console-message",
    icon: Terminal,
    title: "Console message",
    description: "A small script that whispers in the browser console.",
    category: "Website Easter Eggs",
    difficulty: "Easy",
    localFirst: true,
  },
  {
    to: "/tools/konami",
    icon: Gamepad2,
    title: "Konami code",
    description: "Trigger a reveal with the classic ↑↑↓↓←→←→BA combo.",
    category: "Website Easter Eggs",
    difficulty: "Medium",
    localFirst: true,
  },
  {
    to: "/tools/css-hidden-text",
    icon: EyeClosed,
    title: "Hidden CSS text",
    description: "Tiny tricks for playful in-page reveals.",
    category: "Website Easter Eggs",
    difficulty: "Easy",
    localFirst: true,
  },

  // Puzzle Templates
  {
    to: "/puzzles",
    icon: Puzzle,
    title: "Puzzle templates",
    description: "Ready-made challenges you can adapt in minutes.",
    category: "Puzzle Templates",
    difficulty: "Easy",
    localFirst: true,
  },

  // Challenge Builder
  {
    to: "/tools/challenge",
    icon: Sparkles,
    title: "Challenge builder",
    description: "Stack steps into a small treasure hunt and export it.",
    category: "Challenge Builder",
    difficulty: "Advanced",
    localFirst: true,
  },

  // Reveal Lab
  {
    to: "/tools/easter-hunter",
    icon: Wand2,
    title: "Easter Hunter",
    description: "Inspect text, images and files for possible hidden clues.",
    category: "Reveal Lab",
    difficulty: "Easy",
    localFirst: true,
  },
  {
    to: "/tools/encoding-detector",
    icon: Search,
    title: "Encoding detector",
    description: "Guess what encoding a piece of text might be.",
    category: "Reveal Lab",
    difficulty: "Easy",
    localFirst: true,
  },
  {
    to: "/tools/file-signature",
    icon: FileDigit,
    title: "File signature",
    description: "Read the first bytes of a file to identify its type.",
    category: "Reveal Lab",
    difficulty: "Medium",
    localFirst: true,
  },
  {
    to: "/tools/hex-viewer",
    icon: Binary,
    title: "Hex viewer",
    description: "Peek at the raw bytes of a local file.",
    category: "Reveal Lab",
    difficulty: "Advanced",
    localFirst: true,
  },
  {
    to: "/tools/strings",
    icon: FileText,
    title: "Strings extractor",
    description: "Pull readable text fragments out of a file.",
    category: "Reveal Lab",
    difficulty: "Medium",
    localFirst: true,
  },
  {
    to: "/tools/invisible-detector",
    icon: Eye,
    title: "Invisible detector",
    description: "Highlight invisible Unicode hiding inside text.",
    category: "Reveal Lab",
    difficulty: "Easy",
    localFirst: true,
  },
  {
    to: "/tools/qr-decoder",
    icon: ScanLine,
    title: "QR decoder",
    description: "Read a QR code from a local image.",
    category: "Reveal Lab",
    difficulty: "Easy",
    localFirst: true,
  },
  {
    to: "/tools/source-clue-finder",
    icon: Bug,
    title: "Source clue finder",
    description: "Spot playful hidden clues in pasted HTML.",
    category: "Reveal Lab",
    difficulty: "Medium",
    localFirst: true,
  },
  {
    to: "/tools/puzzle-reverse",
    icon: RouteIcon,
    title: "Puzzle reverse path",
    description: "Step through transformations to solve a clue.",
    category: "Reveal Lab",
    difficulty: "Medium",
    localFirst: true,
  },

  // Export & Local Sharing
  {
    to: "/tools/export",
    icon: Download,
    title: "Export centre",
    description: "Download local results as TXT, JSON, Markdown, PNG or SVG.",
    category: "Export & Local Sharing",
    difficulty: "Easy",
    localFirst: true,
  },
  {
    to: "/tools/import",
    icon: UploadIcon,
    title: "Import centre",
    description: "Open a local Easter challenge or secret note file.",
    category: "Export & Local Sharing",
    difficulty: "Easy",
    localFirst: true,
  },
];

export const CATEGORIES: { name: Category; description: string; icon: LucideIcon }[] = [
  {
    name: "Image & File Secrets",
    description: "Hide messages inside images and verify files.",
    icon: ImageIcon,
  },
  {
    name: "Text Encoders",
    description: "Transform messages into codes and invisible forms.",
    icon: Code2,
  },
  {
    name: "Hash & Verification",
    description: "Fingerprint phrases and verify answers locally.",
    icon: Fingerprint,
  },
  {
    name: "Local Encryption",
    description: "Encrypt and decrypt with a password — nothing leaves your browser.",
    icon: Lock,
  },
  {
    name: "QR & Visual Clues",
    description: "Wrap clues in scannable squares and trails.",
    icon: QrCode,
  },
  {
    name: "Website Easter Eggs",
    description: "Playful hidden touches for your own pages.",
    icon: Code,
  },
  {
    name: "Reveal Lab",
    description: "Inspect text, files and images for hidden clues.",
    icon: Wand2,
  },
  { name: "Puzzle Templates", description: "Ready-made puzzles to adapt and share.", icon: Puzzle },
  {
    name: "Challenge Builder",
    description: "Compose multi-step treasure hunts and export them.",
    icon: Sparkles,
  },
  {
    name: "Export & Local Sharing",
    description: "Move results in and out as local files.",
    icon: Download,
  },
];

export function toolsByCategory(category: Category) {
  return TOOLS.filter((t) => t.category === category);
}
