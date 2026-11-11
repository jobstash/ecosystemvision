# ecosystem.vision

This repo contains the frontend application which shows information about various crypto ecosystems across multiple chains, ecosystems and types of networks

## Security maintenance

The GitHub finding-by-finding review is based on default branch
`ad9e0438f19842ff70b4f2853e16cab0178d6c8f`, not on an assumed deployment of this
upgrade branch. Dependabot initially returned 185 open findings; only #238 was
manually dismissed as inaccurate because its canonical braces advisory
[GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) was
withdrawn on October 23, 2026. The remaining findings require the reviewed
dependency changes to land on the default branch and GitHub to rescan.
Code scanning and separate GitHub Code Quality are not configured, and secret
scanning is disabled; these are coverage gaps, not clean scan results.

The source review also fixes organization JSON-LD HTML injection: imported
names/descriptions containing `</script>` are serialized with `<` escaped as
`\u003c`, preserving the JSON values without creating another HTML element.
The real layout has an SSR regression and a fixture-only Chromium regression.
`node tools/scripts/security-smoke.js` runs against a build configured with
middleware port 4321 and frontend port 4331; it checks this boundary, unknown
job dates, genuine 404s, and upstream/schema failures. It blocks nonlocal server
sockets and browser requests, including the Sentry tunnel. Its verification-only
network preload permits Google Fonts only when `FIXTURE_ALLOW_FONTS=1` during
the build; production application code and telemetry configuration are unchanged.
Feature-branch CI uses those local fixtures, type/lint/test gates, `pnpm audit`,
and the SSR/browser regression, never the production-targeted legacy E2E suite.
The existing pre-push hook invokes that legacy suite and must not run for isolated
verification pushes; use `git -c core.hooksPath=/dev/null push` after these gates.

The integrated review passed 40 Node regressions, TypeScript, lint, Storybook,
and a fresh fixture-configured Next build. A real isolated Chrome run passed
seven SSR status checks plus JSON-LD injection prevention, both unknown-date
job cards, and missing-pillar `noindex`. The unsafe original JSON serializer
executed the injection sentinel in a separate positive-control browser page.
Navigation readiness uses the document event and visible job assertions, not
`networkidle` (which is unsuitable for pages with background client requests).
Next 16's required `react-jsx` compiler mode and development route types are
recorded in `tsconfig.json`, rather than leaving every build to rewrite it.

Use Node.js 24.22.3 or a newer 24.x release and pnpm 12.18.0 (`corepack enable`). Install with
`pnpm install --frozen-lockfile`; `pnpm-lock.yaml` is the authoritative lockfile.
Both Dockerfiles use `node:24.22.3-alpine3.24` for dependency, builder, and runtime
stages. Node type declarations intentionally follow the latest 24.x release
rather than advertising APIs from a newer runtime.

The November 2026 latest-stable migration selects Next.js 16.4.5, React 19.3.1,
Sentry 11.11.0, HeroUI 3.2.7, Tailwind CSS 4.3.4, and Storybook 10.6.6 with
Vite 8.3.6. HeroUI uses its v3 compound components and styles package, rather
than hoisted v2 component packages. Tailwind uses its v4 PostCSS plugin.
Next's request interception entry is `src/proxy.ts`; cache invalidation retains
immediate expiration with the explicit `revalidateTag` options argument.
Build/dev scripts explicitly select webpack to retain the existing Sentry and
bundle-analyzer integration. MSW's public worker is regenerated for version 3.
Next's ESM configuration imports `withSentryConfig` from the SDK's supported
`@sentry/nextjs/config` entry. This avoids relying on named-export detection
from the CommonJS root when Storybook loads the same Next configuration.
Both Sentry initializers explicitly disable the new `dataCollection` defaults
for user information, cookies, headers, HTTP bodies, query parameters,
GraphQL/AI/MCP content, database query data, queue arguments, and stack-frame
variables. Upgrading the SDK must not silently opt into those categories.

The approved latest-supported toolchain exception is TypeScript 6.0.3 and
ESLint / `@eslint/js` 9.39.5. The latest Next ESLint preset still depends on
plugins whose supported peer ranges exclude ESLint 10, and typescript-eslint
8.72.1 requires TypeScript below 6.1. The flat ESLint configuration retains
the existing checks; there are no peer-range bypasses or legacy compiler aliases.
One transitive optional peer warning remains: `tsconfck@3.1.6` declares
TypeScript 5 support. Storybook's Vite 8 integration bypasses its
`vite-tsconfig-paths` fallback and uses Vite's native tsconfig resolution;
the legacy parser/compiler path is not selected. That metadata warning is
not suppressed and is not a claim that tsconfck publishes TypeScript 6 support.

