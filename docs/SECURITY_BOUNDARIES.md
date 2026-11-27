# VAJRA security boundaries

The first milestone intentionally stays in user mode and is read-only. It does not claim to detect all malware, inspect kernel memory, reverse arbitrary binaries, or safely neutralize every attack. Any future containment service must preserve evidence first, require least privilege, support dry-run and rollback where possible, and keep high-impact actions behind explicit policy and human approval.

The production architecture should separate the desktop UI from a signed Windows service, with a narrow IPC contract, append-only audit logging, update verification, and a sandboxed analysis worker. AI providers should receive redacted telemetry and never receive raw secrets, tokens, private documents, or unrestricted terminal access by default.
