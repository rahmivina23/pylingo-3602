# Python Adventure — Design

## Mobile extension
Native Expo / React Native Android and iOS companion, with the existing visual identity: Poppins fonts, forest green, warm off-white, bright lime, original Pip SVG and winding landscape map. Native bottom tabs for Adventure, Courses, Practice, Awards, Profile. Full-screen onboarding and lesson modals with safe areas and keyboard avoidance. Local progress stored in AsyncStorage, independently from the web app; no account or sync implied. Speech uses platform speech recognition (development/published build, not Expo Go); web preview supports browser speech or typed fallback. Add a progress provider, native illustrations and lesson/onboarding components under packages/mobile, and update existing tab/home layouts and app config. No API routes or database changes. Keep template analytics and error-boundary providers intact. Test mobile typecheck, lint, Metro web preview and user flows; APK/IPA publication uses platform UI, not sandbox builds.

Responsive web Python-learning game based on supplied green learning-map references. Warm off-white, forest green, lime and sky-blue water. Poppins typography; rounded tactile controls, restrained borders, generous space. Original SVG snake mascot and illustrated island trail. Desktop left navigation, center adventure map, right progress rail; mobile bottom navigation.

Screens: adventure map, course catalog, practice, achievements, profile; illustrated three-step onboarding and interactive lesson dialogs. Course topics cover foundations through advanced Python. Device-local progress via localStorage; no API or database tables required. Modify web pages/index.tsx, styles.css; create adventure.tsx, course.ts, illustrations.tsx. Speech recognition has an explicit typed fallback. Check answers, award XP, unlock lessons, persist preferences. Colors: canvas #f8f9f3, forest #193b2b, lime #c5ee79, green #58a637, water #83d0e7. Cards 20–26px radii; 232px left rail and 310px right rail. Test desktop/mobile and production build.

## Brand & Colors

One token set, consumed per platform:

- **Web & desktop**: CSS variables in `packages/web/src/web/styles.css` (desktop loads the web UI).
- **Mobile**: `Colors.light` / `Colors.dark` in `packages/mobile/constants/theme.ts`, read via `useColors()`; `userInterfaceStyle: "automatic"` follows the system light/dark setting.

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| primary | #1F1F1F | #E5E5E5 | Buttons, active tab, accents |
| background | #FFFFFF | #0A0A0A | Page/screen background |
| card | #FFFFFF | #1A1A1A | Cards, surfaces |
| foreground | #171717 | #FAFAFA | Primary text |
| mutedForeground | #737373 | #A3A3A3 | Secondary text |
| border | #E5E5E5 | #262626 | Hairlines |
| destructive | #DC2626 | #EF4444 | Delete / errors |

## Typography

Name the display + body pairing here. Web: set font families in `styles.css` (self-hosted files go in `packages/web/public/fonts/`). Mobile: system font by default; load custom fonts with `useFonts` from `expo-font` and reference them via `Fonts` in `constants/theme.ts`.

## Pages & Screens

List each page/screen, its route file, and what it shows. Example:

- **Web — Home** (`packages/web/src/web/pages/index.tsx`) — what the user sees first.
- **Mobile — Home** (`packages/mobile/app/(tabs)/index.tsx`) — main tab.
- Add web pages under `src/web/pages/` (+ route in `app.tsx`); mobile tabs under `app/(tabs)/`, stack/modal screens under `app/`.

## Key User Flows

1. Describe the primary flow end to end (open → action → result).
2. ...

## Architecture

- **API**: typed oRPC client (`lib/api.ts` in each package) → the backend in `@template/web`. Query/mutation hooks live in `queries/` (one file per feature); pages/screens call them with `@tanstack/react-query`.
- **State/sync**: TanStack Query with optimistic updates for instant-feel interactions.
- **Auth / payments / uploads**: see `skills/app/references/` when those features are needed.
