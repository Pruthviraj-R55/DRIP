# WildTrack

WildTrack is a frontend-first donor relationship intelligence prototype for a conservation nonprofit. The repository started without an application or README; this implementation uses browser-native JavaScript and CSS with a small Node.js static server so it can run without downloading dependencies.

## Run locally

Requires Node.js 20 or newer.

```sh
npm start
```

Open <http://localhost:5173>. To choose another port, set `PORT` before running the command. The app stores edits in this browser's `localStorage`; use Settings or clear browser site data to reset it to the reproducible fictional seed.

## Build and verify

```sh
npm test
npm run build
```

The build copies the static frontend to `dist/` and checks JavaScript syntax. It does not bundle or minify source files.

## Architecture

- `src/domain.js`: reproducible, fictional domain records and shared metric/matching helpers.
- `src/main.js`: route rendering, shared local repository, forms, CSV workflows, and assistant retrieval.
- `src/style.css`: responsive Arctic Intelligence design tokens and components.
- `scripts/server.mjs`: dependency-free static server with route fallback.
- `scripts/build.mjs`: dependency-free static build.
- `test/domain.test.js`: domain invariants, contribution totals, follow-up changes, and duplicate matching.

Individuals and organisations have separate records. Contributions require one and only one of `donorId` or `organisationId`; campaign and source attribution remain on the contribution. CSV imports preserve the source filename, validate required donor columns and skip potential exact email/phone matches for human review. Browser storage is a demo repository, not a backend or secure system of record.

## Prototype boundaries

All seeded records are fictional. Flodesk, Razorpay and event sources are not connected. The assistant uses deterministic local retrieval and does not send data to an external model. Relationship visualisation is a list-based, filterable fallback; Three.js/WebGL, production charts, backend permissions, audit persistence, external integrations, and Spring Boot/PostgreSQL APIs are not implemented. Frontend data is stored only in the current browser profile.
