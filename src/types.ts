export type ActivityId = "crystal" | "bubbles" | "colors" | "animals";

export type ScreenId = "home" | "parent" | ActivityId;

export interface AppSettings {
  childName: string;
  soundEnabled: boolean;
  calmModeEnabled: boolean;
  languageCode: string;
  favoriteActivityId: ActivityId | null;
}

export const DEFAULT_SETTINGS: AppSettings = {
  childName: "",
  soundEnabled: true,
  calmModeEnabled: false,
  languageCode: "en",
  favoriteActivityId: null,
};
