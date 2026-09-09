import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityId, AppSettings, DEFAULT_SETTINGS } from "../types";

const STORAGE_KEY = "little-wonder-world:settings:v1";

interface SettingsContextValue {
  settings: AppSettings;
  isLoaded: boolean;
  setChildName: (name: string) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setCalmModeEnabled: (enabled: boolean) => void;
  setLanguageCode: (code: string) => void;
  recordActivityPlayed: (id: ActivityId) => void;
  clearChildName: () => void;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load once on launch. Nothing here ever touches the network -
  // the app must be fully usable offline per section 10 of the spec.
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          setSettings({ ...DEFAULT_SETTINGS, ...parsed });
        }
      } catch (e) {
        // If storage is corrupted or unavailable, fall back to defaults
        // rather than blocking play - a broken settings read must never
        // prevent a child from playing.
        setSettings(DEFAULT_SETTINGS);
      } finally {
        setIsLoaded(true);
      }
    })();
  }, []);

  const persist = async (next: AppSettings) => {
    setSettings(next);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      // Silently ignore write failures - play should never be blocked
      // by a storage error. Settings will just not persist this session.
    }
  };

  const value = useMemo<SettingsContextValue>(
    () => ({
      settings,
      isLoaded,
      setChildName: (name) => persist({ ...settings, childName: name.trim().slice(0, 40) }),
      setSoundEnabled: (enabled) => persist({ ...settings, soundEnabled: enabled }),
      setCalmModeEnabled: (enabled) => persist({ ...settings, calmModeEnabled: enabled }),
      setLanguageCode: (code) => persist({ ...settings, languageCode: code }),
      recordActivityPlayed: (id) => persist({ ...settings, favoriteActivityId: id }),
      clearChildName: () => persist({ ...settings, childName: "" }),
    }),
    [settings]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within a SettingsProvider");
  return ctx;
}
