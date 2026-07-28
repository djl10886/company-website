# Clankr Intelligence Website

The Clankr Intelligence public website is a Vite, React, and TypeScript single-page application hosted with Cloudflare Workers Static Assets.

Production: [clankrintelligence.com](https://clankrintelligence.com)

## Local development

Install the locked dependencies and start the Vite development server:

```sh
npm ci
npm run dev
```

The remaining repository scripts are:

```sh
npm run build
npm run lint
npm run preview
```

`npm run preview` serves a completed production build, so run `npm run build` first.

All `VITE_*` configuration is compiled into browser-visible code and must be treated as public client configuration.

## Branches and operations

`main` is the production branch and `staging` is the permanent integration branch. Ordinary changes are reviewed on `staging` before a deliberate production promotion to `main`.

Read the [website operations runbook](docs/website-operations.md) for the complete branch, preview, deployment, validation, rollback, domain, and security procedures. AI agents must also follow [AGENTS.md](AGENTS.md).
