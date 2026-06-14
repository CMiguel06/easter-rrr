# Easter

**Easter** is a local-first creative laboratory for hidden messages, secret clues, encoded text, QR trails and small digital puzzles. It was designed as a quiet, elegant space for people who enjoy curiosity, discovery and small technical tricks without needing accounts, dashboards, databases or the usual SaaS circus where even a button somehow needs telemetry.

The public version is available through GitHub Pages:

```txt
https://cmiguel06.github.io/easter-rrr/#/
```

The central idea is simple: **hide meaning, reward curiosity**. Easter lets a user create a clue, transform a message, hide information inside an image, generate a QR trail, validate a final answer with a hash, or inspect a local file for possible hidden content. The project is playful, but the underlying concepts are real: encoding, hashing, local encryption, steganography-inspired image manipulation, metadata inspection, binary inspection and browser-based cryptographic operations.

## What Easter does

Easter is organised around small tools that can be combined into puzzles, treasure hunts, private notes or educational demonstrations. A user can begin with a plain message and transform it into Base64, Base32, binary, hexadecimal, ROT13, Caesar cipher, Morse code, URL encoding, Unicode escape sequences or ASCII representations. The same toolset can also be used in reverse, which makes it useful both for creating and solving simple clue chains.

The image tools allow a user to place a hidden message inside a PNG, add a visible watermark to an image, inspect image metadata and generate checksums for local files. These tools are especially useful for puzzle design because an apparently ordinary image can become a carrier for a clue. The metadata viewer also helps demonstrate a less romantic but more important truth: files often say more than their owners intended. Charming, in the same way a CCTV camera is charming.

For verification, Easter includes hash-based tools such as phrase hashing, HMAC generation and a final answer verifier. These tools can be used to create a “final door”: the player enters an answer, the browser computes its hash locally and compares it with the expected fingerprint. This makes it possible to validate an answer without openly revealing it in the challenge file. It is important to understand the distinction: a hash is not encryption, and encoding is not encryption. Base64 is not a vault; it is a glass box with a label.

The local encryption tools use password-based encryption in the browser, allowing a user to encrypt and decrypt messages locally. Easter also includes a secret note workflow that can save and reopen a small encrypted note as a local file. These features are intended for lightweight private experimentation and puzzle creation, not for replacing professional security tools or long-term secret management.

Easter also includes QR-based tools. A user can generate a QR code containing a message, link, coordinate or clue; export it as PNG or SVG; decode a QR code from a local image; or build a sequence of QR clues as a trail. This makes the project suitable for small treasure hunts, classroom exercises, birthday games, escape-room style activities or digital scavenger hunts.

For website-based easter eggs, the project can generate hidden HTML comments, console messages, Konami-code triggers and CSS-hidden text. These are intentionally playful rather than secure. Anyone who opens the browser developer tools can find them, because developer tools are not witchcraft, despite what some project managers seem to believe.

The Reveal Lab is the investigative side of Easter. It can inspect text, images and files for signs of hidden content, guess possible encodings, highlight invisible Unicode characters, read file signatures, show raw bytes through a hex viewer, extract readable strings from files, decode QR images and search pasted HTML for hidden clues. These detections are heuristic and educational: they help the user investigate, but they do not magically prove intent or guarantee that a file contains a secret.

## Puzzle creation

Easter includes ready-made puzzle templates such as Hash Hunt, Image Whisper, Invisible Ink, QR Trail, Code Cascade, Final Door, Acrostic Letter Hunt, Source Code Secret and Console Door. These templates are starting points rather than rigid game modes. They help a creator understand how different techniques can be chained together into a small challenge.

The Challenge Builder allows several steps to be composed into a single flow. A challenge can include a clue, an encoded message, a binary step, a hash verification, an image-based step, a QR clue and a final reveal. The result can be previewed, reordered, exported to JSON or Markdown and later imported again. The goal is to make puzzle creation accessible without forcing the user to manually assemble files like a medieval scribe with npm installed.

