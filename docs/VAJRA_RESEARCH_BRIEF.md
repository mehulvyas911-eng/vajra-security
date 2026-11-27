# Project VAJRA — Research and Product Brief

## Product thesis

VAJRA should be an evidence-led Windows endpoint risk, detection, and response product—not a universal antivirus replacement. Its defensible wedge is traceable correlation across endpoint behavior, identity, cloud, software provenance, and vulnerability context, paired with reversible, auditable response. The first release should prioritize documented user-mode interfaces and safe workflows; privileged telemetry, kernel components, broad enterprise integrations, and managed services should follow only after platform, permission, and independent-validation work.

## What existing endpoint protection still leaves open

Modern endpoint products are strong at commodity malware, but endpoint security is not one problem. The main gaps are coverage and context gaps rather than a simple absence of signatures.

1. Fileless and living-off-the-land activity can use PowerShell, WMI, built-in commands, and in-memory execution. CISA has documented this pattern alongside attempts to disable or tamper with EDR/AV. VAJRA needs script, process, memory, and parent-child correlation plus tamper-evident collection. [1]
2. Process injection can execute malicious code inside a legitimate process and mask execution from process-based defenses. Useful coverage requires cross-process memory, thread, module, and behavior telemetry. [2]
3. Valid identities, tokens, and sessions can be abused after endpoint malware prevention is bypassed. Endpoint verdicts alone cannot reliably tell legitimate use from attacker use, so endpoint, identity, device, token, application, network, and geography need correlation. [3]
4. Supply-chain and third-party exposure can bypass endpoint controls before code reaches a protected host. Verizon’s 2025 DBIR reports third-party involvement in breaches doubled to 30%, while credential abuse and vulnerability exploitation remained leading initial vectors. [4]
5. Trusted cloud services and encrypted or obfuscated channels can reduce endpoint and network context. VAJRA needs cloud audit/API, DNS, proxy, identity, and process correlation rather than claiming to inspect all content. [1]
6. Insider misuse and provider-admin activity often use legitimate accounts and tools rather than malware signatures. NIST calls for monitoring anomalous personnel, authentication, logical-access, and external-service-provider activity. [5]
7. Novel malware, repackaged software, DLL hijacking, and trusted-binary abuse can defeat static hashes and signatures. Provenance, integrity, behavior, and memory analysis are complementary requirements. [1] [2]
8. Detection and response effectiveness are different. A product can alert without stopping an attack, over-block benign work, lose telemetry under pressure, or create workflow delay. Measure prevention, detection, investigation, and response separately. [5] [6]

## CVE intelligence: what VAJRA should and should not claim

CVE is a coordinated identifier and record program for publicly disclosed vulnerabilities. A CVE record is not proof that a local asset is vulnerable, exploitable, compromised, or safe. [7]

NVD enriches and distributes vulnerability data, including descriptions, references, weaknesses, CVSS metrics when present, and applicability/configuration data. NVD’s API is paginated and supports incremental modified-date retrieval; optional analysis fields may be absent or delayed. [8]

CISA’s KEV catalog identifies vulnerabilities known to have been exploited in the wild and is intended as an input to vulnerability-management prioritization. KEV membership is exploitation evidence and urgency context, not proof that a customer asset is affected or compromised. [9]

CVSS communicates vulnerability characteristics and severity. FIRST EPSS forecasts the probability that a published CVE will be exploited in the wild during the next 30 days; it is not local exploit telemetry and does not account for organization-specific controls. [10] [11]

VAJRA must present these as separate fields: CVE identity, NVD enrichment, CVSS vector/version/source, KEV status and dates, EPSS score/date/percentile, and local asset/SBOM/package evidence. A local conclusion requires inventory, version ranges, backports, configuration, reachability, patch state, compensating controls, and incident telemetry. Missing source data must be represented as unknown—not as evidence of safety.

## Windows architecture for the MVP

A safe first release can stay in standard-user mode and use documented interfaces:

