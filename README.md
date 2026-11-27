# Project VAJRA

VAJRA is a defensive Windows endpoint-security prototype focused on evidence-first detection, vulnerability context, and provider-agnostic AI analysis.

It is deliberately not marketed as "the world's most powerful antivirus". A first build cannot honestly promise to neutralize every attack. This repository is a credible foundation: transparent signals, auditable decisions, and response that stays under human control.

## What is implemented

- Electron desktop shell for Windows x64 (packaged with `electron-builder`).
- Dark "defensive intelligence" command center with overview, deep scan, threat stream, vulnerability intelligence, and AI routing views.
- Bounded, read-only local folder scan with SHA-256 evidence and transparent filename/file-type heuristics.
- Provider routing screen for OpenRouter, Anthropic Claude, Google Gemini, and OpenAI-compatible endpoints. Keys are stored in the OS user-data directory; Electron `safeStorage` encrypts them when the OS supports it.
- Explicit containment boundary: the prototype never executes, deletes, kills, isolates, or reverses anything.

## Run locally

```bash
npm install
npm start
```

## Build a Windows installer

Windows `.exe` artifacts must be produced on Windows (or a Windows runner). From a Windows machine:

```bash
npm ci
npm run dist:win
```

The NSIS installer is written to `release/`. Alternatively, run the included GitHub Actions workflow **Build Windows installer**, which uploads `vajra-windows-installer` as a build artifact.

The sandbox build (`npm run dist:dir`) produces a Linux unpacked Electron app only. It is not a Windows executable.

## Before distributing

This is not a certified antivirus or EDR. Do not deploy it as a security control without:

1. An Authenticode code-signing certificate and signed releases.
2. Independent threat-model, privacy, and driver/service review.
3. Testing against benign and malicious validation corpora, including false-positive measurement.
4. A documented update channel with signed, verifiable updates.
5. Clear data-handling terms for any AI provider integration.

## Architecture direction

Phase 1 stays in standard-user mode: AMSI for supported content scanning, permitted Windows Event Log subscriptions, application-defined ETW with bounded queues and loss metrics, and optional centrally managed Sysmon ingestion. Phase 2 adds enterprise configuration and cloud/identity context. Privileged telemetry and any kernel component come only after a documented coverage requirement, with separate review and Microsoft-compliant signing.

Read [the research and product brief](docs/VAJRA_RESEARCH_BRIEF.md) for the evidence behind these choices and [the security boundaries](docs/SECURITY_BOUNDARIES.md) for the current limits.

## Responsible use

VAJRA is defensive software. Contributions must not add offensive capability, credential theft, evasion tooling, or destructive autonomous response. High-impact actions require policy, evidence preservation, rollback where possible, and human approval.
