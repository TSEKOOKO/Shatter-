import { playSound, SoundId } from "../audio/AudioService";

export interface AudioSettings {
  soundEnabled: boolean;
  calmModeEnabled: boolean;
}

export type SpokenCue =
  | "hello"
  | "one"
  | "two"
  | "three"
  | "red"
  | "blue"
  | "yellow"
  | "bunny"
  | "cat"
  | "dog";

const spokenSoundMap: Partial<Record<SpokenCue, SoundId>> = {
  red: "color_select",
  blue: "color_select",
  yellow: "color_select",
  bunny: "animal_bunny",
  cat: "animal_cat",
  dog: "animal_dog",
};

/**
 * Single entry point for all new activity feedback.
 * It respects the existing parent sound and calm-mode settings.
 * The existing AudioService remains the compatibility layer until real assets
 * are supplied by the project owner.
 */
export const AudioManager = {
  effect(id: SoundId, settings: AudioSettings) {
    playSound(id, settings);
  },

  cue(cue: SpokenCue, settings: AudioSettings) {
    const effect = spokenSoundMap[cue];
    if (effect) playSound(effect, settings);
  },
};