- AMSI for supported script, memory, stream, and application-content scanning. AMSI is not a universal process monitor or guaranteed prevention layer. [12]
- Windows Event Log subscriptions for Defender operational events and other permitted logs. [13]
- ETW providers and consumers with bounded queues, filtering, backpressure, and explicit event-loss metrics. Kernel logger sessions and some controls require administrative rights. [14]
- Optional ingestion of Sysmon when customers already operate it centrally. Sysmon is telemetry-only; it does not itself analyze, alert, block, or prevent. [15]
- Windows Sandbox with networking disabled when unnecessary and read-only host-folder mapping, or AppContainer where the application model permits it. Isolation reduces impact; it does not prove safety or forensic completeness. [16] [17]

A later administrator-managed service may add controlled configuration and enterprise enrollment. Kernel or driver functionality should not be a premise of the MVP. If a driver is ever required, it needs separate threat modeling, minimal attack surface, Microsoft-compliant signing, compatibility testing, update/rollback safety, and independent security review. [18]

## Neutralization must be evidence-first

The response layer should preserve volatile evidence and chain-of-custody metadata before destructive action when operationally safe. CISA recommends isolating impacted systems, capturing representative images and memory, collecting logs and observables, and treating power-off as a fallback because shutdown can destroy volatile evidence. [19]

Containment should be tiered: evidence package, quarantine, narrowly scoped process restriction, host isolation, and only then wider isolation when defined thresholds are met. Human approval should be required for high-impact actions. Use asset criticality, confidence thresholds, canaries, rate limits, staged rollout, rollback where possible, expiry times, and automatic halt on anomalous impact. Microsoft documents auditable Defender actions such as isolation, investigation-package collection, scanning, and application-execution restriction, but support and operational effects vary by platform and tenant. [20] [21]

The prototype therefore does not execute, delete, kill, isolate, or reverse arbitrary samples. It exposes evidence and approval boundaries instead.

## MVP and roadmap

### Phase 1 — user-mode Windows MVP

Ship a standard-user collector; AMSI/Event Log/ETW integrations; normalized events for process, interpreter, WMI, security-control changes, Defender events, signer/provenance, and parent-child relationships; explainable detections; separate CVE/KEV/CVSS/EPSS evidence panels; safe Sandbox/AppContainer workflows; scoped Defender actions; audit logging; and pilot metrics.

### Phase 2 — enterprise enrollment

Add centrally managed configuration, optional Sysmon ingestion, Windows fleet policy, controlled service deployment under least-privileged accounts, cloud identity/SaaS/DNS/proxy integrations, SBOM and supplier lineage, and staged response controls.

### Phase 3 — privileged telemetry and advanced response

Only where a documented coverage requirement cannot be met in user mode, add additional memory/process/file/network sensors, protected service or filtering components, and deeper Defender/enterprise integrations.

### Phase 4 — kernel capabilities, if necessary

Build only for a demonstrated requirement, with production signing, administrator-controlled installation, strict attack-surface review, compatibility testing, and independent assessment.

### Phase 5 — scale and operating model

Add optional partner-enabled MDR with explicit monitoring hours, telemetry scope, response authority, SLAs, escalation boundaries, and exclusions. Add grounded AI assistance with citations, tenant isolation, approval gates, and human review.

## Marketing guidance

Position VAJRA as **“evidence-led endpoint risk and response for teams that need explainable decisions”** or **“a defensive intelligence layer that connects endpoint behavior, vulnerability context, and reversible response.”** Do not position it as a guaranteed replacement for Microsoft Defender, CrowdStrike, or every antivirus.

Start with a defined wedge: resource-constrained security teams, compliance-sensitive regional organizations, or mixed estates that need transparent case evidence. The proof should be measurable: reduced triage time, reduced alert noise, faster remediation of applicable KEV vulnerabilities, improved forensic completeness, and successful rollback/containment rates. Publish environment, version, configuration, denominators, and limitations with every result.

The AI copilot should be marketed as a grounded analyst assistant that cites evidence and accelerates triage, query construction, and documentation. It should not be marketed as autonomous truth or autonomous destructive remediation. A partner-enabled MDR offering can come later, with explicit staffing, hours, response authority, and exclusions.