The workspace retains an explicit dependency build-script allowlist. Its
release-age exceptions name exact package versions required by this requested
latest-stable migration (Sentry, Storybook and its docgen plugin, Playwright,
Spline, Motion, Lucide, and MSW); strict release-age handling prevents future
automatic additions.

Two parent-scoped security upgrades replace broad forced-major overrides.
Storybook React/Vite 10.6.6 uses the maintained docgen plugin 0.9.1, whose
TypeScript 6/Vite 8-compatible factory removes the vulnerable glob 13 runtime
in favor of tinyglobby. typescript-estree 8.72.1 uses minimatch 11.0.4 through
its unchanged `minimatch(path, pattern, { dot: true })` API. These address
[GHSA-3g3m-2fjr-6pw4](https://github.com/advisories/GHSA-3g3m-2fjr-6pw4)
and [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249).
`tools/scripts/tooling-security.test.js` exercises the consumed matcher,
amplification bound, and an actual React/TypeScript docgen transform through Vite.
Run it together with the full Storybook build before merging.

HeroUI 3 removes the old `@heroui/theme` dependency and therefore removes
deepmerge from the refreshed dependency graph. The obsolete deepmerge patch
and its vendor regression were removed with that runtime, rather than keeping
an unused vulnerable package. The Zod compatibility-runtime backport remains.
The open braces advisory
[GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) was
withdrawn upstream and has no applicable version upgrade.

`patches/zod@4.6.7.patch` preserves the selected Zod version and adds the
bounded-collection early abort to its bundled `zod/v3` compatibility runtime
(source, CommonJS, and ESM). Oversized arrays/sets stop before element parsing
or collection refinements; valid, minimum-only, and unbounded schemas retain
their behavior. The v4 runtime already contains the upstream fix. pnpm applies
this patch, and both Dockerfiles copy it into the dependency stage. `pnpm test`
includes real v3 runtime regressions; version-only scanners may still report
the unchanged package version.

Before merging, run `pnpm test`, `pnpm exec tsc --noEmit`, `pnpm lint`,
`pnpm build-storybook`, and `pnpm audit`. Build the application with
`pnpm build:app` using local fixture services and non-production environment
values. Unlike `pnpm build`, this command does not invoke the sitemap prebuild;
CI and Docker also use it. Sitemap generation remains an explicit publishing
operation and must not contact production during verification.
Smoke-test the Storybook button and home-page stories and the application
carousel, search, organization detail, and funding views against fixtures.
The hardcoded Sentry DSNs require an external-egress block during production-mode
fixture runs. No security alerts are automatically dismissed by this repository.

The November 6 final non-build verification, after updating Spline runtime to
2.0.146 and correcting HeroUI client boundaries, passed
`pnpm exec tsc --noEmit --incremental false` and all 35 Node tests,
including the real Vite docgen transform, minimatch amplification bound, and
local browser-fixture contracts. `pnpm audit --json` reported zero advisories;
`pnpm lint` exited successfully with zero errors and 71 warnings. Lint fixes
retain filter initialization and pagination resets without effect-driven local
state copies, and include excluded search terms in the query cache key. These
results do not replace the separate application, Storybook, or container gates.

A subsequent comparison with focused hotfix `38f6b35` restored its
non-enumerable `ResponseError.res` protection and inspection-privacy regression:
callers retain access to the response, but ordinary error inspection cannot
expose its URL, headers, or body. The targeted API suite passed all 16 tests;
the subsequent full 35-test run includes that regression.

The isolated browser dataset is served with
`node tools/scripts/fixtures/browser-api.js` (port 4321; override with
`FIXTURE_PORT`). It supplies synthetic organization, project, fund, search,
filter, and health responses; unknown routes return 404 and are never proxied.
Point `NEXT_PUBLIC_MW_URL` at this local service before building. For isolated
Docker verification, mount the entire fixtures directory read-only and use an
internal-only network; the fixture script requires its sibling
`sentry-responses.js`. Browser verification must block all nonlocal requests and
`/sentry-tunnel`, not merely replace the middleware origin. The maintained
`Home/Carousel` Storybook story exercises the reusable carousel independently
of the current homepage, which no longer mounts the legacy feature carousel.

Final fixture-only release checks also passed the Storybook production build
and separate production/development Docker verification builds on arm64,
Node 24.22.2 / Alpine 3.24.4, running as UID 1001. These are **not deployable
images**: external verification overlays supplied previously cached real font
files, prefetched pnpm before an offline `build:app`, disabled telemetry, and
removed only the generated build cache. Deployment Dockerfiles were unchanged.
An internal-only Docker network blocked external egress; a local HTTP bridge
through `docker exec` exposed the app for browser checks without adding an
outbound network. Both images returned 200 for live/ready health, funds APIs,
and synthetic list/detail pages. On the preceding image pair with identical
health/API code, stopping the fixture kept liveness at 200, changed readiness
to 503 and the funds proxy to 502; restarting restored readiness and funds data.

A subsequent literal Docker contract check passed both **unmodified**
`Dockerfile` and `Dockerfile.dev`, using `docker buildx build --load --file`
with all six public build arguments overridden to synthetic local values.
Unlike the earlier overlays, these builds fetched real Google Fonts and used
no font mock, source rewrite, or replacement Dockerfile. The cached-font
overlays were a proactive offline precaution, not evidence of a Google Fonts
outage. A dedicated BuildKit container on an internal-only network used a
public-host allowlist proxy for npm, Alpine, Docker registries, and Google Fonts;
Corepack used certificate-preserving TLS passthrough for its allowlisted host.
Direct public TCP was unreachable, and Sentry/Next telemetry CONNECT requests
were rejected. The development invocation reused matching production layers
because every deployment default was explicitly overridden to the same fixture.
Both `ecosystem-literal-production:20261106` and
`ecosystem-literal-development:20261106` resolved to image digest
`sha256:fe7623cd4de395774e7f6bfc4befe0815c373c30e48216573ab79598f4c0877f`.
Both booted on Node 24.22.2 / Alpine 3.24.4 as UID 1001 and passed all health,
fund API, and synthetic page probes. Each literal image also passed the
dependency-stop/recovery checks (live 200, ready 503, funds 502, then recovery
to 200). These locally configured images prove the Dockerfile contracts but
are not production-configured release artifacts.

After the shared job timestamp contract changed to `finite().nullable()`, a
new literal production build, `ecosystem-literal-nullable-production:20261106`,
passed with digest
`sha256:67b08adfe51f08028a38b22e8dd79544c9ab37e89d5cb1fc0a6daf0abb493502`.
This follow-up used the unchanged production Dockerfile and real Google Fonts
through the same restricted public-host build network; it did not rebuild the
development image. Node 24.22.2 / Alpine 3.24.4 health checks passed. A retained
public Loopscale response containing three `timestamp: null` jobs was served
locally without changing its values. Blocking-metadata requests and actual
browser navigation returned 200 for its overview and jobs pages; the real
Jobs tab also reached the canonical organization-ID route. All three job cards
remained visible, and unknown date metadata was omitted rather than fabricated.
This is isolated local verification, not a production deployment claim.

Managed Chromium, with only local hosts allowed and the Sentry tunnel blocked,
exercised search, ComboBox keyboard selection, removable chips, checkbox and
range filters, apply/cancel state, sort selection, organization overview/project/
job tabs, fund filters/detail, and carousel keyboard/pagination controls.
Screenshots were reviewed at desktop and 390px; the corrected fund-round
dropdown also reflowed at 320px. Its real mobile checkbox updated `rounds=seed`
and remained checked after navigation. The responsive fix uses this repository's
`md` breakpoint (640px), not its custom `sm` breakpoint (360px). Browser checks
also corrected missing carousel accessibility modules and the Storybook route
provider. HeroUI consumers have explicit client boundaries; data-loading pages
remain server components. Storybook still reports bundler directive/chunk-size
warnings and an unused MDX glob, not build failures.

The fixture items `fixture-missing`, `fixture-error`, `fixture-malformed`, and
`fixture-unavailable` exercise A9 through `/organizations/tags/<item>` and
`/projects/tags/<item>`. Actual browsers showed not-found content and `noindex`
for successful-null responses, and the error boundary for backend/malformed/
HTTP-503 responses. Blocking-metadata requests returned 404 for missing content
and 500 for each failure variant. These local results do not establish
production resolution or replace post-deployment release monitoring.

## API response contracts

Pillar lookup responses distinguish missing content from backend failures:
`success: true` with `data: null` renders a 404, while `success: false`,
malformed successful payloads, and upstream service failures remain errors.
Job identifiers are nonempty opaque strings, not necessarily UUIDs; imported
source identifiers must survive organization detail and job rendering unchanged.
Job publication timestamps follow middleware's `number | null` contract:
finite timestamps are preserved and `null` means the publication date is unknown.
Organization job cards omit unknown dates without inventing a date or hiding the
job. Missing fields, strings, and non-finite numbers remain contract errors.
The AQ/AR regression covers three unknown-date jobs, mixed known/unknown dates,
the organization route entrypoints, and the real compact job card rendering.

Middleware GET failures retain their HTTP status, endpoint path, and schema
issue codes/paths; network failures retain their original error and cause.
Diagnostics exclude URL credentials, query strings, and response bodies.
The original response remains available to callers as a non-enumerable error
property, preventing console/error-property inspection from exposing its URL,
headers, or body. `toJSON()` retains only the safe diagnostic fields.
There are no retries or successful fallbacks for failed backend requests.
Relative same-origin funds URLs remain unchanged for fetch. Diagnostic pathname
extraction uses a fixed parsing base only, never a claimed upstream endpoint.
The response suite covers real funds list/sector/round adapters on success and
HTTP 503, including query preservation for fetch and exclusion from errors.

`tools/scripts/api-responses.test.js` covers these contracts using synthetic
responses, including UUID and imported job IDs. Synthetic organization data is
in `tools/scripts/fixtures/sentry-responses.js`; regression tests require no
production API access.

The pillar regressions also execute both organization/project
`generateMetadata` exports and the shared server page with promise-valued route
parameters. Only leaf UI components are stubbed; URL construction, middleware
fetch/parsing, schemas, and missing/error propagation use the real modules.
They include the recurring `/organizations/tags/product-activation` route,
successful-null and malformed responses, backend failure envelopes, HTTP 503,
and a separate label-endpoint failure. Run the targeted suite locally with
`node --test tools/scripts/api-responses.test.js`, or in the pinned Linux runtime:

```sh
docker build --target deps -t ecosystem-a9-contract-deps .
docker run --rm --network none \
  -v "$PWD/src:/app/src:ro" -v "$PWD/tools:/app/tools:ro" \
  -w /app ecosystem-a9-contract-deps \
  node --test tools/scripts/api-responses.test.js
```

For browser/container release verification, build against a local middleware
fixture service with external egress blocked (including Sentry). Exercise
`/organizations/tags/product-activation` and
`/projects/tags/product-activation` with these `/search/pillar` responses;
serve a valid `{ "data": [] }` label response except in the label-failure case:

| Fixture response | Expected route behavior |
| --- | --- |
| HTTP 200, `success: true`, `message: "Pillar not found"`, `data: null` | Not-found UI and no server exception; blocking-metadata bot request returns HTTP 404 |
| HTTP 200, valid pillar data | Correct title, description, canonical URL, and page content |
| HTTP 200, `success: false` | Error boundary, never not-found |
| HTTP 200, missing/invalid successful data or invalid JSON | Error boundary with schema/JSON diagnostic, never not-found |
| HTTP 503, even with a successful-null body | Error boundary with HTTP 503 preserved in the server error, never not-found |
| Valid pillar plus HTTP 503 from `/search/pillar/labels` | Page error with label endpoint/status retained, never not-found |

Against the fixture-backed container published on port 3000, inspect the
blocking-metadata response with
`curl -i -A Twitterbot http://127.0.0.1:3000/organizations/tags/product-activation`
and the equivalent project URL. Also navigate both URLs in a browser and check
the actual not-found/error UI and `robots` noindex metadata, not just the HTTP
status: streamed App Router responses can already have sent HTTP 200 before a
late not-found/error boundary is rendered.

Release verification must record the built commit, deployed image/container,
and Sentry release together. The November 6 recurrence was still on
`758cb403852e22938191722f61f95bfc6a13c7ee`, container `b50a986c3fbc`;
its deployed pillar adapter lacked the successful-null `notFound()` branch.
Check that the new artifact includes that branch and the diagnostic-preserving
middleware parser before interpreting issue counts. Then repeat the missing
and known-valid routes and filter Sentry by the new release for A9/AP and new
schema/HTTP error groups. Historical issue totals and events from the previous
release are not evidence that the new artifact failed, nor does a local passing
fixture suite establish production resolution. Do not dismiss issues until
the deployed release and post-deployment behavior have been verified.
