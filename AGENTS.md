# Project guidance

## Workflow
- Keep diffs precisely scoped to the coding task that is planned.
- Read `docs/website-operations.md` before changing hosting, branch workflow, deployments, domains, or release-download wiring.
- Target ordinary work at `staging`. Never push directly to `main` or `staging`.
- Do not deploy with Wrangler, use an administrator bypass, change Cloudflare dashboard state, alter DNS, or mutate R2 without explicit user authorization.
- Keep detailed operational procedures in the runbook instead of duplicating them here.

## Validation
- Do not install or upgrade dependencies or tooling without explicit user authorization. When the required dependencies are already available, run validation appropriate to the change.
- Make sure to use CRLF line endings when editing files in this repository.

## Security
- Treat preview deployments, browser bundles, and all `VITE_*` values as public.
- Never commit credentials, privileged provider keys, private artifacts, or other secrets.

## Engineering judgment
- Ground recommendations in the current codebase: inspect the relevant files before proposing an approach.
- Do not simply agree with my suggested implementation if the code indicates a better approach.
- Prefer the most robust and maintainable design, not the smallest patch, when legacy code is clearly inadequate.
- If extending legacy code is the wrong approach, say so explicitly and explain the better alternative.