## Claims VAJRA must avoid

- “Protects against every attack,” “zero false positives,” “zero false negatives,” or guaranteed autonomous correctness.
- “Complete real-time visibility” across kernel, memory, encrypted traffic, cloud, identity, and every process.
- “Every CVE is detected locally” or “CVE/KEV/EPSS proves compromise.”
- “Sandbox makes every sample safe” or “AI can reverse any attack.”
- “World’s most powerful,” “best,” or superiority over broad platforms without reproducible, independent, version-specific testing.
- 24/7 MDR, compliance, data-residency, platform-coverage, or SLA claims without validated staffing, contracts, and exclusions.

## Current prototype implementation

The repository includes an Electron desktop shell targeting Windows x64 through `electron-builder`, a dark security command center, a bounded read-only local folder scanner, SHA-256 evidence, a threat stream, CVE/KEV/EPSS context panels, AI provider routing for OpenRouter/Claude/Gemini/OpenAI-compatible endpoints, and explicit human-approval boundaries. It is not a certified antivirus or EDR.

The prototype can be run with `npm install && npm start`. A Windows installer should be built on Windows or a Windows CI runner with `npm run dist:win`; the sandbox build produces a Linux unpacked artifact and does not constitute a Windows `.exe`.

## References

[1]: https://www.cisa.gov/news-events/cybersecurity-advisories/aa23-347a "CISA advisory on SVR cloud and endpoint tradecraft"
[2]: https://attack.mitre.org/techniques/T1055/ "MITRE ATT&CK Process Injection"
[3]: https://www.microsoft.com/en-us/security/security-insider/threat-landscape/microsoft-digital-defense-report-2025 "Microsoft Digital Defense Report 2025"
[4]: https://www.verizon.com/about/news/2025-data-breach-investigations-report "Verizon 2025 Data Breach Investigations Report"
[5]: https://nvlpubs.nist.gov/nistpubs/specialpublications/nist.sp.800-61r3.pdf "NIST SP 800-61 Rev. 3"
[6]: https://av-comparatives.org/tests/endpoint-prevention-response-epr-test-2025/ "AV-Comparatives Endpoint Prevention and Response Test 2025"
[7]: https://www.cve.org/about/overview "CVE Program Overview"
[8]: https://nvd.nist.gov/developers/vulnerabilities "NVD Vulnerability API"
[9]: https://www.cisa.gov/known-exploited-vulnerabilities-catalog "CISA Known Exploited Vulnerabilities Catalog"
[10]: https://www.first.org/cvss/specification-document "FIRST CVSS Specification"
[11]: https://www.first.org/epss/ "FIRST EPSS"
[12]: https://learn.microsoft.com/en-us/windows/win32/amsi/antimalware-scan-interface-portal "Microsoft Antimalware Scan Interface"
[13]: https://learn.microsoft.com/en-us/defender-endpoint/troubleshoot-microsoft-defender-antivirus "Microsoft Defender Antivirus troubleshooting and operational events"
[14]: https://learn.microsoft.com/en-us/windows/win32/etw/about-event-tracing "Microsoft Event Tracing for Windows"
[15]: https://learn.microsoft.com/en-us/windows/security/operating-system-security/sysmon/how-to-enable-sysmon "Microsoft Sysmon documentation"
[16]: https://learn.microsoft.com/en-us/windows/security/application-security/application-isolation/windows-sandbox/ "Microsoft Windows Sandbox"
[17]: https://learn.microsoft.com/en-us/windows/win32/secauthz/appcontainer-for-legacy-applications- "Microsoft AppContainer"
[18]: https://learn.microsoft.com/en-us/windows-hardware/drivers/install/driver-signing "Microsoft driver signing"
[19]: https://www.cisa.gov/stopransomware/ive-been-hit-ransomware "CISA ransomware response guidance"
[20]: https://learn.microsoft.com/en-us/defender-endpoint/respond-machine-alerts "Microsoft Defender machine response actions"
[21]: https://learn.microsoft.com/en-us/defender-endpoint/configure-remediation-microsoft-defender-antivirus "Microsoft Defender remediation"
