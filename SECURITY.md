# Security Policy

Easter is a local-first browser application for hidden messages, encodings, lightweight local encryption, QR clues, puzzle creation and file inspection. It is designed for creative and educational use, not as a professional cryptographic system, forensic suite, password manager or secure communications platform.

This document explains how security issues should be reported and how the project approaches security expectations.

## Supported versions

The currently supported version is the latest version published on the main branch and deployed through GitHub Pages.

Older forks, archived builds, downloaded copies or modified deployments are not actively supported unless explicitly stated by the maintainer.

## Responsible disclosure

Please do not open a public GitHub issue for a security vulnerability. Public disclosure before a fix is available can put users at risk and also creates the classic internet ritual where everyone pretends to be surprised that software has bugs.

To report a vulnerability, contact the maintainer privately through GitHub or by email if a public contact address is provided in the repository profile. Include enough detail to reproduce the issue, but do not include private data, real credentials or sensitive files.

A useful report should include:

```txt
- A clear description of the issue
- The affected page, tool or function
- Steps to reproduce
- Expected behaviour
- Actual behaviour
- Browser and operating system
- Proof-of-concept input, if safe to share
- Possible impact
- Suggested fix, if available
```

## Scope

Security reports are especially relevant when they concern cross-site scripting, unsafe rendering of user-provided content, unexpected network transmission of local data, leakage of uploaded files, incorrect handling of encrypted notes, weaknesses in local cryptographic implementation, unsafe import/export behaviour, dependency vulnerabilities with practical impact, or GitHub Pages deployment misconfiguration.

Reports about the inherent limitations of encoding, hashing, hidden HTML comments, CSS-hidden text or visible source code are generally not vulnerabilities. They are documented limitations. Base64 being reversible is not a bug; it is Base64 doing the one job it has, bravely and without a pension plan.

## Out of scope

The following are normally out of scope:

```txt
- Social engineering attacks
- Issues requiring full control of the user's device or browser
- Browser extensions installed by the user that modify page behaviour
- Vulnerabilities in outdated forks or modified third-party deployments
- Reports that only state that hashes cannot be decrypted
- Reports that HTML comments are visible in source code
- Reports caused by users sharing their own exported files publicly
- Denial-of-service scenarios with extremely large local files
- The absence of server-side account security, because the project has no accounts
```

## Cryptography notice

Some Easter tools use browser cryptographic APIs, such as hashing, HMAC and AES-GCM-based local encryption. These features are provided for lightweight local use, puzzle creation and educational experimentation.

They should not be treated as a replacement for audited cryptographic products, professional secret-management systems or legal/evidentiary forensic tooling. Password strength remains the responsibility of the user. If a password is lost, encrypted content cannot be recovered by the application.

## Privacy expectations

Easter is designed so that user content is processed locally in the browser whenever possible. The project should not intentionally upload files, save history, require accounts or transmit created secrets to a server.

If you discover behaviour that contradicts this local-first model, please report it as a security or privacy issue.

## Safe testing

Only test with files, messages, pages and content that you own or are authorised to use. Do not test against other people’s private data, accounts, devices or websites. Do not use the project to hide abusive content, exfiltrate information or bypass consent.

Security research is welcome. Being an idiot with better tooling is not.

## Maintainer response

Security reports will be reviewed based on severity, reproducibility and practical impact. Confirmed issues may result in a patch, documentation update, dependency update or design change.

The project does not currently operate a formal bug bounty programme. Reports are appreciated, but no monetary reward is promised.
