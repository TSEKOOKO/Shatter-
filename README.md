# Little Wonder World — v1.1

A calm, offline, touch-first play app for toddlers. Home world + 10 activities
+ a grown-up corner behind a hold-to-unlock Parent Gate. No account, no
network requirement, no backend, no Firebase — everything is stored locally
with AsyncStorage, per the handoff spec.

`App.tsx` now boots `src/next/EnhancedAppShell.tsx`, the full 10-activity
build. The original minimal 4-activity build still exists untouched in
`src/screens/` and `src/next/SafeAppShell.tsx` if you ever want to roll back
— just swap the import in `App.tsx`.

## What's implemented

**Activities** (all in `src/next/`, routed through `NextHomeScreen`):
- **Magic crystal**: touch-and-drag with a gentle spring return to center
- **Bubble count**: pop up to 3 bubbles, friendly replayable completion
- **Color garden**: large color swatches, every tap is a success
- **Animal friends**: large-scale display on selection, with sound cues
- **Shape garden**: circle / square / triangle
- **Number garden**: tap 1–3, watch matching flowers appear
- **Music room**: tap instruments to build a simple rhythm
- **Calm sky**: quiet, low-stimulation stars/moon/cloud scene
- **Little garden**: choose and grow a flower/butterfly/tree
- **Ocean friends**: drag-and-return sea creatures

**Safety / grown-up corner**:
- **Parent Gate**: settings are behind a ~1.4s hold-to-unlock button, so a
  child tapping around can't reach settings by accident
- Name entry/clear, sound toggle, calm-mode toggle — all local-only

**Foundations**:
- All new activities route sound through `AudioManager` → `AudioService`,
  the same centralized stub from v1 (still a no-op until real audio files
  are wired in — see "Next steps")
- Local settings persistence via `@react-native-async-storage/async-storage`,
  with safe fallbacks if storage read/write ever fails (play is never blocked)
- One basic automated test for the settings persistence flow

## Getting started

```bash
npm install
npx expo start
```

Press `a` to open in an Android emulator/device (Expo Go), or scan the QR
code with the Expo Go app on a real phone.

## Running tests

```bash
npm test
npm run typecheck
```

## Building a real Android install (not Expo Go)

Expo Go is for development only — section 13 of the spec calls for a signed
build for real testing and release. Use EAS Build:

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android --profile preview   # installable APK
eas build --platform android --profile production # store AAB
```

You'll need to set a real `android.package` identifier in `app.json` (a
reverse-domain string you own) before building for release.

## Deployment notes (GitHub / Vercel / no Firebase)

- **GitHub**: host this repo, run `npm run typecheck` and `npm test` in CI
  on every PR.
- **Vercel**: not used for the mobile build — Vercel doesn't produce
  Android/iOS binaries. It's only relevant if you later want a web landing
  page or an `expo export --platform web` preview.
- **No Firebase / no backend**: intentional. v1 needs no auth, database, or
  cloud sync, so there's nothing to replace.

## A note on this sandbox

I couldn't run `npm install` or a real TypeScript compile here (no network
access in this environment), so this was checked by hand: every import in
`EnhancedAppShell.tsx` and each new screen was matched against actual
exports, and the dependency list didn't grow (still just Expo core,
React Native core, and AsyncStorage — no new native modules). Still worth
running `npm run typecheck` and `npm test` yourself before building.

## Next steps (per the handoff doc)

1. **Voice and Sound Foundation** (recommended next package): wire
   `src/audio/AudioService.ts` up to real short audio files (`expo-av` or
   `expo-audio`) — master toggle, number lines, color lines, animal sounds,
   crystal chime, bubble pop, and a quieter calm-mode volume profile.
2. Run the manual child-flow test in section 12.1 of the handoff doc on a
   real phone and tablet.
3. Create the preview APK, install on real hardware, confirm offline play.
4. Complete the privacy/licensing/store-declaration checklist before any
   public release.