## Local-first design

Easter is designed to run in the browser. It does not require accounts, does not save user history and does not intentionally store uploaded files. The application is statically hosted through GitHub Pages, and the actual processing is performed client-side whenever possible.

This design is intentional. A tool for hidden messages should not immediately behave like a suspicious data broker wearing a fake moustache. Files are handled locally, generated outputs are downloaded by the user, and challenge data can be exported or imported as local files.

There are still sensible limits. Users should avoid uploading sensitive material into any web application unless they understand the risks of their browser, device and environment. Metadata can expose information. Hidden HTML and CSS clues are not secure. Password-encrypted material cannot be recovered if the password is lost. Hashes cannot be “decoded”. Encoding can be reversed by anyone who recognises the format.

## Main features

Easter currently provides tools for image secrets, image watermarking, file checksums, metadata viewing and cleanup, text encoding and decoding, invisible text, acrostics, nth-letter extraction, phrase hashing, HMAC generation, final answer verification, local password encryption, secret note files, QR generation, QR trails, QR decoding, HTML comments, console messages, Konami-code triggers, hidden CSS text, source clue finding, file signatures, hex viewing, strings extraction, invisible-character detection, puzzle reverse paths, importing and exporting local challenge files.

The application is therefore useful for creative puzzles, educational demonstrations, light cryptography awareness, local experimentation, classroom activities, OSINT-adjacent training exercises and playful personal projects. It is not a penetration testing suite, not a forensic platform, not a secure password manager, not a covert communications product and definitely not a magic box that turns “hash” into “password” because YouTube comments said so.

## Technology stack

Easter is built with React, TypeScript and Vite. It uses TanStack Router for routing, Tailwind CSS for styling, Radix UI primitives for interface components, Lucide icons for visual language, the Web Crypto API for browser cryptographic operations and GitHub Pages for static deployment.

The project uses a static deployment strategy. Because it is hosted under `/easter-rrr/`, the Vite configuration must preserve the correct base path:

```ts
base: "/easter-rrr/"
```

The GitHub Pages workflow builds the application, adds `.nojekyll`, copies `index.html` to `404.html` for single-page-app routing support and publishes the `dist` directory.

## Getting started

Clone the repository and install the dependencies:

```bash
git clone https://github.com/CMiguel06/easter-rrr.git
cd easter-rrr
npm install
```

Run the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

The project also includes commands for linting, type checking and formatting:

```bash
npm run lint
npm run typecheck
npm run format
```

Before publishing changes, run at least the build and typecheck commands. A beautiful interface that does not compile is still just a decorative corpse.

## Project structure

The source code lives mainly inside `src`. Routes are defined under `src/routes`, reusable layout elements live under `src/components`, and the core browser-side logic is placed under `src/lib`. Tool definitions and categories are centralised in `src/lib/tools-data.ts`, while reusable puzzle templates are defined in `src/lib/puzzle-templates.ts`.

This structure keeps the project readable: routes describe pages, components describe interface pieces, and library files contain the actual transformations, detection logic, hashing, encryption, invisible-text handling and image-related utilities.

## Responsible use

Easter should be used with files, websites and content that the user owns or is authorised to inspect. The project can help create hidden messages and analyse local files, but it must not be used to hide abusive content, bypass consent, deceive people in harmful ways or inspect systems without permission.

The correct use case is curiosity, creativity and learning. The incorrect use case is pretending that “it was just a puzzle” after doing something stupid enough to make a compliance officer develop a migraine.

## Licence

This project is distributed under the MIT Licence. See [`LICENSE`](./LICENSE) for details.

## Contributing

Contributions are welcome when they improve clarity, usability, accessibility, security, local-first behaviour or the quality of the puzzle experience. See [`CONTRIBUTING.md`](./CONTRIBUTING.md) before opening an issue or pull request.

## Security

Please do not report security issues publicly. See [`SECURITY.md`](./SECURITY.md) for the responsible disclosure process.
