# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Vite dev server (localhost:5173)
npm run build      # Production build → dist/
npm run test       # Run Vitest unit tests (pure functions only)
npm run test:watch # Vitest in watch mode
npm run preview    # Preview production build locally
```

## Environment

Copy `.env.example` to `.env.local` and fill in the Gemini API key:
```
VITE_GEMINI_API_KEY=your_key_here
```

The key is bundled client-side (personal tool — no backend). If `gemini-3.1-flash-lite` returns 404, change `GEMINI_MODEL` in `src/config.js` to `gemini-2.5-flash-lite`.

## Architecture

Single-page React 18 + Vite + Tailwind app. No backend, no router, no state library.

**State lives entirely in `App.jsx`** — msg, intent, persona (localStorage), length, image, replies, refineHistory, status, meta, toast. All child components are controlled via props.

**Data flow:** User input → `generate()` in App.jsx → `buildPrompt()` + `callGemini()` → `parseJSONLoose()` → `setReplies()` → ResultsSection renders cards. Refine adds to `refineHistory` array (chat bubbles) and calls `generate()` again with `refineHint + prior`.

**Key files:**
- `src/config.js` — Gemini model ID (single place to swap models)
- `src/lib/gemini.js` — REST API client; `callGemini(parts, systemInstruction?)`
- `src/lib/prompt.js` — Chinese prompt builder; persona goes to `systemInstruction`, not prompt body
- `src/lib/parse.js` — robust JSON extraction with markdown fence stripping
- `src/lib/image.js` — FileReader wrapper; `MAX_IMAGE_BYTES = 5MB`
- `src/App.jsx` — all state + generate/refine/copy orchestration
- `src/components/Composer.jsx` — input form (textarea + upload + intent + settings + button)
- `src/components/ResultsSection.jsx` — output area (cards + refine history + refine bar)

**Styling:** Hybrid Tailwind. Design tokens (colors, shadows, radii, font families, keyframes) are in `tailwind.config.js`. Gradients, responsive grid rules, and complex multi-value properties that don't map to Tailwind utilities live in `src/index.css` `@layer components`. Use the CSS classes `.bg-grad-primary`, `.bg-grad-primary-soft`, `.shadow-generate`, `.ring-focus`, `.shell`, `.composer-row1`, `.settings-body-grid`, `.cards-grid` — they're all defined there.

## Unit Tests

Tests cover only pure lib functions (no React components, no browser APIs):
- `src/lib/parse.test.js` — 8 tests for `parseJSONLoose`
- `src/lib/prompt.test.js` — 14 tests for `buildPrompt` and `lengthBrief`
- `src/lib/image.test.js` — 3 tests for `MAX_IMAGE_BYTES`

Vitest runs with `environment: 'node'` — correct for pure function tests. Do not add React component tests without switching to `environment: 'jsdom'` in `vite.config.js`.

## Gemini API

Request body shape:
```json
{
  "contents": [{ "role": "user", "parts": [{"text": "..."}, {"inline_data": {"mime_type": "image/png", "data": "<base64>"}}] }],
  "systemInstruction": { "parts": [{ "text": "<persona>" }] },
  "generationConfig": { "responseMimeType": "application/json" }
}
```
`systemInstruction` is omitted when persona is empty. Image `inline_data` is omitted when no image uploaded. Response is at `candidates[0].content.parts[0].text`.

## Deploy

Deploy to Vercel: connect repo, set `VITE_GEMINI_API_KEY` in Vercel environment variables. No build configuration needed (Vercel detects Vite automatically).
