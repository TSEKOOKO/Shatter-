/**
 * Centralized audio service.
 *
 * This is intentionally a stub for version 1. The handoff doc's
 * "Voice and Sound Foundation" work package calls for wiring this up to
 * real short sound files (expo-av or expo-audio) - a master sound toggle,
 * three number lines, three color lines, three animal sounds, one crystal
 * chime, one bubble pop, and a calm-mode volume profile.
 *
 * Routing everything through this single service now means the master
 * toggle and calm mode will work consistently everywhere once real audio
 * is added - no screen ever plays a sound directly.
 */

export type SoundId =
  | "crystal_chime"
  | "bubble_pop"
  | "animal_bunny"
  | "animal_cat"
  | "animal_dog"
  | "color_select";

interface PlayOptions {
  soundEnabled: boolean;
  calmModeEnabled: boolean;
}

export function playSound(id: SoundId, options: PlayOptions): void {
  if (!options.soundEnabled) return;

  // calmModeEnabled should map to a quieter volume profile once real
  // audio files are wired in (see spec section 9.2). No-op for now.
  // eslint-disable-next-line no-console
  console.log(`[AudioService] would play "${id}" (calm mode: ${options.calmModeEnabled})`);
}
