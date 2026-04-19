# Sanrio Character Rankings

React 19 + TypeScript + Vite app for visualizing Sanrio character ranking trends, styled with Tailwind CSS + daisyUI.

See @README.md for project overview and @package.json for the full script list.

## Commands

- `npm run dev` — start the dev server
- `npm run build` — type-check (`tsc -b`) then build
- `npm run lint` — ESLint
- `npm run check` — Biome check + autofix (run this, not `prettier`)
- `npm run test` / `npm run test:run` — Vitest (watch / single run)
- `npm run storybook` — Storybook on port 6006

## Code rules

- **No `try`/`catch` at call sites.** Surface failures through return values, hook error state (`{ data, loading, error }`), or Promise `.catch`. When a throwing API is unavoidable (e.g. `JSON.parse`), contain it in a non-throwing shared helper — see `src/shared/utils/safeJsonParse.ts` for the pattern, and prefer reusing/extending these helpers over writing a new `try`/`catch`.
- **Styling is Tailwind + daisyUI.** There are no CSS Modules — do not introduce `*.module.css`.
- **Theme switching** uses a `data-theme` attribute on `<html>` plus CSS custom properties. Read the theme through the existing `ThemeContext` rather than `matchMedia` in components.

## Workflow

- Before declaring a task done: `npm run check` and `npm run build` must pass (the build step is the real type check).
- For UI changes, verify in the browser via `npm run dev` — screenshots/types alone are not sufficient.
- Prefer running a single Vitest file (`npm run test:run -- path/to/file`) over the full suite during iteration.
