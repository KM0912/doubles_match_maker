# AGENTS.md

## Cursor Cloud specific instructions

This repo is a single, front-end-only React 19 + TypeScript + Vite SPA: **ダブルス組み合わせメーカー (Doubles Match Maker)**. There is no backend, database, or auth — all state persists to the browser's `localStorage`. The Vite dev server is the only service needed to run/test the product end to end.

Standard commands live in `package.json` `scripts`; use those rather than duplicating them here. Key notes:

- Dev server: `npm run dev` serves on port `5173` with `--host 0.0.0.0`. A `predev`/`prebuild` hook runs `node scripts/generate-static-assets.mjs` automatically (generates favicon/OG/static assets); don't run Vite directly if you want those assets generated.
- Tests: `npm test` (Vitest, jsdom-based component + unit tests). There is **no lint script** defined; type-checking happens via `tsc -b` as part of `npm run build`.
- `VITE_GOOGLE_ANALYTICS_TRACKING_ID` (see `.env.example`) is the only env var and is **only active in production builds**; no env config is needed for dev or testing.
