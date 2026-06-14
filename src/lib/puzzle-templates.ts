export type ChallengeStepKind = "clue" | "base64" | "binary" | "hash" | "image" | "qr" | "reveal";

export type ChallengeStep = {
  id: string;
  kind: ChallengeStepKind;
  value: string;
};

export type PuzzleTemplate = {
  slug: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Advanced";
  time: string;
  tool: string;
  to: string;
  steps: Omit<ChallengeStep, "id">[];
};

export const PUZZLE_TEMPLATES: PuzzleTemplate[] = [
  {
    slug: "hash-hunt",
    title: "Hash Hunt",
    description: "Players must discover the phrase that matches a hash.",
    difficulty: "Easy",
    time: "10 min",
    tool: "Phrase hash",
    to: "/tools/hash",
    steps: [
      { kind: "clue", value: "Find the phrase hidden in the room." },
      { kind: "hash", value: "curiosity rewarded" },
      { kind: "reveal", value: "The final answer is curiosity rewarded." },
    ],
  },
  {
    slug: "image-whisper",
    title: "Image Whisper",
    description: "A secret message hidden in a PNG. Players inspect to find it.",
    difficulty: "Medium",
    time: "15 min",
    tool: "Image secret",
    to: "/tools/image-secret",
    steps: [
      { kind: "clue", value: "Download the image and look for a message beneath the pixels." },
      { kind: "image", value: "look beneath the pixels" },
      { kind: "reveal", value: "The hidden image points to the next clue." },
    ],
  },
  {
    slug: "invisible-ink",
    title: "Invisible Ink",
    description: "A hidden message embedded between visible characters.",
    difficulty: "Easy",
    time: "10 min",
    tool: "Invisible text",
    to: "/tools/invisible-text",
    steps: [
      { kind: "clue", value: "This ordinary sentence carries a message no one can see." },
      { kind: "clue", value: "Use the invisible text reveal tool." },
      { kind: "reveal", value: "The invisible message gives the final answer." },
    ],
  },
  {
    slug: "qr-trail",
    title: "QR Trail",
    description: "A sequence of QR clues leads to a final answer.",
    difficulty: "Medium",
    time: "20 min",
    tool: "QR trail",
    to: "/tools/qr-trail",
    steps: [
      { kind: "qr", value: "Find the next clue under the old map." },
      { kind: "qr", value: "Look behind the blue book." },
      { kind: "reveal", value: "The last QR reveals the answer." },
    ],
  },
  {
    slug: "code-cascade",
    title: "Code Cascade",
    description: "A message encoded through several transformations.",
    difficulty: "Advanced",
    time: "25 min",
    tool: "Encoder lab",
    to: "/tools/encoder",
    steps: [
      { kind: "base64", value: "the second key is rain" },
      { kind: "binary", value: "follow the river" },
      { kind: "reveal", value: "Decode every layer to reach the answer." },
    ],
  },
  {
    slug: "final-door",
    title: "Final Door",
    description: "A final answer verified locally against a hash.",
    difficulty: "Medium",
    time: "15 min",
    tool: "Final answer verifier",
    to: "/tools/final-door",
    steps: [
      { kind: "clue", value: "Collect every previous clue to guess the answer." },
      { kind: "hash", value: "midnight" },
      { kind: "reveal", value: "The gate opens when the SHA-256 hash matches." },
    ],
  },
  {
    slug: "acrostic-letter-hunt",
    title: "Acrostic Letter Hunt",
    description: "The first letters of lines reveal the hidden clue.",
    difficulty: "Easy",
    time: "10 min",
    tool: "Acrostic maker",
    to: "/tools/acrostic",
    steps: [
      { kind: "clue", value: "Write one clue per line." },
      { kind: "clue", value: "Read the first letter of each line." },
      { kind: "reveal", value: "The acrostic spells the next location." },
    ],
  },
  {
    slug: "source-code-secret",
    title: "Source Code Secret",
    description: "A clue hidden inside an HTML comment.",
    difficulty: "Easy",
    time: "10 min",
    tool: "HTML comment",
    to: "/tools/html-comment",
    steps: [
      { kind: "clue", value: "Open the page source." },
      { kind: "clue", value: "<!-- the clue is in the comment -->" },
      { kind: "reveal", value: "The source comment gives the answer." },
    ],
  },
  {
    slug: "console-door",
    title: "Console Door",
    description: "A hidden message appears in the browser console.",
    difficulty: "Medium",
    time: "15 min",
    tool: "Console message",
    to: "/tools/console-message",
    steps: [
      { kind: "clue", value: "Open the developer console." },
      { kind: "clue", value: "console.log('The next clue is behind the clock.')" },
      { kind: "reveal", value: "The console message points to the answer." },
    ],
  },
];

export function findPuzzleTemplate(slug?: string) {
  return PUZZLE_TEMPLATES.find((template) => template.slug === slug);
}
