# Project VAJRA — Marketing and Go-to-Market Plan

## The positioning

**Category:** evidence-led endpoint risk, detection, and response.
**One-liner:** VAJRA correlates endpoint behaviour, identity, cloud context, software provenance, and vulnerability evidence — then shows the receipts behind every decision.

Do not launch with "world's most powerful antivirus" or "stops every attack". Those claims are unverifiable, invite immediate expert ridicule, and create legal exposure. Launch with a narrower promise you can prove in a pilot: *"We cut investigation time and prioritised-remediation time, and we show you why."*

## Who to sell to first

Pick one wedge and stay there for two quarters:

1. **Mid-market security teams of 1–10 analysts** in India, the Gulf, or Southeast Asia who own Windows fleets, cannot afford a large MDR contract, and are accountable for compliance evidence.
2. **Compliance-driven organisations** (BFSI suppliers, healthcare vendors, IT services) that must demonstrate vulnerability prioritisation and incident evidence.
3. **MSPs** serving 20–200 seat customers, who need a repeatable, explainable console they can resell.

Avoid starting with large enterprises: they already run Defender/CrowdStrike plus an MDR, and your differentiator will be judged against a mature stack.

## The proof engine

Marketing claims must come from measurements, not adjectives. Instrument every pilot with:

- Median time from alert to triage decision.
- Alert volume per analyst per day before and after.
- Percentage of applicable KEV vulnerabilities remediated within 14 days.
- Forensic completeness score for collected cases (fields captured vs required).
- False-positive rate against a benign software corpus.
- Rollback success rate for any containment action.

Publish these as case studies with environment, version, configuration, sample size, and limitations. That is the only credible path to "best" language later.

## Channel plan

**Phase 1 — credibility (months 0–3).** Open-source the collector and detection rules. Publish a technical blog on why CVE counts are not risk, with reproducible methodology. Ship a free "VAJRA Lens" mode that scans a folder and produces an evidence report — this is your lead magnet. Speak at BSides/OWASP chapters, not glossy vendor events.

**Phase 2 — design partners (months 3–6).** Recruit 8–12 design partners from the wedge. Offer a paid pilot at a deliberately low price with a written success metric. Do the work manually where the product is thin; that is how you learn what to automate.

**Phase 3 — repeatable sales (months 6–12).** Package three SKUs: Lens (free/individual), Core (per-endpoint subscription), and Assisted (partner-delivered monitoring with explicit hours and exclusions). Publish a public trust page: architecture, data flows, subprocessors, AI provider handling, and disclosure policy.

## Pricing shape

Anchor on analyst time saved rather than on per-seat antivirus pricing. A defensible early structure is a platform fee plus per-endpoint tiers, with vulnerability-context and AI routing included in the base tier to avoid a confusing feature matrix. Keep MDR as a separate, explicitly scoped service line.

## Content that will actually travel

- "What your antivirus still cannot see" — the five-gap essay, with citations.
- "KEV is not a risk score" — a short, opinionated methodology piece.
- A public benchmark harness others can run, so your numbers are checkable.
- Teardown videos of real (sanitised) incidents showing the evidence trail, not fear-based malware reels.

## What not to do

Do not buy "world's best" awards, do not invent market-size numbers, do not imply 24/7 response before staffing it, and do not ship autonomous destructive remediation to win a demo. In security, one overclaimed incident destroys more pipeline than a year of content builds.
