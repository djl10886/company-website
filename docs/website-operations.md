# Website Operations Runbook

This document is the durable operating contract for developing, previewing, deploying, validating, and recovering the Clankr Intelligence website.

## Architecture and sources of truth

The website is a Vite and React single-page application deployed as static assets by the Cloudflare Worker `clankr-intelligence-website`.

| Concern | Authoritative location |
| --- | --- |
| Worker name, compatibility date, static asset directory, SPA fallback, preview URLs, and apex custom domain | `wrangler.jsonc` |
| Wrangler version | Exact development dependency in `package.json` and `package-lock.json` |
| Git repository connection, production branch, build command, and deployment commands | Cloudflare Worker build settings |
| Branch protections and required deployment check | GitHub repository settings |
| `www` DNS and redirect behavior, apex HTTP redirect, and zone configuration | Cloudflare DNS and Redirect Rules |
| Public product objects served by the download domain | Cloudflare R2 and the product release pipeline |

The repository configuration currently establishes:

- Worker: `clankr-intelligence-website`.
- Wrangler: `4.114.0`.
- Static assets: `./dist`.
- Missing-asset handling: `single-page-application`, which permits direct refreshes on React routes.
- Production custom domain: `clankrintelligence.com`.
- Public Worker version previews: enabled.

The domain boundaries are:

- `https://clankrintelligence.com` serves the production Worker deployment.
- HTTP requests to the apex redirect to the same HTTPS path and query string.
- `www.clankrintelligence.com` uses a proxied placeholder A record and a Cloudflare Single Redirect to the same HTTPS apex path and query string. The placeholder address is `192.0.2.0`; it exists only to put `www` behind Cloudflare so the redirect rule can run.
- `downloads.clankrintelligence.com` serves public release objects from R2. It is independent of the website Worker and is not a Worker binding.

Repository configuration is authoritative for deployable Worker settings. Cloudflare dashboard configuration is authoritative for the Git connection, build controls, DNS, and redirect rules. A durable dashboard change must update this runbook, and any corresponding repository configuration, in the same operational change.

## Branch and merge workflow

### Branch roles

- `main` is the production branch. A successful Cloudflare deployment from `main` updates the live apex domain.
- `staging` is the permanent integration branch. It is never deleted or recreated after a promotion.
- Short-lived feature, fix, documentation, and infrastructure branches normally start from current `staging`.

Do not push directly to either permanent branch.

### Ordinary change

1. Update local references and branch from current `staging`.
2. Make the focused change and open a pull request into `staging`.
3. Wait for `Workers Builds: clankr-intelligence-website` to succeed and for Cloudflare to publish the public preview link.
4. Validate the preview using the checklist below.
5. Obtain one approval, resolve every conversation, and ensure the branch is current.
6. Squash-merge the pull request into `staging`.
7. Delete the short-lived branch manually.

Merging into `staging` does not replace the active production deployment.

### Production promotion

1. Confirm `staging` contains exactly the changes intended for production.
2. If `main` has commits that are not in `staging`, create a synchronization branch from current `staging`, merge current `main` into it, and open a pull request into `staging`.
3. Validate the synchronization preview, obtain approval, resolve conversations, and merge the synchronization pull request with a merge commit so `main` remains in `staging` history.
4. Open or refresh the `staging` pull request into `main`.
5. Require the Cloudflare check, preview validation, one approval, resolved conversations, and a current branch.
6. Merge `staging` into `main` with a merge commit. Do not squash or rebase a production promotion.
7. Monitor the production build and validate the exact merged deployment on the apex domain.
8. Retain `staging` for subsequent work.

All application fixes, including urgent hotfixes, follow this path through `staging`. If production must be stabilized before a fix can complete the normal workflow, roll back the Worker first; do not bypass `staging` with a direct hotfix into `main`.

### Administrator bypass

Administrator bypass is reserved for an explicitly authorized exceptional operation. The authorizing owner and the reason must be recorded in the pull request before the bypass is used. Availability of the bypass is not permission to skip the normal workflow.

## GitHub controls

Both `main` and `staging` are protected with the following contract:

- Changes require a pull request.
- One approving review is required.
- New commits dismiss stale approvals.
- Every review conversation must be resolved.
- The branch must be current before merge.
- `Workers Builds: clankr-intelligence-website` is required and pinned to the Cloudflare GitHub App with app ID `85455`.
- Force pushes and branch deletion are disabled.

The repository permits multiple GitHub merge mechanisms, but the operating convention is narrower:

- Squash merge ordinary changes into `staging`.
- Use a merge commit for branch synchronization and `staging` to `main` promotion.
- Do not use rebase merge for either permanent branch workflow.
- Delete completed short-lived branches manually; automatic branch deletion is not enabled.

