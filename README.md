# ecosystem.vision

This repo contains the frontend application which shows information about various crypto ecosystems across multiple chains, ecosystems and types of networks

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

Run `node --test tools/scripts/api-responses.test.js` with the locked production
dependencies (Next.js 15.1.11, React 19.0.0, and Zod 3). The suite uses synthetic
organization fixtures, UUID and imported job IDs, and real organization/project
metadata and server-page entrypoints. Only leaf UI components are stubbed;
request construction, parsing, schemas, and missing/error propagation are real.
It covers the recurring `/organizations/tags/product-activation` route, backend
failure envelopes, malformed payloads, and HTTP 503 (including label lookup).

For isolated release verification, use a local middleware fixture service and
block external egress, including Sentry. Run `pnpm exec next build` directly:
`pnpm build` also runs the sitemap prebuild, which is a publishing operation
and must not contact production during fixture verification. Keep package and
lockfile upgrades separate from this hotfix.

Exercise `/organizations/tags/product-activation` and
`/projects/tags/product-activation` with these `/search/pillar` responses;
serve `{ "data": [] }` from `/search/pillar/labels` unless testing label failure:

| Fixture response | Expected route behavior |
| --- | --- |
| HTTP 200, `success: true`, `message: "Pillar not found"`, `data: null` | Not-found UI without a server exception |
| HTTP 200, valid pillar data | Correct title, description, canonical URL, and page content |
| HTTP 200, `success: false` | Error boundary, never not-found |
| HTTP 200, invalid successful data or invalid JSON | Schema/JSON error, never not-found |
| HTTP 503, even with a successful-null body | Error boundary with upstream status preserved, never not-found |
| Valid pillar plus HTTP 503 from `/search/pillar/labels` | Error with label endpoint/status retained, never not-found |

Check browser UI and `robots` noindex metadata as well as HTTP status. Streamed
App Router responses can already have sent HTTP 200 before a late not-found or
error boundary renders. Also inspect a blocking-metadata request, for example
`curl -i -A Twitterbot http://127.0.0.1:3000/organizations/tags/product-activation`.

Record the built commit, deployed image/container, and Sentry release together.
The November 6 A9 recurrence was on `758cb403852e22938191722f61f95bfc6a13c7ee`,
container `b50a986c3fbc`, whose deployed pillar adapter lacked the successful-null
`notFound()` branch. The narrow hotfix is based on `origin/main` commit
`d16f7b8ce76304e5d4672ace347b07ad5491a9ea`; its only change since the deployed
commit is a Docker base-image update. Both Dockerfiles use the published
`node:24-alpine3.24` tag, shared by all stages. Confirm the new artifact contains
both the null branch and diagnostic-preserving middleware parser, then repeat
missing and known-valid routes and filter Sentry by the new release for A9/AP
and new schema/HTTP groups. The opaque job-ID regression fixes a known detail
contract mismatch; the latest AP event does not establish that every AP
recurrence has this cause. Local fixture success is not production resolution,
and historical events from the old release are not evidence of a failed hotfix.
