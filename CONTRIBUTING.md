# Contributing to Easter

Thank you for considering a contribution to Easter. The project is intended to remain elegant, local-first, understandable and useful for creative puzzle design. Contributions should respect that identity. The goal is not to turn this into a bloated surveillance dashboard with thirteen onboarding modals and a pricing page nobody asked for.

## Project philosophy

Easter should help users create, transform, hide, verify and reveal small pieces of information in a playful and educational way. The application should remain static, lightweight and browser-based whenever possible. Features that require accounts, server-side storage, analytics, tracking, external uploads or unnecessary network calls should be treated with extreme suspicion.

A good contribution usually improves one of these areas: local-first processing, accessibility, interface clarity, puzzle quality, educational value, browser compatibility, security, privacy, code maintainability or export/import reliability.

## Before opening a pull request

Please check whether your change fits the project. A new tool should be understandable without a manual the size of a tax code. A new puzzle mechanic should be useful for creators and solvable by players. A security-related change should reduce risk without pretending that playful hidden content is equivalent to military-grade secrecy.

Before submitting, run the local checks:

```bash
npm install
npm run typecheck
npm run lint
npm run build
```

If formatting changes are needed, run:

```bash
npm run format
```

Please avoid mixing unrelated changes in the same pull request. A fix for QR decoding and a redesign of the homepage are two separate things. Combining them is how repositories develop the emotional stability of a haunted printer.

## Development setup

Clone the repository:

```bash
git clone https://github.com/CMiguel06/easter-rrr.git
cd easter-rrr
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Code style

The project uses TypeScript, React, Vite and Tailwind CSS. Prefer explicit, readable code over clever one-liners. Browser tools that manipulate files, bytes, hashes or encoded text should be written with careful error handling because users will upload strange files, broken files, empty files, cursed files and files named `final_final_REAL_v7.png` as if archaeology were a UI pattern.

Reusable logic should live in `src/lib`. Interface components should be placed under `src/components` when they are shared across routes. Page-specific logic can remain in the route file when it is small and easy to understand.

When adding a new tool, update the relevant route, the tool registry in `src/lib/tools-data.ts` and any related import/export or puzzle-template logic if applicable. The tool should clearly indicate whether it is local-first and should explain its limitations to the user when those limitations matter.

## Accessibility and usability

Easter should remain usable by people who are not specialists in cryptography, steganography, web development or binary formats. Labels, helper text and errors should be clear. Buttons should say what they do. Destructive or irreversible actions should not be disguised as clever interactions.

When adding UI, consider keyboard navigation, focus states, readable contrast, meaningful labels and screen-reader behaviour. A tool about hidden messages does not need hidden accessibility. That joke writes itself, unfortunately.

## Privacy and security expectations

Contributions must preserve the local-first model. Do not introduce remote file uploads, analytics, third-party tracking, hidden network calls or persistent storage unless there is a very strong reason and it is clearly documented.

Do not commit secrets, API keys, tokens, private certificates, sample credentials or real personal data. If test data is needed, use artificial examples.

Security issues should not be reported through public issues. Use the process described in `SECURITY.md`.

## Commit and pull request guidance

Use clear commit messages. They do not need to be theatrical, but they should explain the change. Examples:

```txt
fix: handle empty QR image input
feat: add nth-letter extraction tool
refactor: move hash helpers into shared library
```

A pull request should explain what changed, why it changed and how it was tested. Screenshots or short recordings are welcome for interface changes. For logic changes, describe the input cases tested and any edge cases considered.

## What may be rejected

A contribution may be rejected if it breaks the static GitHub Pages deployment, weakens privacy, introduces unnecessary dependencies, adds server-side requirements, reduces accessibility, duplicates an existing tool, makes the interface noisier, or encourages harmful use.

The project should stay focused: creative hidden messages, local transformations, puzzle building and reveal workflows. Anything outside that scope needs a very strong justification.

## Licence of contributions

By contributing to this repository, you agree that your contribution will be licensed under the same MIT Licence as the project.