If the required Cloudflare check is missing rather than pending, verify that the Cloudflare Workers and Pages GitHub App still has access to the repository before changing branch protection.

## Cloudflare build and deployment behavior

Cloudflare builds from the repository root using these settings:

| Build type | Branch | Build command | Deployment command |
| --- | --- | --- | --- |
| Production | `main` | `npm run build` | `npx wrangler deploy` |
| Non-production | Any other branch | `npm run build` | `npx wrangler versions upload` |

A non-production build uploads a Worker version and exposes public commit and branch preview URLs. It must not change the active production deployment. A production build deploys the new `main` version to the apex custom domain.

The required GitHub check and Cloudflare pull-request comment are the expected proof that a preview was created. The base production `workers.dev` hostname is not the production health endpoint; production validation uses `https://clankrintelligence.com`.

Normal publication occurs only through the Git-connected `main` workflow. Do not use a local `wrangler deploy` as an alternative publication path.

## Validation

### Pull-request preview

Before merging into `staging`:

- Load `/` and every route declared in `src/App.tsx`.
- Exercise every supported concrete value for parameterized routes, including every current changelog version behind `:version`.
- Refresh nested React routes directly and confirm the SPA fallback renders them.
- Check hashed JavaScript and CSS, images, favicon, fonts if present, and their content types.
- Exercise desktop and mobile navigation at representative small, medium, and desktop widths.
- Check internal links, hash links, browser back/forward navigation, wrapping, and overflow.
- Inspect social metadata when the change could affect it.
- Confirm there are no unexpected console errors or failed network requests.
- Follow relevant `downloads.clankrintelligence.com` links and validate the intended public object independently.
- Confirm the preview did not replace the active production deployment.

Preview URLs are public. Do not place confidential content or private release artifacts in a preview.

Routine smoke testing must not submit the contact form because that action invokes a real external service.

### Production deployment

After promotion to `main`:

- Confirm the Cloudflare production build succeeded for the exact merged commit.
- Load the apex root and every route declared in `src/App.tsx`, including direct nested-route refreshes.
- Verify assets, content types, navigation, responsive behavior, console output, and network requests.
- Confirm apex HTTP redirects once to the identical HTTPS path and query string.
- Confirm both HTTP and HTTPS `www` requests redirect once to the identical apex HTTPS path and query string without loops.
- Validate any referenced R2 download independently.
- Confirm the active Worker deployment corresponds to the successful `main` build.

## Rollback and recovery

If a production deployment is unhealthy:

1. Pause further production promotions.
2. Identify the last known-good Worker version through Cloudflare Worker Deployments or:

   ```sh
   npx wrangler deployments list --name clankr-intelligence-website
   ```

3. With explicit owner authorization, restore that version in the dashboard or run:

   ```sh
   npx wrangler rollback <version-id> --name clankr-intelligence-website
   ```

4. Validate the apex site, redirects, routes, and assets.
5. Revert or correct the source through the normal `staging` to `main` workflow so the repository and deployed state agree.

An operational rollback is immediate containment, not a lasting source-of-truth change. A later production build can reintroduce the problem if `main` is not corrected.

Do not change DNS, redirect rules, R2 objects, mail records, or unrelated zone records for an ordinary application rollback. A bad product object or release reference is handled through the product release process rather than by altering unrelated website infrastructure.

## Security and configuration boundaries

- Worker previews, static assets, client JavaScript, and source maps if ever published are public.
- Every `VITE_*` value is compiled into browser-visible code. Use it only for public client configuration.
- Never commit Cloudflare tokens, personal Wrangler OAuth credentials, R2 credentials, private artifacts, or other secrets to source, logs, pull requests, or build output.
- Personal Wrangler authentication is stored outside the repository and must not be shared. `.wrangler/` remains ignored.
- Cloudflare dashboard access is required for Git build controls, DNS, and Single Redirect rules; it does not justify copying account credentials into the repository.
- Website deployments only reference public R2 URLs. They never upload, replace, delete, or authorize product artifacts.

## Maintenance

- Keep `wrangler.jsonc` byte-equivalent on `main` and `staging` in steady state. A reviewed hosting change may temporarily differ on `staging`; restore equivalence after its production promotion.
- Keep the Cloudflare production branch set to `main` and non-production builds enabled.
- Preserve the exact required GitHub check and its Cloudflare App binding on both permanent branches.
- Update this runbook whenever a durable branch control, build command, domain, redirect, deployment, validation, rollback, or hosting responsibility changes.
- Delete merged short-lived branches manually.
- Retain `staging` permanently.
